/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import {
  IndexPersistence,
  createEmptyMetadata,
  documentNeedsReindex,
} from '../../src/storage/persistence.js';
import { type Chunk, type IndexMetadata, INDEX_VERSION } from '../../src/types.js';

describe('IndexPersistence', () => {
  let tempDir: string;
  let persistence: IndexPersistence;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-rag-test-'));
    persistence = new IndexPersistence();
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true });
  });

  const createMockChunk = (id: string): Chunk => ({
    id,
    text: 'Test content',
    embedding: new Array(384).fill(0.1),
    doc: 'test.md',
    path: '/docs',
    section: 'Test Section',
    sectionId: 'test.md::Test Section',
    chunkIndex: 0,
  });

  const createMockMetadata = (): IndexMetadata => ({
    documentHashes: { 'test.md': 'abc123' },
    lastUpdated: new Date().toISOString(),
    version: INDEX_VERSION,
  });

  describe('save and load', () => {
    it('should save and load index correctly', async () => {
      const filePath = path.join(tempDir, 'index.json');
      const chunks = [createMockChunk('chunk1'), createMockChunk('chunk2')];
      const metadata = createMockMetadata();
      const options = { chunkSize: 400, chunkOverlap: 50 };

      await persistence.save(filePath, chunks, metadata, options);
      const loaded = await persistence.load(filePath);

      expect(loaded.chunks).toHaveLength(2);
      expect(loaded.chunks[0].id).toBe('chunk1');
      expect(loaded.metadata.documentHashes['test.md']).toBe('abc123');
      expect(loaded.options.chunkSize).toBe(400);
    });

    it('should update lastUpdated on save', async () => {
      const filePath = path.join(tempDir, 'index.json');
      const oldMetadata = {
        ...createMockMetadata(),
        lastUpdated: '2020-01-01T00:00:00.000Z',
      };

      await persistence.save(filePath, [], oldMetadata, {});
      const loaded = await persistence.load(filePath);

      expect(loaded.metadata.lastUpdated).not.toBe('2020-01-01T00:00:00.000Z');
    });

    it('should throw on version mismatch', async () => {
      const filePath = path.join(tempDir, 'index.json');
      const badData = {
        metadata: { version: '99.0.0', documentHashes: {}, lastUpdated: '' },
        chunks: [],
        options: {},
      };

      await fs.writeFile(filePath, JSON.stringify(badData));

      await expect(persistence.load(filePath)).rejects.toThrow('version mismatch');
    });
  });

  describe('exists', () => {
    it('should return true for existing file', async () => {
      const filePath = path.join(tempDir, 'index.json');
      await fs.writeFile(filePath, '{}');

      expect(await persistence.exists(filePath)).toBe(true);
    });

    it('should return false for non-existing file', async () => {
      const filePath = path.join(tempDir, 'nonexistent.json');

      expect(await persistence.exists(filePath)).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete file', async () => {
      const filePath = path.join(tempDir, 'index.json');
      await fs.writeFile(filePath, '{}');

      await persistence.delete(filePath);

      expect(await persistence.exists(filePath)).toBe(false);
    });
  });

  describe('getMetadata', () => {
    it('should return metadata without loading chunks', async () => {
      const filePath = path.join(tempDir, 'index.json');
      const chunks = [createMockChunk('chunk1')];
      const metadata = createMockMetadata();

      await persistence.save(filePath, chunks, metadata, {});
      const loadedMetadata = await persistence.getMetadata(filePath);

      expect(loadedMetadata?.documentHashes['test.md']).toBe('abc123');
    });

    it('should return null for non-existing file', async () => {
      const filePath = path.join(tempDir, 'nonexistent.json');

      expect(await persistence.getMetadata(filePath)).toBe(null);
    });
  });
});

describe('createEmptyMetadata', () => {
  it('should create metadata with empty documentHashes', () => {
    const metadata = createEmptyMetadata();

    expect(metadata.documentHashes).toEqual({});
    expect(metadata.version).toBe(INDEX_VERSION);
    expect(metadata.lastUpdated).toBeDefined();
  });
});

describe('documentNeedsReindex', () => {
  it('should return true when storedHash is undefined', () => {
    expect(documentNeedsReindex('abc123', undefined)).toBe(true);
  });

  it('should return true when hashes differ', () => {
    expect(documentNeedsReindex('abc123', 'def456')).toBe(true);
  });

  it('should return false when hashes match', () => {
    expect(documentNeedsReindex('abc123', 'abc123')).toBe(false);
  });
});
