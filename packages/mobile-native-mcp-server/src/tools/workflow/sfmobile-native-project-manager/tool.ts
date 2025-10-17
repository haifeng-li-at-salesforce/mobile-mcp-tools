/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseCheckpointSaver, Command, MemorySaver } from '@langchain/langgraph';
import { getWorkflowStateStorePath } from '../../../utils/wellKnownDirectory.js';
import { ORCHESTRATOR_TOOL, OrchestratorInput, OrchestratorOutput } from './metadata.js';
import { Logger, createWorkflowLogger } from '../../../logging/logger.js';
import { AbstractTool } from '../../base/abstractTool.js';
import {
  MCPToolInvocationData,
  WORKFLOW_PROPERTY_NAMES,
  WorkflowStateData,
} from '../../../common/metadata.js';
import { mobileNativeWorkflow } from '../../../workflow/graph.js';
import { State } from '../../../workflow/metadata.js';
import { JsonCheckpointSaver } from '../../../workflow/jsonCheckpointer.js';
import { WorkflowStatePersistence } from '../../../workflow/workflowStatePersistence.js';

/**
 * Generate unique thread ID for workflow sessions
 */
function generateUniqueThreadId(): string {
  return `mobile-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Mobile Native Orchestrator Tool
 *
 * Implements the sfmobile-native-project-manager tool that orchestrates the complete
 * mobile app generation workflow using LangGraph.js for deterministic state management
 * and human-in-the-loop patterns for agentic task execution.
 */
export class MobileNativeOrchestrator extends AbstractTool<typeof ORCHESTRATOR_TOOL> {
  private readonly useMemoryForTesting: boolean;

  constructor(server: McpServer, logger?: Logger, useMemoryForTesting = false) {
    // Use provided logger (for testing) or create workflow logger (for production)
    const effectiveLogger = logger || createWorkflowLogger('MobileNativeOrchestrator');
    super(server, ORCHESTRATOR_TOOL, 'MobileNativeOrchestrator', effectiveLogger);
    this.useMemoryForTesting = useMemoryForTesting;
  }

  /**
   * Handle orchestrator requests - manages workflow state and execution
   */
  public handleRequest = async (input: OrchestratorInput) => {
    this.logger.debug('Orchestrator tool called with input', input);
    try {
      const result = await this.processRequest(input);
      this.logger.debug('Orchestrator returning result', result);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result),
          },
        ],
        structuredContent: result,
      };
    } catch (error) {
      this.logger.error('Error in orchestrator tool execution', error as Error);
      throw error;
    }
  };

  private async processRequest(input: OrchestratorInput): Promise<OrchestratorOutput> {
    // Generate or use existing thread ID for workflow session
    let threadId = '';
    try {
      const parsedInput = ORCHESTRATOR_TOOL.inputSchema.parse(input);
      threadId = parsedInput.workflowStateData.thread_id;
    } catch (error) {
      this.logger.error(
        'Error parsing orchestrator input. Starting a new workflow.',
        error as Error
      );
    }
    if (threadId === '') {
      threadId = generateUniqueThreadId();
    }
    const workflowStateData: WorkflowStateData = { thread_id: threadId };

    this.logger.info('Processing orchestrator request', {
      threadId,
      hasUserInput: !!input.userInput,
      isResumption: !!input.workflowStateData?.thread_id,
    });

    // Thread configuration for LangGraph
    const threadConfig = { configurable: { thread_id: threadId } };

    // Initialize checkpointer for state persistence
    const checkpointer = await this.createCheckpointer(this.useMemoryForTesting);

    // Compile workflow with checkpointer
    const compiledWorkflow = mobileNativeWorkflow.compile({ checkpointer });

    // Check for interrupted workflow state
    this.logger.debug('Checking for interrupted workflow state');
    let graphState = await compiledWorkflow.getState(threadConfig);
    const interruptedTask = graphState.tasks.find(task => task.interrupts.length > 0);

    let result: State;
    if (interruptedTask) {
      this.logger.info('Resuming interrupted workflow', {
        taskId: interruptedTask.id,
        interrupts: interruptedTask.interrupts.length,
      });

      // Validate and prepare resume value
      const resumeValue = this.validateResumeInput(
        input.userInput,
        interruptedTask,
        threadConfig.configurable.thread_id
      );

      // Resume workflow with validated result from previous tool execution
      result = await compiledWorkflow.invoke(new Command({ resume: resumeValue }), threadConfig);
    } else {
      // Start new workflow session
      this.logger.info('Starting new workflow execution');
      result = await compiledWorkflow.invoke(
        {
          userInput: input.userInput,
        },
        threadConfig
      );
    }

    this.logger.debug('Processing workflow result');
    graphState = await compiledWorkflow.getState(threadConfig);
    if (graphState.next.length > 0) {
      // There are more nodes to execute.
      const mcpToolInvocationData: MCPToolInvocationData<z.ZodObject<z.ZodRawShape>> | undefined =
        '__interrupt__' in result
          ? (
              result.__interrupt__ as Array<{
                value: MCPToolInvocationData<z.ZodObject<z.ZodRawShape>>;
              }>
            )[0].value
          : undefined;

      if (!mcpToolInvocationData) {
        this.logger.error('Workflow completed without expected MCP tool invocation.');
        throw new Error('FATAL: Unexpected workflow state without an interrupt');
      }

      this.logger.info('Invoking next MCP tool', {
        toolName: mcpToolInvocationData.llmMetadata?.name,
      });

      // Create orchestration prompt
      const orchestrationPrompt = this.createOrchestrationPrompt(
        mcpToolInvocationData,
        workflowStateData
      );

      // Save our workflow state to disk
      await this.saveCheckpointerState(checkpointer);

      return {
        orchestrationInstructionsPrompt: orchestrationPrompt,
      };
    }

    // Workflow completed.
    return {
      orchestrationInstructionsPrompt: 'The workflow has completed successfully.',
    };
  }

  /**
   * Validates the resume input by parsing JSON if needed
   *
   * @param userInput The input provided by the user/LLM for resumption
   * @param interruptedTask The task that was interrupted (from LangGraph state)
   * @param threadId The workflow thread ID for logging
   * @returns The parsed input value
   * @throws Error if interrupt data is not available or JSON parsing fails
   */
  private validateResumeInput(
    userInput: unknown,
    interruptedTask: { interrupts: Array<{ value?: unknown }> },
    threadId: string
  ): unknown {
    // Extract the interrupt data from the task
    const interruptData = interruptedTask.interrupts[0]?.value;

    if (!interruptData) {
      const error = new Error('Cannot resume workflow: No interrupt data available');
      this.logger.error(
        `No interrupt data found in interrupted task (threadId: ${threadId})`,
        error
      );
      throw error;
    }

    // Type guard to check if interrupt data has the expected structure
    const mcpToolInvocationData = interruptData as MCPToolInvocationData<
      z.ZodObject<z.ZodRawShape>
    >;

    const toolName = mcpToolInvocationData.llmMetadata.name;

    this.logger.debug('resumed input', { threadId, toolName, userInput });

    // If userInput is a string, try to parse it as JSON
    let inputToParse = userInput;
    if (typeof userInput === 'string') {
      try {
        inputToParse = JSON.parse(userInput);
        this.logger.debug('Successfully parsed JSON string input', {
          threadId,
          toolName,
        });
      } catch (error) {
        const errorMessage = `Resume input JSON parsing failed for tool "${toolName}" (threadId: ${threadId}): ${error instanceof Error ? error.message : String(error)}`;
        this.logger.error(errorMessage, error instanceof Error ? error : new Error(String(error)));
        throw new Error(errorMessage);
      }
    }

    return inputToParse;
  }

  /**
   * Create and configure workflow checkpointer for state persistence
   *
   * @param useMemoryForTesting - If true, uses MemorySaver for test isolation
   *
   */
  private async createCheckpointer(useMemoryForTesting = false): Promise<BaseCheckpointSaver> {
    if (useMemoryForTesting) {
      // Use MemorySaver for testing
      return new MemorySaver();
    }

    // Load checkpointer store data from .magen directory
    const workflowStateStorePath = getWorkflowStateStorePath();
    const checkpointer = new JsonCheckpointSaver();
    const statePersistence = new WorkflowStatePersistence(workflowStateStorePath);

    // Import the serialized state from disk if it exists
    const serializedState = await statePersistence.readState();
    if (serializedState) {
      this.logger.info('Importing existing checkpointer state');
      await checkpointer.importState(serializedState);
    } else {
      this.logger.info('No existing state found, starting with fresh checkpointer');
    }

    return checkpointer;
  }

  /**
   * Save the checkpointer state to disk
   *
   * Note: Only applies to our JsonCheckpointSaver.
   * @param checkpointer The checkpointer being used to manage workflow state
   */
  private async saveCheckpointerState(checkpointer: BaseCheckpointSaver): Promise<void> {
    // If we have a JSONCheckpointSaver (standard, non-test-env case), we need to persist
    // our state to disk.
    if (checkpointer instanceof JsonCheckpointSaver) {
      const exportedState = await checkpointer.exportState();
      const workflowStateStorePath = getWorkflowStateStorePath();
      const statePersistence = new WorkflowStatePersistence(workflowStateStorePath);
      await statePersistence.writeState(exportedState);
      this.logger.info('Checkpointer state successfully persisted');
    }
  }

  /**
   * Create orchestration prompt for LLM with embedded tool invocation data and workflow state
   */
  private createOrchestrationPrompt(
    mcpToolInvocationData: MCPToolInvocationData<z.ZodObject<z.ZodRawShape>>,
    workflowStateData: WorkflowStateData
  ): string {
    return `
# Your Role

You are participating in a workflow orchestration process. The current
(\`${this.toolMetadata.toolId}\`) MCP server tool is the orchestrator, and is sending
you instructions on what to do next. These instructions describe the next participating
MCP server tool to invoke, along with its input schema and input values.

# Your Task

Invoke the following MCP server tool:

**MCP Server Tool Name**: ${mcpToolInvocationData.llmMetadata?.name}
**MCP Server Tool Input Schema**:
\`\`\`json
${JSON.stringify(zodToJsonSchema(mcpToolInvocationData.llmMetadata?.inputSchema))}
\`\`\`
**MCP Server Tool Input Values**:
\`\`\`json
${JSON.stringify(mcpToolInvocationData.input)}
\`\`\`

## Additional Input: \`${WORKFLOW_PROPERTY_NAMES.workflowStateData}\`

\`${WORKFLOW_PROPERTY_NAMES.workflowStateData}\` is an additional input parameter that is
specified in the input schema above, and should be passed to the next MCP server tool
invocation, with the following object value:

\`\`\`json
${JSON.stringify(workflowStateData)}
\`\`\`

This represents opaque workflow state data that should be round-tripped back to the
\`${this.toolMetadata.toolId}\` MCP server tool orchestrator at the completion of the
next MCP server tool invocation, without modification. These instructions will be further
specified by the next MCP server tool invocation.

The MCP server tool you invoke will respond with its output, along with further
instructions for continuing the workflow.
`;
  }
}
