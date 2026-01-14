/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../../../logging/logger.js';
import { GetInputWorkflowInput, GetInputToolMetadata, createGetInputMetadata } from './metadata.js';
import { AbstractWorkflowTool } from '../../base/abstractWorkflowTool.js';

export class GetInputTool extends AbstractWorkflowTool<GetInputToolMetadata> {
  constructor(server: McpServer, toolId: string, orchestratorToolId: string, logger?: Logger) {
    super(server, createGetInputMetadata(toolId), orchestratorToolId, 'GetInputTool', logger);
  }

  public handleRequest = async (input: GetInputWorkflowInput) => {
    try {
      // Use the single source of truth for guidance generation from metadata
      const guidance = this.toolMetadata.generateTaskGuidance!(input);
      return this.finalizeWorkflowToolOutput(guidance, input.workflowStateData);
    } catch (error) {
      const toolError = error instanceof Error ? error : new Error('Unknown error occurred');
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: `Error: ${toolError.message}`,
          },
        ],
      };
    }
  };
}
