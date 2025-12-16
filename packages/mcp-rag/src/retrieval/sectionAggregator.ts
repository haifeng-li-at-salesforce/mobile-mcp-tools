/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import type { Chunk, Document, RawSearchHit, Section, SearchMode } from '../types.js';

/**
 * Intermediate structure for grouping chunks by section.
 */
interface SectionGroup {
  doc: string;
  path: string;
  section: string;
  sectionId: string;
  chunks: Array<{ chunk: Chunk; score: number }>;
  maxScore: number;
}

/**
 * Intermediate structure for grouping sections by document.
 */
interface DocumentGroup {
  doc: string;
  path: string;
  sections: SectionGroup[];
  maxScore: number;
}

/**
 * Aggregates search hits into sections or documents.
 */
export class SectionAggregator {
  /**
   * Group raw search hits by section.
   * @param hits - Raw search hits from OramaDB
   * @returns Map of sectionId to SectionGroup
   */
  private groupBySection(hits: RawSearchHit[]): Map<string, SectionGroup> {
    const sections = new Map<string, SectionGroup>();

    for (const hit of hits) {
      const { document, score } = hit;
      const { sectionId, doc, path, section } = document;

      if (!sections.has(sectionId)) {
        sections.set(sectionId, {
          doc,
          path,
          section,
          sectionId,
          chunks: [],
          maxScore: 0,
        });
      }

      const group = sections.get(sectionId)!;
      group.chunks.push({ chunk: document, score });
      group.maxScore = Math.max(group.maxScore, score);
    }

    return sections;
  }

  /**
   * Group sections by document.
   * @param sections - Map of section groups
   * @returns Map of doc to DocumentGroup
   */
  private groupByDocument(sections: Map<string, SectionGroup>): Map<string, DocumentGroup> {
    const documents = new Map<string, DocumentGroup>();

    for (const sectionGroup of sections.values()) {
      const { doc, path } = sectionGroup;

      if (!documents.has(doc)) {
        documents.set(doc, {
          doc,
          path,
          sections: [],
          maxScore: 0,
        });
      }

      const group = documents.get(doc)!;
      group.sections.push(sectionGroup);
      group.maxScore = Math.max(group.maxScore, sectionGroup.maxScore);
    }

    return documents;
  }

  /**
   * Reconstruct a section's content from its chunks.
   * @param group - The section group
   * @returns Merged section content
   */
  private reconstructSection(group: SectionGroup): string {
    // Sort chunks by index
    const sortedChunks = [...group.chunks].sort((a, b) => a.chunk.chunkIndex - b.chunk.chunkIndex);

    // Merge chunk texts
    return sortedChunks.map(c => c.chunk.text).join('\n');
  }

  /**
   * Reconstruct a document's content from its sections.
   * @param group - The document group
   * @returns Merged document content
   */
  private reconstructDocument(group: DocumentGroup): string {
    // Sort sections by their first chunk's position in the original document
    const sortedSections = [...group.sections].sort((a, b) => {
      const aMinIndex = Math.min(...a.chunks.map(c => c.chunk.chunkIndex));
      const bMinIndex = Math.min(...b.chunks.map(c => c.chunk.chunkIndex));
      return aMinIndex - bMinIndex;
    });

    // Merge section contents
    return sortedSections.map(s => this.reconstructSection(s)).join('\n\n');
  }

  /**
   * Aggregate search hits based on the specified mode.
   * @param hits - Raw search hits
   * @param mode - Aggregation mode ('chunk', 'section', or 'document')
   * @param limit - Maximum number of results
   * @returns Aggregated results
   */
  aggregate(
    hits: RawSearchHit[],
    mode: SearchMode,
    limit: number
  ): Chunk[] | Section[] | Document[] {
    switch (mode) {
      case 'chunk':
        return this.aggregateChunks(hits, limit);
      case 'section':
        return this.aggregateSections(hits, limit);
      case 'document':
        return this.aggregateDocuments(hits, limit);
      default:
        throw new Error(`Unknown aggregation mode: ${mode}`);
    }
  }

  /**
   * Return hits as individual chunks (no aggregation).
   * @param hits - Raw search hits
   * @param limit - Maximum number of results
   * @returns Array of chunks with scores
   */
  aggregateChunks(hits: RawSearchHit[], limit: number): Chunk[] {
    return hits.slice(0, limit).map(hit => ({
      ...hit.document,
      score: hit.score,
    }));
  }

  /**
   * Aggregate hits into sections.
   * @param hits - Raw search hits
   * @param limit - Maximum number of results
   * @returns Array of sections with scores
   */
  aggregateSections(hits: RawSearchHit[], limit: number): Section[] {
    const sectionGroups = this.groupBySection(hits);

    // Sort by max score descending
    const sortedGroups = [...sectionGroups.values()].sort((a, b) => b.maxScore - a.maxScore);

    // Convert to Section objects
    return sortedGroups.slice(0, limit).map(group => ({
      doc: group.doc,
      path: group.path,
      section: group.section,
      sectionId: group.sectionId,
      content: this.reconstructSection(group),
      score: group.maxScore,
    }));
  }

  /**
   * Aggregate hits into documents.
   * @param hits - Raw search hits
   * @param limit - Maximum number of results
   * @returns Array of documents with scores
   */
  aggregateDocuments(hits: RawSearchHit[], limit: number): Document[] {
    const sectionGroups = this.groupBySection(hits);
    const documentGroups = this.groupByDocument(sectionGroups);

    // Sort by max score descending
    const sortedGroups = [...documentGroups.values()].sort((a, b) => b.maxScore - a.maxScore);

    // Convert to Document objects
    return sortedGroups.slice(0, limit).map(group => ({
      doc: group.doc,
      path: group.path,
      content: this.reconstructDocument(group),
      score: group.maxScore,
    }));
  }
}

/**
 * Convenience function to aggregate search hits.
 * @param hits - Raw search hits
 * @param mode - Aggregation mode
 * @param limit - Maximum results
 * @returns Aggregated results
 */
export function aggregateHits(
  hits: RawSearchHit[],
  mode: SearchMode,
  limit: number
): Chunk[] | Section[] | Document[] {
  const aggregator = new SectionAggregator();
  return aggregator.aggregate(hits, mode, limit);
}
