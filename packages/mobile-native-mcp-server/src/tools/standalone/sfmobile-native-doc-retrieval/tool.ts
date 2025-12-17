/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { RagIndex } from '@salesforce/mcp-rag';
import { AbstractTool, Logger } from '@salesforce/magen-mcp-workflow';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {
  DOC_RETRIEVAL_TOOL,
  DOC_RETRIEVAL_OUTPUT_SCHEMA,
  type DocRetrievalInput,
} from './metadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Standalone MCP tool for retrieving MSDK documentation.
 *
 * This tool accepts a natural language query and returns relevant
 * Mobile SDK documentation using the RAG index engine.
 */
export class SFMobileNativeDocRetrievalTool extends AbstractTool<typeof DOC_RETRIEVAL_TOOL> {
  private ragIndex: RagIndex | null = null;
  private indexPath: string;

  constructor(server: McpServer, logger?: Logger, indexPath?: string) {
    super(server, DOC_RETRIEVAL_TOOL, 'SFMobileNativeDocRetrievalTool', logger);

    // Default index path is relative to the package root
    this.indexPath =
      indexPath ?? path.resolve(__dirname, '..', '..', '..', '..', 'msdk-docs-index.json');
  }

  /**
   * Handle incoming requests for MSDK documentation retrieval.
   */
  public handleRequest = async (input: DocRetrievalInput): Promise<CallToolResult> => {
    try {
      this.logger.info('Processing doc retrieval request', {
        query: input.userUtterance,
        limit: input.limit,
      });

      const index = await this.getOrLoadIndex();
      const documents = await index.searchDocuments(input.userUtterance, input.limit ?? 5);

      this.logger.info('Retrieved documents', { count: documents.length });

      const output = DOC_RETRIEVAL_OUTPUT_SCHEMA.parse({ documents });

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(output, null, 2),
          },
        ],
        structuredContent: output,
      };
    } catch (error) {
      this.logError('Failed to retrieve MSDK documentation', error as Error, {
        query: input.userUtterance,
      });

      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              error: error instanceof Error ? error.message : 'Unknown error occurred',
              documents: [],
            }),
          },
        ],
      };
    }
  };

  /**
   * Lazily load the RAG index on first request.
   * Caches the index for subsequent requests.
   */
  private async getOrLoadIndex(): Promise<RagIndex> {
    if (this.ragIndex) {
      this.logger.info('Using cached MSDK docs index', { path: this.indexPath });
      return this.ragIndex;
    }

    this.logger.info('Loading MSDK docs index', { path: this.indexPath });
    this.ragIndex = await RagIndex.load(this.indexPath);
    this.logger.info('MSDK docs index loaded successfully', {
      documentCount: this.ragIndex.getDocumentCount(),
    });

    return this.ragIndex;
  }
}
