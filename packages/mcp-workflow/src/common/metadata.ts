/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import z from 'zod';

/**
 * Workflow state data schema for round-tripping session identity
 * This lightweight object maintains workflow session continuity across stateless MCP tool invocations
 */
export const WORKFLOW_STATE_DATA_SCHEMA = z.object({
  thread_id: z.string().describe('Unique identifier for the workflow session'),
});

export type WorkflowStateData = z.infer<typeof WORKFLOW_STATE_DATA_SCHEMA>;

/**
 * Workflow property names - single source of truth for property naming
 */
export const WORKFLOW_PROPERTY_NAMES = {
  workflowStateData: 'workflowStateData',
  userInput: 'userInput',
} as const;

/**
 * Base input schema for workflow-aware tools
 * All tools participating in workflow orchestration should extend this schema
 */
export const WORKFLOW_TOOL_BASE_INPUT_SCHEMA = z.object({
  [WORKFLOW_PROPERTY_NAMES.workflowStateData]: WORKFLOW_STATE_DATA_SCHEMA.describe(
    'Workflow session state for continuation. Required for all workflow-aware tools, but optional for the orchestrator tool, because it can also start new workflows.'
  ),
});

/**
 * MCP tool invocation data structure used in LangGraph interrupts
 * Contains all information needed for the orchestrator to create tool invocation instructions
 *
 * @template TWorkflowInputSchema - The full workflow input schema (includes workflowStateData)
 */
export interface MCPToolInvocationData<TWorkflowInputSchema extends z.ZodObject<z.ZodRawShape>> {
  /** Metadata about the tool to invoke */
  llmMetadata: {
    name: string;
    description: string;
    inputSchema: TWorkflowInputSchema;
  };
  /** Input parameters for the tool invocation - typed to business logic schema only */
  input: Omit<z.infer<TWorkflowInputSchema>, 'workflowStateData'>;
  /**
   * Flag indicating the orchestrator should handle user input collection directly
   * instead of delegating to a separate get-input tool.
   * When true, the orchestrator generates a user input collection prompt directly.
   */
  directUserInputCollection?: boolean;
}

/**
 * Standard output schema for all workflow MCP tools
 */
export const MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA = z.object({
  promptForLLM: z
    .string()
    .describe('Complete prompt with instructions and post-processing guidance'),
  resultSchema: z
    .string()
    .describe("The string-serialized JSON schema of the expected result from the LLM's task"),
});

export type MCPWorkflowToolOutput = z.infer<typeof MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA>;

/**
 * Base tool metadata interface - defines the general structure for tool information
 */
export interface ToolMetadata<
  TInputSchema extends z.ZodObject<z.ZodRawShape>,
  TOutputSchema extends z.ZodObject<z.ZodRawShape>,
> {
  /** Unique tool identifier used for MCP registration and workflow orchestration */
  readonly toolId: string;

  /** Extended tool title for detailed display */
  readonly title: string;

  /** Tool description for documentation and LLM context */
  readonly description: string;

  /** Zod input schema for validation */
  readonly inputSchema: TInputSchema;

  /** Zod output schema for validation */
  readonly outputSchema: TOutputSchema;
}

/**
 * Workflow tool metadata interface - defines the structure for workflow tool information
 */
export interface WorkflowToolMetadata<
  TInputSchema extends typeof WORKFLOW_TOOL_BASE_INPUT_SCHEMA,
  TResultSchema extends z.ZodObject<z.ZodRawShape>,
  TOutputSchema extends
    typeof MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA = typeof MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA,
> extends ToolMetadata<TInputSchema, TOutputSchema> {
  /** Holds the shape of the expected result for guidance-based tools */
  readonly resultSchema: TResultSchema;
}
