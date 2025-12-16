# @salesforce/mcp-rag

Section-Level Hybrid Retrieval System for Markdown Documentation.

## Overview

This package provides a **section-level retrieval system** for Markdown documentation using **local embeddings** and **hybrid search**. It is designed for **offline / local-first** usage and focuses on **embedding + retrieval only** (no generation).

## Features

- Index Markdown files at **chunk level** for accuracy
- Retrieve results using **hybrid (BM25 + vector) search**
- **Return results at section level** for coherent, human-readable output
- Local embeddings via `Xenova/all-MiniLM-L6-v2`
- File-based persistence for the index

## Installation

```bash
npm install @salesforce/mcp-rag
```

## Usage

```typescript
import { RagIndex } from '@salesforce/mcp-rag';

// Create and populate index
const index = new RagIndex();
await index.indexDirectory('./docs');

// Search
const results = await index.search('How does authentication work?', {
  mode: 'section',
  limit: 5,
});

// Persist index
await index.save('./index.json');

// Load existing index
const loadedIndex = await RagIndex.load('./index.json');
```

## API

### `RagIndex`

#### Indexing

- `indexFile(filePath: string): Promise<void>` - Index a single Markdown file
- `indexDirectory(dirPath: string): Promise<void>` - Index all Markdown files in a directory

#### Retrieval

- `search(query: string, options?: SearchOptions): Promise<Section[]>` - Search the index

#### Persistence

- `save(outputPath: string): Promise<void>` - Save index to disk
- `static load(indexPath: string): Promise<RagIndex>` - Load index from disk

### `SearchOptions`

```typescript
interface SearchOptions {
  mode: 'section' | 'chunk' | 'document';
  limit?: number;
  filter?: { path?: string; doc?: string };
}
```

## License

MIT
