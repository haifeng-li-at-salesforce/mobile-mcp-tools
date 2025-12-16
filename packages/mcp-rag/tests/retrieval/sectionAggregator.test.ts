/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect } from 'vitest';
import { SectionAggregator, aggregateHits } from '../../src/retrieval/sectionAggregator.js';
import type { RawSearchHit, Chunk } from '../../src/types.js';

describe('SectionAggregator', () => {
  const createMockHit = (
    id: string,
    sectionId: string,
    section: string,
    doc: string,
    chunkIndex: number,
    score: number
  ): RawSearchHit => ({
    document: {
      id,
      text: `Content for ${id}`,
      embedding: [],
      doc,
      path: '/docs',
      section,
      sectionId,
      chunkIndex,
    },
    score,
  });

  describe('aggregateChunks', () => {
    it('should return chunks with scores', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 's1', 'Section 1', 'doc.md', 0, 0.9),
        createMockHit('c2', 's2', 'Section 2', 'doc.md', 0, 0.8),
      ];

      const result = aggregator.aggregateChunks(hits, 10);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('c1');
      expect((result[0] as Chunk & { score?: number }).score).toBe(0.9);
    });

    it('should respect limit', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 's1', 'Section 1', 'doc.md', 0, 0.9),
        createMockHit('c2', 's2', 'Section 2', 'doc.md', 0, 0.8),
        createMockHit('c3', 's3', 'Section 3', 'doc.md', 0, 0.7),
      ];

      const result = aggregator.aggregateChunks(hits, 2);

      expect(result).toHaveLength(2);
    });
  });

  describe('aggregateSections', () => {
    it('should group chunks by section', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 'doc::Section 1', 'Section 1', 'doc.md', 0, 0.9),
        createMockHit('c2', 'doc::Section 1', 'Section 1', 'doc.md', 1, 0.85),
        createMockHit('c3', 'doc::Section 2', 'Section 2', 'doc.md', 0, 0.8),
      ];

      const result = aggregator.aggregateSections(hits, 10);

      expect(result).toHaveLength(2);
      expect(result[0].section).toBe('Section 1');
      expect(result[0].score).toBe(0.9); // Max score in section
    });

    it('should sort sections by max score', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 'doc::Section 1', 'Section 1', 'doc.md', 0, 0.5),
        createMockHit('c2', 'doc::Section 2', 'Section 2', 'doc.md', 0, 0.9),
      ];

      const result = aggregator.aggregateSections(hits, 10);

      expect(result[0].section).toBe('Section 2');
      expect(result[1].section).toBe('Section 1');
    });

    it('should reconstruct section content from chunks in order', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c2', 'doc::Section', 'Section', 'doc.md', 1, 0.8), // Out of order
        createMockHit('c1', 'doc::Section', 'Section', 'doc.md', 0, 0.9),
      ];

      const result = aggregator.aggregateSections(hits, 10);

      // Content should be in chunk order (0, 1), not hit order
      expect(result[0].content).toBe('Content for c1\nContent for c2');
    });
  });

  describe('aggregateDocuments', () => {
    it('should group sections by document', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 'doc1::Section 1', 'Section 1', 'doc1.md', 0, 0.9),
        createMockHit('c2', 'doc1::Section 2', 'Section 2', 'doc1.md', 0, 0.8),
        createMockHit('c3', 'doc2::Section 1', 'Section 1', 'doc2.md', 0, 0.7),
      ];

      const result = aggregator.aggregateDocuments(hits, 10);

      expect(result).toHaveLength(2);
      expect(result[0].doc).toBe('doc1.md');
      expect(result[0].score).toBe(0.9); // Max score across all sections
    });

    it('should sort documents by max score', () => {
      const aggregator = new SectionAggregator();
      const hits = [
        createMockHit('c1', 'doc1::Section', 'Section', 'doc1.md', 0, 0.5),
        createMockHit('c2', 'doc2::Section', 'Section', 'doc2.md', 0, 0.9),
      ];

      const result = aggregator.aggregateDocuments(hits, 10);

      expect(result[0].doc).toBe('doc2.md');
    });
  });

  describe('aggregate', () => {
    it('should dispatch to correct aggregation method', () => {
      const aggregator = new SectionAggregator();
      const hits = [createMockHit('c1', 's1', 'Section 1', 'doc.md', 0, 0.9)];

      const chunks = aggregator.aggregate(hits, 'chunk', 10);
      const sections = aggregator.aggregate(hits, 'section', 10);
      const documents = aggregator.aggregate(hits, 'document', 10);

      expect(chunks).toHaveLength(1);
      expect(sections).toHaveLength(1);
      expect(documents).toHaveLength(1);
    });

    it('should throw on invalid mode', () => {
      const aggregator = new SectionAggregator();

      expect(() => aggregator.aggregate([], 'invalid' as 'section', 10)).toThrow(
        'Unknown aggregation mode'
      );
    });
  });

  describe('aggregateHits helper', () => {
    it('should work as a convenience function', () => {
      const hits = [createMockHit('c1', 's1', 'Section 1', 'doc.md', 0, 0.9)];

      const result = aggregateHits(hits, 'section', 10);

      expect(result).toHaveLength(1);
    });
  });
});
