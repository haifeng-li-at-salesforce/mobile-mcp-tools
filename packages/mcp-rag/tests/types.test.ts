/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect } from 'vitest';
import {
  SearchOptionsSchema,
  RagIndexOptionsSchema,
  INDEX_VERSION,
  EMBEDDING_DIMENSION,
} from '../src/types.js';

describe('types', () => {
  describe('SearchOptionsSchema', () => {
    it('should use default values when no options provided', () => {
      const result = SearchOptionsSchema.parse({});
      expect(result.mode).toBe('section');
      expect(result.limit).toBe(10);
      expect(result.filter).toBeUndefined();
    });

    it('should accept valid options', () => {
      const result = SearchOptionsSchema.parse({
        mode: 'chunk',
        limit: 5,
        filter: { doc: 'test.md' },
      });
      expect(result.mode).toBe('chunk');
      expect(result.limit).toBe(5);
      expect(result.filter?.doc).toBe('test.md');
    });

    it('should reject invalid mode', () => {
      expect(() =>
        SearchOptionsSchema.parse({
          mode: 'invalid',
        })
      ).toThrow();
    });
  });

  describe('RagIndexOptionsSchema', () => {
    it('should use default values when no options provided', () => {
      const result = RagIndexOptionsSchema.parse({});
      expect(result.chunkSize).toBe(400);
      expect(result.chunkOverlap).toBe(50);
      expect(result.embeddingModel).toBe('Xenova/all-MiniLM-L6-v2');
      expect(result.bm25Weight).toBe(0.5);
    });

    it('should accept valid options', () => {
      const result = RagIndexOptionsSchema.parse({
        chunkSize: 500,
        chunkOverlap: 100,
        embeddingModel: 'custom/model',
        bm25Weight: 0.7,
      });
      expect(result.chunkSize).toBe(500);
      expect(result.chunkOverlap).toBe(100);
      expect(result.embeddingModel).toBe('custom/model');
      expect(result.bm25Weight).toBe(0.7);
    });

    it('should reject invalid bm25Weight', () => {
      expect(() =>
        RagIndexOptionsSchema.parse({
          bm25Weight: 1.5,
        })
      ).toThrow();
    });
  });

  describe('constants', () => {
    it('should have correct INDEX_VERSION', () => {
      expect(INDEX_VERSION).toBe('1.0.0');
    });

    it('should have correct EMBEDDING_DIMENSION', () => {
      expect(EMBEDDING_DIMENSION).toBe(384);
    });
  });
});
