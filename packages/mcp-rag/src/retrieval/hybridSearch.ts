/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { type RawSearchHit, type SearchOptions, SearchOptionsSchema } from '../types.js';
import { embed } from '../embedding/index.js';
import { OramaStore } from '../storage/index.js';

/**
 * Hybrid search service combining BM25 and vector search.
 */
export class HybridSearchService {
  private store: OramaStore;
  private bm25Weight: number;

  /**
   * Create a new HybridSearchService.
   * @param store - The OramaStore to search
   * @param bm25Weight - Weight for BM25 score (0-1, default: 0.5)
   */
  constructor(store: OramaStore, bm25Weight: number = 0.5) {
    this.store = store;
    this.bm25Weight = bm25Weight;
  }

  /**
   * Perform a hybrid search.
   * @param query - The search query text
   * @param options - Search options
   * @returns Array of raw search hits
   */
  async search(query: string, options?: SearchOptions): Promise<RawSearchHit[]> {
    const validatedOptions = SearchOptionsSchema.parse(options || {});

    // Generate query embedding
    const queryEmbedding = await embed(query);

    // Perform hybrid search
    const hits = await this.store.hybridSearch(
      query,
      queryEmbedding,
      // Get more than needed for aggregation
      validatedOptions.limit * 3,
      validatedOptions.filter,
      this.bm25Weight
    );

    return hits;
  }

  /**
   * Perform a vector-only search.
   * Useful when semantic similarity is more important than keyword matching.
   * @param query - The search query text
   * @param options - Search options
   * @returns Array of raw search hits
   */
  async vectorSearch(query: string, options?: SearchOptions): Promise<RawSearchHit[]> {
    const validatedOptions = SearchOptionsSchema.parse(options || {});

    // Generate query embedding
    const queryEmbedding = await embed(query);

    // Perform vector search
    const hits = await this.store.vectorSearch(
      queryEmbedding,
      validatedOptions.limit * 3,
      validatedOptions.filter
    );

    return hits;
  }

  /**
   * Set the BM25 weight for hybrid search.
   * @param weight - Weight between 0 (vector only) and 1 (BM25 only)
   */
  setBm25Weight(weight: number): void {
    if (weight < 0 || weight > 1) {
      throw new Error('BM25 weight must be between 0 and 1');
    }
    this.bm25Weight = weight;
  }

  /**
   * Get the current BM25 weight.
   */
  getBm25Weight(): number {
    return this.bm25Weight;
  }
}
