/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect } from 'vitest';
import { SectionChunker, chunkDocument } from '../../src/chunking/sectionChunker.js';
import type { ParsedDocument, ParsedSection } from '../../src/types.js';

describe('SectionChunker', () => {
  const createParsedSection = (
    title: string,
    content: string,
    level: number = 2
  ): ParsedSection => ({
    title,
    level,
    content,
    startLine: 0,
    endLine: 10,
  });

  const createParsedDocument = (sections: ParsedSection[]): ParsedDocument => ({
    doc: 'test.md',
    path: '/docs',
    rawContent: '',
    sections,
    contentHash: 'abc123',
  });

  describe('chunkSection', () => {
    it('should create a single chunk for small sections', () => {
      const chunker = new SectionChunker({ chunkSize: 1000 });
      const section = createParsedSection('Test Section', 'Short content.');
      const chunks = chunker.chunkSection(section, 'test.md', '/docs');

      expect(chunks).toHaveLength(1);
      expect(chunks[0].id).toBe('test.md::Test Section::0');
      expect(chunks[0].section).toBe('Test Section');
      expect(chunks[0].sectionId).toBe('test.md::Test Section');
      expect(chunks[0].chunkIndex).toBe(0);
      expect(chunks[0].doc).toBe('test.md');
      expect(chunks[0].path).toBe('/docs');
    });

    it('should split large sections into multiple chunks', () => {
      const chunker = new SectionChunker({ chunkSize: 50, chunkOverlap: 10 });
      const longContent = 'This is a longer piece of content. '.repeat(20);
      const section = createParsedSection('Long Section', longContent);
      const chunks = chunker.chunkSection(section, 'test.md', '/docs');

      expect(chunks.length).toBeGreaterThan(1);

      // All chunks should have sequential indices
      chunks.forEach((chunk, index) => {
        expect(chunk.chunkIndex).toBe(index);
        expect(chunk.sectionId).toBe('test.md::Long Section');
      });
    });

    it('should include header in first chunk', () => {
      const chunker = new SectionChunker();
      const section = createParsedSection('My Header', 'Content here.', 2);
      const chunks = chunker.chunkSection(section, 'test.md', '/docs');

      expect(chunks[0].text).toContain('## My Header');
    });
  });

  describe('chunkDocument', () => {
    it('should chunk all sections in a document', () => {
      const chunker = new SectionChunker({ chunkSize: 1000 });
      const doc = createParsedDocument([
        createParsedSection('Section 1', 'Content 1'),
        createParsedSection('Section 2', 'Content 2'),
      ]);

      const chunks = chunker.chunkDocument(doc);

      expect(chunks).toHaveLength(2);
      expect(chunks[0].section).toBe('Section 1');
      expect(chunks[1].section).toBe('Section 2');
    });

    it('should handle empty documents', () => {
      const chunker = new SectionChunker();
      const doc = createParsedDocument([]);

      const chunks = chunker.chunkDocument(doc);

      expect(chunks).toHaveLength(0);
    });
  });

  describe('chunkDocuments', () => {
    it('should chunk multiple documents', () => {
      const chunker = new SectionChunker({ chunkSize: 1000 });
      const docs = [
        createParsedDocument([createParsedSection('Doc1 Section', 'Content')]),
        createParsedDocument([createParsedSection('Doc2 Section', 'Content')]),
      ];

      const chunks = chunker.chunkDocuments(docs);

      expect(chunks).toHaveLength(2);
    });
  });

  describe('chunkDocument helper', () => {
    it('should work as a convenience function', () => {
      const doc = createParsedDocument([createParsedSection('Test', 'Content')]);
      const chunks = chunkDocument(doc, { chunkSize: 1000 });

      expect(chunks).toHaveLength(1);
    });
  });

  describe('getters', () => {
    it('should return configured options', () => {
      const chunker = new SectionChunker({ chunkSize: 500, chunkOverlap: 100 });

      expect(chunker.getChunkSize()).toBe(500);
      expect(chunker.getChunkOverlap()).toBe(100);
    });
  });
});
