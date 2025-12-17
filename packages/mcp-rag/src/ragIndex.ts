/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import {
  type Chunk,
  type Document,
  type IndexMetadata,
  type RagIndexOptions,
  type SearchOptions,
  type Section,
  RagIndexOptionsSchema,
  SearchOptionsSchema,
} from './types.js';
import { LocalEmbedder } from './embedding/index.js';
import { MarkdownParser } from './parsing/index.js';
import { SectionChunker, type PreChunk } from './chunking/index.js';
import {
  OramaStore,
  IndexPersistence,
  createEmptyMetadata,
  documentNeedsReindex,
} from './storage/index.js';
import { HybridSearchService, SectionAggregator } from './retrieval/index.js';

/**
 * Main API for the Section-Level Hybrid Retrieval System.
 *
 * Provides methods to:
 * - Index Markdown files and directories
 * - Search using hybrid (BM25 + vector) search
 * - Save and load the index from disk
 *
 * @example
 * ```typescript
 * const index = new RagIndex();
 * await index.indexDirectory('./docs');
 *
 * const results = await index.search('How does authentication work?', {
 *   mode: 'section',
 *   limit: 5,
 * });
 *
 * await index.save('./index.json');
 * ```
 */
export class RagIndex {
  private options: Required<RagIndexOptions>;
  private store: OramaStore;
  private parser: MarkdownParser;
  private chunker: SectionChunker;
  private embedder: LocalEmbedder;
  private searchService: HybridSearchService | null = null;
  private aggregator: SectionAggregator;
  private persistence: IndexPersistence;
  private metadata: IndexMetadata;
  private isInitialized: boolean = false;

  /**
   * Create a new RagIndex.
   * @param options - Configuration options
   */
  constructor(options: Partial<RagIndexOptions> = {}) {
    this.options = RagIndexOptionsSchema.parse(options) as Required<RagIndexOptions>;
    this.store = new OramaStore();
    this.parser = new MarkdownParser();
    this.chunker = new SectionChunker(this.options);
    this.embedder = LocalEmbedder.getInstance(this.options.modelPath, this.options.vocabPath);
    this.aggregator = new SectionAggregator();
    this.persistence = new IndexPersistence();
    this.metadata = createEmptyMetadata();
  }

  /**
   * Initialize the index.
   * Called automatically by other methods when needed.
   */
  private async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    await this.store.initialize();
    await this.embedder.initialize();
    this.searchService = new HybridSearchService(this.store, this.options.bm25Weight);
    this.isInitialized = true;
  }

  /**
   * Index a single Markdown file.
   * @param filePath - Path to the Markdown file
   * @param forceReindex - Force re-indexing even if content hasn't changed
   */
  async indexFile(filePath: string, forceReindex: boolean = false): Promise<void> {
    await this.initialize();

    // Parse the document
    const document = await this.parser.parseFile(filePath);

    // Check if re-indexing is needed
    const storedHash = this.metadata.documentHashes[document.doc];
    if (!forceReindex && !documentNeedsReindex(document.contentHash, storedHash)) {
      return; // No changes, skip
    }

    // Remove existing chunks for this document
    await this.store.removeDocumentChunks(document.doc);

    // Chunk the document
    const preChunks = this.chunker.chunkDocument(document);

    // Generate embeddings and create full chunks
    const chunks = await this.createChunksWithEmbeddings(preChunks);

    // Insert into store
    await this.store.insertChunks(chunks);

    // Update metadata
    this.metadata.documentHashes[document.doc] = document.contentHash;
  }

  /**
   * Index all Markdown files in a directory.
   * @param dirPath - Path to the directory
   * @param recursive - Whether to search recursively (default: true)
   * @param forceReindex - Force re-indexing even if content hasn't changed
   * @param maxChunkCount - Maximum number of chunks to index (for testing, default: unlimited)
   */
  async indexDirectory(
    dirPath: string,
    recursive: boolean = true,
    forceReindex: boolean = false,
    maxChunkCount?: number
  ): Promise<void> {
    await this.initialize();

    // Parse all documents
    const documents = await this.parser.parseDirectory(dirPath, recursive);

    let totalChunksIndexed = 0;

    for (const document of documents) {
      // Check if we've reached the max chunk count
      if (maxChunkCount !== undefined && totalChunksIndexed >= maxChunkCount) {
        break;
      }

      // Check if re-indexing is needed
      const docKey = `${document.path}/${document.doc}`;
      const storedHash = this.metadata.documentHashes[docKey];

      if (!forceReindex && !documentNeedsReindex(document.contentHash, storedHash)) {
        continue; // No changes, skip
      }

      // Remove existing chunks for this document
      await this.store.removeDocumentChunks(document.doc);

      // Chunk the document
      const preChunks = this.chunker.chunkDocument(document);

      // Limit chunks if we're approaching maxChunkCount
      let chunksToProcess = preChunks;
      if (maxChunkCount !== undefined) {
        const remainingCapacity = maxChunkCount - totalChunksIndexed;
        if (preChunks.length > remainingCapacity) {
          chunksToProcess = preChunks.slice(0, remainingCapacity);
        }
      }

      // Generate embeddings and create full chunks
      const chunks = await this.createChunksWithEmbeddings(chunksToProcess);

      // Insert into store
      await this.store.insertChunks(chunks);

      // Update metadata
      this.metadata.documentHashes[docKey] = document.contentHash;

      totalChunksIndexed += chunks.length;
    }
  }

  /**
   * Index Markdown content from a string.
   * @param content - Raw Markdown content
   * @param doc - Document filename
   * @param docPath - Document path (default: '.')
   */
  async indexContent(content: string, doc: string, docPath: string = '.'): Promise<void> {
    await this.initialize();

    // Parse the content
    const document = this.parser.parseContent(content, doc, docPath);

    // Remove existing chunks for this document
    await this.store.removeDocumentChunks(doc);

    // Chunk the document
    const preChunks = this.chunker.chunkDocument(document);

    // Generate embeddings and create full chunks
    const chunks = await this.createChunksWithEmbeddings(preChunks);

    // Insert into store
    await this.store.insertChunks(chunks);

    // Update metadata
    this.metadata.documentHashes[doc] = document.contentHash;
  }

  /**
   * Create chunks with embeddings from pre-chunks.
   */
  private async createChunksWithEmbeddings(preChunks: PreChunk[]): Promise<Chunk[]> {
    const texts = preChunks.map(c => c.text);
    const embeddings = await this.embedder.embedBatch(texts);

    return preChunks.map((preChunk, index) => ({
      ...preChunk,
      embedding: embeddings[index],
    }));
  }

  /**
   * Search the index.
   * @param query - Search query text
   * @param options - Search options (mode, limit, filter)
   * @returns Array of results based on the specified mode
   */
  async search(query: string, options?: SearchOptions): Promise<Section[] | Chunk[] | Document[]> {
    await this.initialize();

    if (!this.searchService) {
      throw new Error('Search service not initialized');
    }

    const validatedOptions = SearchOptionsSchema.parse(options || {});

    // Perform hybrid search
    const hits = await this.searchService.search(query, validatedOptions);

    // Aggregate based on mode
    return this.aggregator.aggregate(hits, validatedOptions.mode, validatedOptions.limit);
  }

  /**
   * Search and return sections (convenience method).
   * @param query - Search query text
   * @param limit - Maximum number of results
   * @returns Array of sections
   */
  async searchSections(query: string, limit: number = 10): Promise<Section[]> {
    return this.search(query, { mode: 'section', limit }) as Promise<Section[]>;
  }

  /**
   * Search and return chunks (convenience method).
   * @param query - Search query text
   * @param limit - Maximum number of results
   * @returns Array of chunks
   */
  async searchChunks(query: string, limit: number = 10): Promise<Chunk[]> {
    return this.search(query, { mode: 'chunk', limit }) as Promise<Chunk[]>;
  }

  /**
   * Search and return documents (convenience method).
   * @param query - Search query text
   * @param limit - Maximum number of results
   * @returns Array of documents
   */
  async searchDocuments(query: string, limit: number = 10): Promise<Document[]> {
    return this.search(query, { mode: 'document', limit }) as Promise<Document[]>;
  }

  /**
   * Save the index to disk.
   * @param filePath - Path to save the index file
   */
  async save(filePath: string): Promise<void> {
    await this.initialize();

    const chunks = await this.store.getAllChunks();

    await this.persistence.save(filePath, chunks, this.metadata, this.options);
  }

  /**
   * Load an index from disk.
   * @param filePath - Path to the index file
   * @returns A new RagIndex populated with the loaded data
   */
  static async load(filePath: string): Promise<RagIndex> {
    const persistence = new IndexPersistence();
    const data = await persistence.load(filePath);

    // Create new index with the loaded options
    const index = new RagIndex(data.options);
    await index.initialize();

    // Insert all chunks
    await index.store.insertChunks(data.chunks);

    // Restore metadata
    index.metadata = data.metadata;

    return index;
  }

  /**
   * Clear all indexed data.
   */
  async clear(): Promise<void> {
    await this.initialize();
    await this.store.clear();
    this.metadata = createEmptyMetadata();
  }

  /**
   * Get the number of indexed chunks.
   */
  async getChunkCount(): Promise<number> {
    await this.initialize();
    return this.store.getChunkCount();
  }

  /**
   * Get the number of indexed documents.
   */
  getDocumentCount(): number {
    return Object.keys(this.metadata.documentHashes).length;
  }

  /**
   * Get the index metadata.
   */
  getMetadata(): IndexMetadata {
    return { ...this.metadata };
  }

  /**
   * Get the index options.
   */
  getOptions(): RagIndexOptions {
    return { ...this.options };
  }

  /**
   * Check if the index has been initialized.
   */
  getIsInitialized(): boolean {
    return this.isInitialized;
  }
}
