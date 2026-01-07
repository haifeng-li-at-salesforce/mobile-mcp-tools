/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { z } from 'zod';

/**
 * Represents a chunk of text from a Markdown section.
 * Chunks are the atomic units stored in the vector database.
 */
export interface Chunk {
  /** Unique identifier: {doc}::{section}::{chunkIndex} */
  id: string;
  /** The actual text content of the chunk */
  text: string;
  /** 384-dimensional embedding vector */
  embedding: number[];
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
 * Represents a reconstructed section from one or more chunks.
 * This is the primary return type for section-level retrieval.
 */
export interface Section {
  /** Source document filename */
  doc: string;
  /** Directory path to the document */
  path: string;
  /** Section title (from Markdown header) */
  section: string;
  /** Unique section identifier: {doc}::{section} */
  sectionId: string;
  /** Merged content from all chunks in this section */
  content: string;
  /** Relevance score from search (higher is better) */
  score?: number;
}

/**
 * Represents a full document aggregated from its sections.
 */

export const DocumentSchema = z.object({
  doc: z.string().describe('Document filename'),
  path: z.string().describe('Directory path to the document'),
  content: z.string().describe('Full document content (all sections merged)'),
  score: z.number().optional().describe('Relevance score from search (highest section score)'),
});

export type Document = z.infer<typeof DocumentSchema>;

/**
 * Search result mode determines the granularity of returned results.
 */
export type SearchMode = 'section' | 'chunk' | 'document';

/**
 * Options for search operations.
 */
export interface SearchOptions {
  /** Result granularity: 'section' (default), 'chunk', or 'document' */
  mode?: SearchMode;
  /** Maximum number of results to return */
  limit?: number;
  /** Filter results by document path or filename */
  filter?: SearchFilter;
}

/**
 * Filter criteria for narrowing search scope.
 */
export interface SearchFilter {
  /** Filter by directory path (prefix match) */
  path?: string;
  /** Filter by document filename (exact match) */
  doc?: string;
}

/**
 * Raw search result from OramaDB before aggregation.
 */
export interface RawSearchHit {
  /** The chunk document */
  document: Chunk;
  /** Combined relevance score */
  score: number;
}

/**
 * Parsed section from Markdown.
 * Represents a single header and its content before chunking.
 */
export interface ParsedSection {
  /** Section title (header text without # symbols) */
  title: string;
  /** Header level (1 for #, 2 for ##, etc.) */
  level: number;
  /** Raw content under this header (before next header) */
  content: string;
  /** Start line number in the original document */
  startLine: number;
  /** End line number in the original document */
  endLine: number;
}

/**
 * Result of parsing a Markdown document.
 */
export interface ParsedDocument {
  /** Document filename */
  doc: string;
  /** Directory path to the document */
  path: string;
  /** Full raw content of the document */
  rawContent: string;
  /** Extracted sections */
  sections: ParsedSection[];
  /** MD5 hash of the raw content for change detection */
  contentHash: string;
}

/**
 * Metadata stored alongside the index for incremental updates.
 */
export interface IndexMetadata {
  /** Map of document path to content hash */
  documentHashes: Record<string, string>;
  /** Timestamp of last index update */
  lastUpdated: string;
  /** Version of the index format */
  version: string;
}

/**
 * Configuration options for the RAG index.
 */
export interface RagIndexOptions {
  /** Target chunk size in tokens (default: 350) */
  chunkSize?: number;
  /** Overlap between chunks in tokens (default: 50) */
  chunkOverlap?: number;
  /** Path to ONNX model file (default: bundled model_int8.onnx) */
  modelPath?: string;
  /** Path to vocabulary file (default: bundled vocab.txt) */
  vocabPath?: string;
  /** Weight for BM25 score in hybrid search (0-1, default: 0.5) */
  bm25Weight?: number;
}

/**
 * Serializable index data for persistence.
 */
export interface SerializedIndex {
  /** Index metadata */
  metadata: IndexMetadata;
  /** All chunks in the index */
  chunks: Chunk[];
  /** Index configuration */
  options: RagIndexOptions;
}

// Zod schemas for validation

export const SearchFilterSchema = z.object({
  path: z.string().optional(),
  doc: z.string().optional(),
});

export const SearchOptionsSchema = z.object({
  mode: z.enum(['section', 'chunk', 'document']).optional().default('section'),
  limit: z.number().int().positive().optional().default(10),
  filter: SearchFilterSchema.optional(),
});

export const RagIndexOptionsSchema = z.object({
  chunkSize: z.number().int().positive().optional().default(350),
  chunkOverlap: z.number().int().nonnegative().optional().default(50),
  modelPath: z.string().optional(),
  vocabPath: z.string().optional(),
  bm25Weight: z.number().min(0).max(1).optional().default(0.5),
});

/** Current index format version */
export const INDEX_VERSION = '1.0.0';

/** Default embedding dimension for MiniLM-L6-v2 */
export const EMBEDDING_DIMENSION = 384;
