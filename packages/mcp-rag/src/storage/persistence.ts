/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  type Chunk,
  type IndexMetadata,
  type RagIndexOptions,
  type SerializedIndex,
  INDEX_VERSION,
} from '../types.js';

/**
 * Handles saving and loading the RAG index to/from disk.
 */
export class IndexPersistence {
  /**
   * Save index data to a JSON file.
   * @param filePath - Path to save the index file
   * @param chunks - All chunks in the index
   * @param metadata - Index metadata
   * @param options - Index configuration options
   */
  async save(
    filePath: string,
    chunks: Chunk[],
    metadata: IndexMetadata,
    options: RagIndexOptions
  ): Promise<void> {
    const serialized: SerializedIndex = {
      metadata: {
        ...metadata,
        version: INDEX_VERSION,
        lastUpdated: new Date().toISOString(),
      },
      chunks,
      options,
    };

    const absolutePath = path.resolve(filePath);

    // Ensure directory exists
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });

    // Write atomically by writing to temp file first
    const tempPath = `${absolutePath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(serialized, null, 2), 'utf-8');
    await fs.rename(tempPath, absolutePath);
  }

  /**
   * Load index data from a JSON file.
   * @param filePath - Path to the index file
   * @returns Deserialized index data
   */
  async load(filePath: string): Promise<SerializedIndex> {
    const absolutePath = path.resolve(filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    const data = JSON.parse(content) as SerializedIndex;

    // Validate version compatibility
    if (!data.metadata?.version) {
      throw new Error('Invalid index file: missing version');
    }

    const [major] = data.metadata.version.split('.');
    const [currentMajor] = INDEX_VERSION.split('.');

    if (major !== currentMajor) {
      throw new Error(
        `Index version mismatch: file is v${data.metadata.version}, ` +
          `current is v${INDEX_VERSION}. Major version must match.`
      );
    }

    return data;
  }

  /**
   * Check if an index file exists.
   * @param filePath - Path to the index file
   * @returns True if the file exists
   */
  async exists(filePath: string): Promise<boolean> {
    const absolutePath = path.resolve(filePath);
    try {
      await fs.access(absolutePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete an index file.
   * @param filePath - Path to the index file
   */
  async delete(filePath: string): Promise<void> {
    const absolutePath = path.resolve(filePath);
    await fs.unlink(absolutePath);
  }

  /**
   * Get index metadata without loading all chunks.
   * This is useful for checking if an update is needed.
   * @param filePath - Path to the index file
   * @returns Index metadata or null if file doesn't exist
   */
  async getMetadata(filePath: string): Promise<IndexMetadata | null> {
    const absolutePath = path.resolve(filePath);

    try {
      const content = await fs.readFile(absolutePath, 'utf-8');
      const data = JSON.parse(content) as SerializedIndex;
      return data.metadata;
    } catch {
      return null;
    }
  }
}

/**
 * Helper to create empty index metadata.
 */
export function createEmptyMetadata(): IndexMetadata {
  return {
    documentHashes: {},
    lastUpdated: new Date().toISOString(),
    version: INDEX_VERSION,
  };
}

/**
 * Check if a document needs re-indexing based on hash.
 * @param currentHash - Current content hash
 * @param storedHash - Previously stored hash
 * @returns True if the document has changed
 */
export function documentNeedsReindex(currentHash: string, storedHash: string | undefined): boolean {
  return storedHash === undefined || currentHash !== storedHash;
}
