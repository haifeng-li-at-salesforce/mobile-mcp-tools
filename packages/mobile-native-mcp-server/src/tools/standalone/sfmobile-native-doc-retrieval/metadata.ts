/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import z from 'zod';
import { DocumentSchema } from '@salesforce/mcp-rag';
import { type ToolMetadata } from '@salesforce/magen-mcp-workflow';

/**
 * MSDK Doc Retrieval Tool Input Schema
 */
export const DOC_RETRIEVAL_INPUT_SCHEMA = z.object({
  userUtterance: z
    .string()
    .describe('Natural language query to search for relevant MSDK documentation'),
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .default(5)
    .describe('Maximum number of documents to return (default: 5)'),
});

export type DocRetrievalInput = z.infer<typeof DOC_RETRIEVAL_INPUT_SCHEMA>;

/**
 * MSDK Doc Retrieval Tool Output Schema
 */
export const DOC_RETRIEVAL_OUTPUT_SCHEMA = z.object({
  documents: z.array(DocumentSchema).describe('Retrieved MSDK documentation matching the query'),
});

export type DocRetrievalOutput = z.infer<typeof DOC_RETRIEVAL_OUTPUT_SCHEMA>;

/**
 * MSDK Doc Retrieval Standalone Tool Metadata
 */
export const DOC_RETRIEVAL_TOOL: ToolMetadata<
  typeof DOC_RETRIEVAL_INPUT_SCHEMA,
  typeof DOC_RETRIEVAL_OUTPUT_SCHEMA
> = {
  toolId: 'sfmobile-native-doc-retrieval',
  title: 'MSDK Documentation Retrieval',
  description:
    'Retrieves relevant Mobile SDK (MSDK) documentation based on a natural language query. ' +
    'This tool serves as the technical reference for transforming app generation queries into functional MSDK code.',
  inputSchema: DOC_RETRIEVAL_INPUT_SCHEMA,
  outputSchema: DOC_RETRIEVAL_OUTPUT_SCHEMA,
} as const;
