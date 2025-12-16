# Section-Level Hybrid Retrieval System (Markdown Corpus)

## 1. Overview

This document specifies a **section-level retrieval system** for Markdown documentation using **local embeddings** and **hybrid search**. The system is designed for **offline / local-first** usage and focuses on **embedding + retrieval only** (no generation).

The core idea is:

- Index Markdown files at **chunk level** for accuracy
- Retrieve results using **hybrid (BM25 + vector) search**
- **Return results at section level** for coherent, human-readable output

---

## 2. User Requirements

### Functional Requirements

1. Support indexing **multiple Markdown (.md) files**
2. Perform **local embedding** (no external API dependency)
3. Support **hybrid search** (keyword + semantic)
4. Return retrieval results at **section level**, not raw chunks
5. Allow retrieval across all documents or scoped by file / path
6. Store embeddings for reuse (no re-embedding on each query)

### Non-Functional Requirements

- TypeScript-first implementation
- Lightweight, embedded database (no server)
- Works fully offline after initial setup
- Easy to incrementally update documents
- Suitable for small–medium corpora (up to ~20k chunks)

---

## 3. High-Level Architecture

```
Markdown Files
     ↓
Markdown Parser
     ↓
Section-aware Chunker
     ↓
Local Embedding Model
     ↓
OramaDB (Text + Vector)
     ↓
Hybrid Retrieval
     ↓
Section Reconstruction
     ↓
Search Results
```

---

## 4. Technical Design Choices

### 4.1 Embedding Model

**Choice:** `Xenova/all-MiniLM-L6-v2`

**Rationale:**

- Runs fully locally (WebAssembly / Node)
- Small and fast
- Good semantic performance for documentation
- 384-dimensional vectors (lightweight)

**Embedding Strategy:**

- Mean pooling
- Normalized vectors

---

### 4.2 Vector + Text Store

**Choice:** OramaDB

**Why OramaDB:**

- Native TypeScript support
- Embedded (no infra)
- Hybrid search (BM25 + vector) out of the box
- Simple schema and APIs

**Limitations (accepted):**

- Not optimized for very large corpora (>50k chunks)
- In-memory growth is linear

---

## 5. Data Model

### 5.1 Orama Schema

```ts
await create({
  schema: {
    id: 'string',
    text: 'string', // chunk text
    embedding: 'vector[384]', // MiniLM
    doc: 'string', // filename
    path: 'string', // folder/module
    section: 'string', // section title
    sectionId: 'string', // doc::section
    chunkIndex: 'number',
  },
});
```

---

### 5.2 Document Store (Optional but Recommended)

```ts
Map<string, string>; // doc -> full markdown
```

Used to reconstruct full documents if needed.

---

## 6. Chunking Strategy

### Goals

- Preserve Markdown structure
- Enable section-level reconstruction
- Avoid semantic fragmentation

### Rules

- Split by Markdown headers (`#`, `##`, `###`)
- Chunk size: ~300–500 tokens
- Maintain order using `chunkIndex`

### Chunk Metadata

Each chunk must include:

- `doc`
- `section`
- `sectionId`
- `chunkIndex`

---

## 7. Indexing Flow

```ts
Markdown → Sections → Chunks → Embeddings → OramaDB
```

### Example Indexing Snippet

```ts
for (const chunk of chunks) {
  await insert(db, {
    id: `${doc}::${chunk.section}::${chunk.chunkIndex}`,
    text: chunk.text,
    embedding: await embed(chunk.text),
    doc,
    path,
    section: chunk.section,
    sectionId: `${doc}::${chunk.section}`,
    chunkIndex: chunk.chunkIndex,
  });
}
```

---

## 8. Retrieval Design

### 8.1 Hybrid Search

```ts
const results = await search(db, {
  term: query,
  vector: {
    value: await embed(query),
    property: 'embedding',
  },
  limit: 10,
});
```

This returns **chunk-level hits**.

---

### 8.2 Section-Level Aggregation (Key Design)

Chunks are grouped by `sectionId` after retrieval.

```ts
function groupBySection(hits) {
  const sections = new Map();

  for (const h of hits) {
    const id = h.document.sectionId;
    if (!sections.has(id)) {
      sections.set(id, {
        doc: h.document.doc,
        section: h.document.section,
        chunks: [],
      });
    }
    sections.get(id).chunks.push(h.document);
  }

  return [...sections.values()];
}
```

---

### 8.3 Section Reconstruction

Chunks are sorted and merged:

```ts
function buildSection(section) {
  return section.chunks
    .sort((a, b) => a.chunkIndex - b.chunkIndex)
    .map(c => c.text)
    .join('\n');
}
```

---

## 9. API Design

```ts
search(query, { mode: 'section' });
search(query, { mode: 'chunk' });
search(query, { mode: 'document' });
```

### Section-Level Return Shape

```json
{
  "doc": "auth.md",
  "section": "Token Refresh",
  "content": "...merged section content..."
}
```

---

## 10. Incremental Updates

Recommended approach:

- Compute hash per MD file
- Store hash in metadata
- Re-index only changed files

```ts
if (oldHash === newHash) skip();
```

---

## 11. Design Rationale Summary

- **Chunking** improves retrieval accuracy
- **Hybrid search** improves recall + precision
- **Section-level return** balances context and relevance
- **Local embeddings + OramaDB** keep system lightweight and offline

---

## 12. Future Enhancements

- Weighted hybrid scoring
- Section-level ranking instead of chunk-level
- Metadata filters (path, doc)
- File watcher for live re-indexing
- UI-friendly highlighting

---

## 13. Conclusion

This design provides a **clean, scalable, and practical** retrieval system for Markdown documentation, optimized for developer tools and internal knowledge systems. It follows modern RAG indexing best practices while remaining lightweight and fully local.
