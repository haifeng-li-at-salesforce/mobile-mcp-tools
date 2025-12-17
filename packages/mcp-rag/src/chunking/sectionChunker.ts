/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import type { ParsedDocument, ParsedSection, RagIndexOptions } from '../types.js';
import { RagIndexOptionsSchema } from '../types.js'; // eslint-disable-line no-duplicate-imports

/**
 * Represents a chunk ready for embedding and indexing.
 * Does not include the embedding yet - that's added later.
 */
export interface PreChunk {
  /** Unique identifier: {doc}::{section}::{chunkIndex} */
  id: string;
  /** The actual text content of the chunk */
  text: string;
  /** Source document filename */
  doc: string;
  /** Directory path to the document */
  path: string;
  /** Section title (from Markdown header) */
  section: string;
  /** Unique section identifier: {doc}::{section} */
  sectionId: string;
  /** Order index within the section (0-based) */
  chunkIndex: number;
}

/**
 * Simple token estimation based on whitespace splitting.
 * For more accurate tokenization, consider using a proper tokenizer.
 */
function estimateTokens(text: string): number {
  // Rough estimate: average of 4 characters per token for English text
  // This is a simplified approach; actual tokenizers would be more accurate
  return Math.ceil(text.length / 4);
}

/**
 * Split text into chunks respecting word boundaries.
 * @param text - The text to split
 * @param maxTokens - Maximum tokens per chunk
 * @param overlapTokens - Token overlap between chunks
 * @returns Array of text chunks
 */
function splitTextIntoChunks(text: string, maxTokens: number, overlapTokens: number): string[] {
  if (!text.trim()) {
    return [];
  }

  // If text fits in one chunk, return as-is
  if (estimateTokens(text) <= maxTokens) {
    return [text.trim()];
  }

  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';
  let currentTokens = 0;

  for (const paragraph of paragraphs) {
    const paragraphTokens = estimateTokens(paragraph);

    // If a single paragraph exceeds max tokens, split by sentences
    if (paragraphTokens > maxTokens) {
      // Save current chunk if not empty
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
        currentTokens = 0;
      }

      // Split large paragraph by sentences
      const sentenceChunks = splitBySentences(paragraph, maxTokens, overlapTokens);
      chunks.push(...sentenceChunks);
      continue;
    }

    // Check if adding this paragraph would exceed limit
    const newTokens = currentTokens + paragraphTokens + (currentChunk ? 2 : 0); // +2 for \n\n

    if (newTokens > maxTokens && currentChunk.trim()) {
      // Save current chunk and start new one with overlap
      chunks.push(currentChunk.trim());

      // Calculate overlap
      const overlapText = getOverlapText(currentChunk, overlapTokens);
      currentChunk = overlapText ? overlapText + '\n\n' + paragraph : paragraph;
      currentTokens = estimateTokens(currentChunk);
    } else {
      // Add paragraph to current chunk
      currentChunk = currentChunk ? currentChunk + '\n\n' + paragraph : paragraph;
      currentTokens = newTokens;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Split a large paragraph by sentences.
 */
function splitBySentences(text: string, maxTokens: number, overlapTokens: number): string[] {
  // Split by sentence boundaries (., !, ?)
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';
  let currentTokens = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);

    // If a single sentence exceeds max, split by words (last resort)
    if (sentenceTokens > maxTokens) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
        currentTokens = 0;
      }
      const wordChunks = splitByWords(sentence, maxTokens, overlapTokens);
      chunks.push(...wordChunks);
      continue;
    }

    const newTokens = currentTokens + sentenceTokens;

    if (newTokens > maxTokens && currentChunk.trim()) {
      chunks.push(currentChunk.trim());
      const overlapText = getOverlapText(currentChunk, overlapTokens);
      currentChunk = overlapText ? overlapText + ' ' + sentence.trim() : sentence.trim();
      currentTokens = estimateTokens(currentChunk);
    } else {
      currentChunk = currentChunk ? currentChunk + ' ' + sentence.trim() : sentence.trim();
      currentTokens = newTokens;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Split text by words as a last resort for very long content.
 */
function splitByWords(text: string, maxTokens: number, overlapTokens: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk = '';
  let currentTokens = 0;

  for (const word of words) {
    const wordTokens = estimateTokens(word);
    const newTokens = currentTokens + wordTokens + (currentChunk ? 1 : 0);

    if (newTokens > maxTokens && currentChunk) {
      chunks.push(currentChunk.trim());
      const overlapText = getOverlapText(currentChunk, overlapTokens);
      currentChunk = overlapText ? overlapText + ' ' + word : word;
      currentTokens = estimateTokens(currentChunk);
    } else {
      currentChunk = currentChunk ? currentChunk + ' ' + word : word;
      currentTokens = newTokens;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Get the last N tokens worth of text for overlap.
 */
function getOverlapText(text: string, overlapTokens: number): string {
  if (overlapTokens <= 0) {
    return '';
  }

  const words = text.split(/\s+/);
  const result: string[] = [];
  let tokenCount = 0;

  // Work backwards from the end
  for (let i = words.length - 1; i >= 0 && tokenCount < overlapTokens; i--) {
    result.unshift(words[i]);
    tokenCount += estimateTokens(words[i]);
  }

  return result.join(' ');
}

/**
 * Section-aware chunker that splits parsed documents into indexable chunks.
 */
export class SectionChunker {
  private options: Required<RagIndexOptions>;

  constructor(options: Partial<RagIndexOptions> = {}) {
    this.options = RagIndexOptionsSchema.parse(options) as Required<RagIndexOptions>;
  }

  /**
   * Chunk a single parsed section.
   * @param section - The parsed section to chunk
   * @param doc - Document filename
   * @param docPath - Document directory path
   * @returns Array of pre-chunks (without embeddings)
   */
  chunkSection(section: ParsedSection, doc: string, docPath: string): PreChunk[] {
    const sectionId = `${doc}::${section.title}`;

    // Combine header and content for chunking
    const fullText =
      section.level > 0
        ? `${'#'.repeat(section.level)} ${section.title}\n\n${section.content}`
        : section.content;

    const textChunks = splitTextIntoChunks(
      fullText,
      this.options.chunkSize,
      this.options.chunkOverlap
    );

    return textChunks.map((text, index) => ({
      id: `${doc}::${section.title}::${index}`,
      text,
      doc,
      path: docPath,
      section: section.title,
      sectionId,
      chunkIndex: index,
    }));
  }

  /**
   * Chunk an entire parsed document.
   * @param document - The parsed document to chunk
   * @returns Array of pre-chunks (without embeddings)
   */
  chunkDocument(document: ParsedDocument): PreChunk[] {
    const chunks: PreChunk[] = [];

    // Track section title occurrences to handle duplicates
    const sectionTitleCounts: Map<string, number> = new Map();

    for (const section of document.sections) {
      // Get or initialize the count for this section title
      const currentCount = sectionTitleCounts.get(section.title) ?? 0;
      sectionTitleCounts.set(section.title, currentCount + 1);

      // Create a unique section title by appending occurrence index if needed
      const uniqueSectionTitle =
        currentCount > 0 ? `${section.title}[${currentCount}]` : section.title;

      const sectionChunks = this.chunkSectionWithTitle(
        section,
        document.doc,
        document.path,
        uniqueSectionTitle
      );
      chunks.push(...sectionChunks);
    }

    return chunks;
  }

  /**
   * Chunk a single parsed section with a custom unique title.
   * @param section - The parsed section to chunk
   * @param doc - Document filename
   * @param docPath - Document directory path
   * @param uniqueTitle - Unique title for ID generation (handles duplicate titles)
   * @returns Array of pre-chunks (without embeddings)
   */
  private chunkSectionWithTitle(
    section: ParsedSection,
    doc: string,
    docPath: string,
    uniqueTitle: string
  ): PreChunk[] {
    const sectionId = `${doc}::${uniqueTitle}`;

    // Combine header and content for chunking
    const fullText =
      section.level > 0
        ? `${'#'.repeat(section.level)} ${section.title}\n\n${section.content}`
        : section.content;

    const textChunks = splitTextIntoChunks(
      fullText,
      this.options.chunkSize,
      this.options.chunkOverlap
    );

    return textChunks.map((text, index) => ({
      id: `${doc}::${uniqueTitle}::${index}`,
      text,
      doc,
      path: docPath,
      section: section.title, // Keep original title for display
      sectionId,
      chunkIndex: index,
    }));
  }

  /**
   * Chunk multiple parsed documents.
   * @param documents - Array of parsed documents
   * @returns Array of pre-chunks (without embeddings)
   */
  chunkDocuments(documents: ParsedDocument[]): PreChunk[] {
    const chunks: PreChunk[] = [];

    for (const doc of documents) {
      const docChunks = this.chunkDocument(doc);
      chunks.push(...docChunks);
    }

    return chunks;
  }

  /**
   * Get the configured chunk size.
   */
  getChunkSize(): number {
    return this.options.chunkSize;
  }

  /**
   * Get the configured chunk overlap.
   */
  getChunkOverlap(): number {
    return this.options.chunkOverlap;
  }
}

/**
 * Convenience function to chunk a parsed document.
 * @param document - The parsed document to chunk
 * @param options - Chunking options
 * @returns Array of pre-chunks (without embeddings)
 */
export function chunkDocument(
  document: ParsedDocument,
  options: Partial<RagIndexOptions> = {}
): PreChunk[] {
  const chunker = new SectionChunker(options);
  return chunker.chunkDocument(document);
}

/**
 * Convenience function to chunk multiple parsed documents.
 * @param documents - Array of parsed documents
 * @param options - Chunking options
 * @returns Array of pre-chunks (without embeddings)
 */
export function chunkDocuments(
  documents: ParsedDocument[],
  options: Partial<RagIndexOptions> = {}
): PreChunk[] {
  const chunker = new SectionChunker(options);
  return chunker.chunkDocuments(documents);
}
