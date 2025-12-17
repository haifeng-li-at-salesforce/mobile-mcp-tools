/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { RagIndex } from '../src/ragIndex.js';
import { LocalEmbedder } from '../src/embedding/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('RagIndex - analytics-logging-framework.md', () => {
  let index: RagIndex;
  const testFilePath = join(
    __dirname,
    '../resources/msdk-docs/content/en-us/mobile-sdk/guides/analytics-logging-framework.md'
  );

  beforeEach(async () => {
    // Reset singleton to ensure clean state
    LocalEmbedder.resetInstance();
    index = new RagIndex();
  });

  afterAll(() => {
    // Clean up singleton
    LocalEmbedder.resetInstance();
  });

  describe('indexing analytics-logging-framework.md', () => {
    it('should index the analytics-logging-framework.md file', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Verify the file was indexed
      const chunkCount = await index.getChunkCount();
      expect(chunkCount).toBeGreaterThan(0);

      const docCount = index.getDocumentCount();
      expect(docCount).toBe(1);
    }, 30000); // 30 second timeout for indexing

    it('should retrieve content about logging framework', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Search for content about logging framework
      const results = await index.searchSections('logging framework', 5);

      // Verify we got results
      expect(results.length).toBeGreaterThan(0);

      // Verify the results are from the correct document
      const firstResult = results[0];
      expect(firstResult.doc).toBe('analytics-logging-framework.md');
    }, 30000);

    it('should retrieve content about SalesforceLogger', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Search for content about SalesforceLogger
      const results = await index.searchSections('SalesforceLogger', 5);

      // Verify we got results
      expect(results.length).toBeGreaterThan(0);

      // Check that at least one result contains relevant content
      // Section has 'content' property, not 'chunks'
      const hasRelevantContent = results.some(result =>
        result.content.toLowerCase().includes('salesforcelogger')
      );
      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it('should retrieve content about SFSDKLogger', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Search for content about SFSDKLogger
      const results = await index.searchSections('SFSDKLogger', 5);

      // Verify we got results
      expect(results.length).toBeGreaterThan(0);

      // Verify results are relevant
      // Section has 'content' property, not 'chunks'
      const hasRelevantContent = results.some(result =>
        result.content.toLowerCase().includes('sfsdklogger')
      );
      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it('should retrieve chunks with hybrid search', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Search using chunk mode
      const chunks = await index.searchChunks('analytics logging', 10);

      // Verify we got chunk results
      expect(chunks.length).toBeGreaterThan(0);

      // Each result should have required chunk properties
      chunks.forEach(chunk => {
        expect(chunk).toHaveProperty('id');
        expect(chunk).toHaveProperty('text');
        expect(chunk).toHaveProperty('embedding');
        expect(chunk).toHaveProperty('doc');
        expect(chunk).toHaveProperty('section');
        expect(chunk.doc).toBe('analytics-logging-framework.md');
      });
    }, 30000);

    it('should retrieve document-level results', async () => {
      // Index the file
      await index.indexFile(testFilePath);

      // Search using document mode
      const documents = await index.searchDocuments('logging framework', 5);

      // Verify we got document results
      expect(documents.length).toBeGreaterThan(0);

      // Check document structure (Document has: doc, path, content, score)
      const doc = documents[0];
      expect(doc).toHaveProperty('doc');
      expect(doc).toHaveProperty('path');
      expect(doc).toHaveProperty('content');
      expect(doc.doc).toBe('analytics-logging-framework.md');
      expect(doc.content.length).toBeGreaterThan(0);
    }, 30000);

    it('should handle re-indexing without duplicates', async () => {
      // Index the file twice
      await index.indexFile(testFilePath);
      const firstCount = await index.getChunkCount();

      await index.indexFile(testFilePath);
      const secondCount = await index.getChunkCount();

      // Count should remain the same (not doubled)
      expect(secondCount).toBe(firstCount);
    }, 30000);

    it('should save and load the index', async () => {
      // Index the file
      await index.indexFile(testFilePath);
      const originalCount = await index.getChunkCount();

      // Save the index
      const tempIndexPath = join(__dirname, '../temp-test-index.json');
      await index.save(tempIndexPath);

      // Load the index into a new instance
      const loadedIndex = await RagIndex.load(tempIndexPath);
      const loadedCount = await loadedIndex.getChunkCount();

      // Verify counts match
      expect(loadedCount).toBe(originalCount);

      // Verify we can search the loaded index
      const results = await loadedIndex.searchSections('logging', 3);
      expect(results.length).toBeGreaterThan(0);

      // Clean up
      //const { unlink } = await import('fs/promises');
      //await unlink(tempIndexPath);
    }, 300000);
  });
});
