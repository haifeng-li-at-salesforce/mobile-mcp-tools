/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OramaStore } from '../../src/storage/oramaStore.js';
import type { Chunk } from '../../src/types.js';

describe('OramaStore', () => {
  let store: OramaStore;

  const createMockChunk = (
    id: string,
    doc: string = 'test.md',
    section: string = 'Test Section'
  ): Chunk => ({
    id,
    text: `Content for ${id}`,
    embedding: new Array(384).fill(0.1),
    doc,
    path: '/docs',
    section,
    sectionId: `${doc}::${section}`,
    chunkIndex: 0,
  });

  beforeEach(async () => {
    store = new OramaStore();
    await store.initialize();
  });

  describe('initialization', () => {
    it('should initialize successfully', async () => {
      const newStore = new OramaStore();
      expect(newStore.getIsInitialized()).toBe(false);

      await newStore.initialize();

      expect(newStore.getIsInitialized()).toBe(true);
    });

    it('should be idempotent', async () => {
      await store.initialize();
      await store.initialize();

      expect(store.getIsInitialized()).toBe(true);
    });
  });

  describe('insertChunk', () => {
    it('should insert a single chunk', async () => {
      const chunk = createMockChunk('chunk1');

      await store.insertChunk(chunk);

      const count = await store.getChunkCount();
      expect(count).toBe(1);
    });
  });

  describe('insertChunks', () => {
    it('should insert multiple chunks', async () => {
      const chunks = [createMockChunk('chunk1'), createMockChunk('chunk2')];

      await store.insertChunks(chunks);

      const count = await store.getChunkCount();
      expect(count).toBe(2);
    });
  });

  describe('getChunk', () => {
    it('should retrieve a chunk by ID', async () => {
      const chunk = createMockChunk('chunk1');
      await store.insertChunk(chunk);

      const retrieved = await store.getChunk('chunk1');

      expect(retrieved).not.toBeNull();
      expect(retrieved?.id).toBe('chunk1');
      expect(retrieved?.text).toBe('Content for chunk1');
    });

    it('should return null for non-existent chunk', async () => {
      const retrieved = await store.getChunk('nonexistent');

      expect(retrieved).toBeNull();
    });
  });

  describe('removeChunk', () => {
    it('should remove a chunk by ID', async () => {
      const chunk = createMockChunk('chunk1');
      await store.insertChunk(chunk);

      await store.removeChunk('chunk1');

      const retrieved = await store.getChunk('chunk1');
      expect(retrieved).toBeNull();
    });
  });

  describe('removeDocumentChunks', () => {
    it('should remove all chunks for a document', async () => {
      await store.insertChunks([
        createMockChunk('c1', 'doc1.md'),
        createMockChunk('c2', 'doc1.md'),
        createMockChunk('c3', 'doc2.md'),
      ]);

      await store.removeDocumentChunks('doc1.md');

      const count = await store.getChunkCount();
      expect(count).toBe(1);
    });
  });

  describe('getAllChunks', () => {
    it('should return all chunks', async () => {
      await store.insertChunks([createMockChunk('c1'), createMockChunk('c2')]);

      const chunks = await store.getAllChunks();

      expect(chunks).toHaveLength(2);
    });
  });

  describe('clear', () => {
    it('should remove all chunks', async () => {
      await store.insertChunks([createMockChunk('c1'), createMockChunk('c2')]);

      await store.clear();

      const count = await store.getChunkCount();
      expect(count).toBe(0);
    });
  });

  describe('vectorSearch', () => {
    it('should return results based on vector similarity', async () => {
      // Create chunks with different embeddings
      const chunk1 = createMockChunk('c1');
      chunk1.embedding = new Array(384).fill(0.5);

      const chunk2 = createMockChunk('c2');
      chunk2.embedding = new Array(384).fill(0.1);

      await store.insertChunks([chunk1, chunk2]);

      // Search with embedding similar to chunk1
      const queryEmbedding = new Array(384).fill(0.5);
      const results = await store.vectorSearch(queryEmbedding, 10);

      expect(results.length).toBeGreaterThan(0);
      // First result should be more similar to query
      expect(results[0].document.id).toBe('c1');
    });

    it('should respect limit', async () => {
      await store.insertChunks([
        createMockChunk('c1'),
        createMockChunk('c2'),
        createMockChunk('c3'),
      ]);

      const queryEmbedding = new Array(384).fill(0.1);
      const results = await store.vectorSearch(queryEmbedding, 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should apply doc filter', async () => {
      await store.insertChunks([
        createMockChunk('c1', 'doc1.md'),
        createMockChunk('c2', 'doc2.md'),
      ]);

      const queryEmbedding = new Array(384).fill(0.1);
      const results = await store.vectorSearch(queryEmbedding, 10, { doc: 'doc1.md' });

      expect(results).toHaveLength(1);
      expect(results[0].document.doc).toBe('doc1.md');
    });
  });

  describe('hybridSearch', () => {
    it('should combine text and vector search', async () => {
      const chunk = createMockChunk('c1');
      chunk.text = 'Authentication and authorization patterns';
      await store.insertChunk(chunk);

      const queryEmbedding = new Array(384).fill(0.1);
      const results = await store.hybridSearch('authentication', queryEmbedding, 10);

      expect(results.length).toBeGreaterThan(0);
    });
  });
});
