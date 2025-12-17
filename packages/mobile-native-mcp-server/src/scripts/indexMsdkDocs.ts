/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * Script to index markdown files under resources/msdk-docs/content/en-us/mobile-sdk/guides/
 * into msdk-docs-index.json using the mcp-rag package.
 */

import { RagIndex } from '@salesforce/mcp-rag';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(): Promise<void> {
  // Parse optional maxChunkCount from command line args
  // Usage: npm run index-msdk-docs -- --max-chunks=100
  const maxChunkArg = process.argv.find(arg => arg.startsWith('--max-chunks='));
  const maxChunkCount = maxChunkArg ? parseInt(maxChunkArg.split('=')[1], 10) : undefined;

  // Resolve paths relative to the package root
  const packageRoot = path.resolve(__dirname, '..', '..');
  const guidesDir = path.join(
    packageRoot,
    'resources',
    'msdk-docs',
    'content',
    'en-us',
    'mobile-sdk',
    'guides'
  );
  const outputFile = path.join(packageRoot, 'msdk-docs-index.json');

  console.log('Indexing markdown files from:', guidesDir);
  console.log('Output file:', outputFile);
  if (maxChunkCount !== undefined) {
    console.log('Max chunk count:', maxChunkCount);
  }

  // Create a new RagIndex instance
  const index = new RagIndex();

  // Index the guides directory recursively
  await index.indexDirectory(guidesDir, true, true, maxChunkCount);

  const chunkCount = await index.getChunkCount();
  const docCount = index.getDocumentCount();

  console.log(`Indexed ${docCount} documents with ${chunkCount} chunks`);

  // Save the index to disk
  await index.save(outputFile);

  console.log('Index saved to:', outputFile);
}

main().catch(error => {
  console.error('Error indexing documents:', error);
  process.exit(1);
});
