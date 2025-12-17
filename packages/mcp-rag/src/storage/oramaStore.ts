/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import {
  create,
  insert,
  remove,
  search,
  count,
  getByID,
  type Orama,
  type AnyOrama,
} from '@orama/orama';
import type { Chunk, RawSearchHit, SearchFilter } from '../types.js';

/**
 * OramaDB schema definition for chunk storage.
 */
const ORAMA_SCHEMA = {
  id: 'string',
  text: 'string',
  embedding: 'vector[384]',
  doc: 'string',
  path: 'string',
  section: 'string',
  sectionId: 'string',
  chunkIndex: 'number',
} as const;

/**
 * Type for the Orama database instance.
 */
type OramaDB = Orama<typeof ORAMA_SCHEMA>;

/**
 * Document type as stored in Orama.
 */
interface OramaDocument {
  id: string;
  text: string;
  embedding: number[];
  doc: string;
  path: string;
  section: string;
  sectionId: string;
  chunkIndex: number;
}

/**
 * OramaDB-based storage for chunk vectors and metadata.
 * Provides hybrid search (BM25 + vector) capabilities.
 */
export class OramaStore {
  private db: OramaDB | null = null;
  private isInitialized: boolean = false;

  /**
   * Initialize the OramaDB instance.
   */
  async initialize(): Promise<void> {
    if (this.isInitialized && this.db) {
      return;
    }

    this.db = await create({
      schema: ORAMA_SCHEMA,
    });

    this.isInitialized = true;
  }

  /**
   * Ensure the database is initialized.
   */
  private ensureInitialized(): OramaDB {
    if (!this.isInitialized || !this.db) {
      throw new Error('OramaStore not initialized. Call initialize() first.');
    }
    return this.db;
  }

  /**
   * Insert a single chunk into the store.
   * @param chunk - The chunk to insert
   */
  async insertChunk(chunk: Chunk): Promise<void> {
    const db = this.ensureInitialized();
    await insert(db, {
      id: chunk.id,
      text: chunk.text,
      embedding: chunk.embedding,
      doc: chunk.doc,
      path: chunk.path,
      section: chunk.section,
      sectionId: chunk.sectionId,
      chunkIndex: chunk.chunkIndex,
    });
  }

  /**
   * Insert multiple chunks into the store.
   * @param chunks - Array of chunks to insert
   */
  async insertChunks(chunks: Chunk[]): Promise<void> {
    for (const chunk of chunks) {
      await this.insertChunk(chunk);
    }
  }

  /**
   * Remove a chunk by ID.
   * @param id - The chunk ID to remove
   */
  async removeChunk(id: string): Promise<void> {
    const db = this.ensureInitialized();
    await remove(db, id);
  }

  /**
   * Remove all chunks for a specific document.
   * @param doc - The document filename
   */
  async removeDocumentChunks(doc: string): Promise<void> {
    const db = this.ensureInitialized();

    // Access documents directly from Orama's internal document store
    const oramaDb = db as AnyOrama;
    const allDocs = oramaDb.documentsStore.getAll(oramaDb.data.docs) as Record<
      string,
      OramaDocument
    >;

    // Filter and remove chunks matching the doc
    for (const document of Object.values(allDocs)) {
      if (document.doc === doc) {
        await remove(db, document.id);
      }
    }
  }

  /**
   * Get a chunk by ID.
   * @param id - The chunk ID
   * @returns The chunk or null if not found
   */
  async getChunk(id: string): Promise<Chunk | null> {
    const db = this.ensureInitialized();
    const doc = await getByID(db, id);

    if (!doc) {
      return null;
    }

    const oramaDoc = doc as unknown as OramaDocument;
    return {
      id: oramaDoc.id,
      text: oramaDoc.text,
      embedding: oramaDoc.embedding,
      doc: oramaDoc.doc,
      path: oramaDoc.path,
      section: oramaDoc.section,
      sectionId: oramaDoc.sectionId,
      chunkIndex: oramaDoc.chunkIndex,
    };
  }

  /**
   * Perform a hybrid search (BM25 + vector).
   * @param query - Text query for BM25
   * @param queryEmbedding - Query embedding vector
   * @param limit - Maximum number of results
   * @param filter - Optional filter criteria
   * @param bm25Weight - Weight for BM25 score (0-1)
   * @returns Array of search hits with scores
   */
  async hybridSearch(
    query: string,
    queryEmbedding: number[],
    limit: number = 10,
    filter?: SearchFilter,
    bm25Weight: number = 0.5
  ): Promise<RawSearchHit[]> {
    const db = this.ensureInitialized();

    // Perform hybrid search
    const results = await search(db as AnyOrama, {
      term: query,
      mode: 'hybrid',
      vector: {
        value: queryEmbedding,
        property: 'embedding',
      },
      similarity: bm25Weight,
      limit: limit * 2, // Get extra for filtering
      includeVectors: true,
    });

    // Apply filters manually since Orama v3 where clause has different syntax
    let hits = results.hits.map(hit => ({
      document: hit.document as unknown as OramaDocument,
      score: hit.score,
    }));

    if (filter) {
      if (filter.doc) {
        hits = hits.filter(h => h.document.doc === filter.doc);
      }
      if (filter.path) {
        hits = hits.filter(h => h.document.path.startsWith(filter.path!));
      }
    }

    return hits.slice(0, limit).map(hit => ({
      document: hit.document as Chunk,
      score: hit.score,
    }));
  }

  /**
   * Perform a vector-only search.
   * @param queryEmbedding - Query embedding vector
   * @param limit - Maximum number of results
   * @param filter - Optional filter criteria
   * @returns Array of search hits with scores
   */
  async vectorSearch(
    queryEmbedding: number[],
    limit: number = 10,
    filter?: SearchFilter
  ): Promise<RawSearchHit[]> {
    const db = this.ensureInitialized();

    const results = await search(db as AnyOrama, {
      mode: 'vector',
      vector: {
        value: queryEmbedding,
        property: 'embedding',
      },
      limit: limit * 2, // Get extra for filtering
      includeVectors: true,
    });

    // Apply filters manually
    let hits = results.hits.map(hit => ({
      document: hit.document as unknown as OramaDocument,
      score: hit.score,
    }));

    if (filter) {
      if (filter.doc) {
        hits = hits.filter(h => h.document.doc === filter.doc);
      }
      if (filter.path) {
        hits = hits.filter(h => h.document.path.startsWith(filter.path!));
      }
    }

    return hits.slice(0, limit).map(hit => ({
      document: hit.document as Chunk,
      score: hit.score,
    }));
  }

  /**
   * Get all chunks from the store.
   * Uses Orama's internal document store directly instead of search.
   * @returns Array of all chunks
   */
  async getAllChunks(): Promise<Chunk[]> {
    const db = this.ensureInitialized();

    // Access documents directly from Orama's internal document store
    // This is more efficient than using search with an empty term
    const oramaDb = db as AnyOrama;
    const allDocs = oramaDb.documentsStore.getAll(oramaDb.data.docs) as Record<
      string,
      OramaDocument
    >;

    const chunks: Chunk[] = Object.values(allDocs).map(doc => ({
      id: doc.id,
      text: doc.text,
      embedding: doc.embedding,
      doc: doc.doc,
      path: doc.path,
      section: doc.section,
      sectionId: doc.sectionId,
      chunkIndex: doc.chunkIndex,
    }));

    return chunks;
  }

  /**
   * Get the count of chunks in the store.
   * @returns Number of chunks
   */
  async getChunkCount(): Promise<number> {
    const db = this.ensureInitialized();
    return count(db);
  }

  /**
   * Clear all chunks from the store.
   */
  async clear(): Promise<void> {
    // Reinitialize the database to clear it
    this.db = await create({
      schema: ORAMA_SCHEMA,
    });
    this.isInitialized = true;
  }

  /**
   * Check if the store has been initialized.
   */
  getIsInitialized(): boolean {
    return this.isInitialized;
  }
}
