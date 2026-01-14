/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { z } from 'zod';
import {
  WORKFLOW_TOOL_BASE_INPUT_SCHEMA,
  MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA,
  WorkflowToolMetadata,
} from '../../../common/metadata.js';

/**
 * Get Input Tool Input Schema
 */
export const GET_INPUT_PROPERTY_SCHEMA = z
  .object({
    propertyName: z.string().describe('The name of the property'),
    friendlyName: z.string().describe('The friendly name of the property'),
    description: z.string().describe('The description of the property'),
  })
  .describe(
    'The metadata for the property to be queried, used to formulate a prompting question for input'
  );

export const GET_INPUT_WORKFLOW_INPUT_SCHEMA = WORKFLOW_TOOL_BASE_INPUT_SCHEMA.extend({
  propertiesRequiringInput: z
    .array(GET_INPUT_PROPERTY_SCHEMA)
    .describe('The metadata for the properties that require input from the user'),
});

export const GET_INPUT_WORKFLOW_RESULT_SCHEMA = z.object({
  userUtterance: z.unknown().describe("The user's response to the question"),
});

export type GetInputWorkflowInput = z.infer<typeof GET_INPUT_WORKFLOW_INPUT_SCHEMA>;

/** Input type for guidance generation (excludes workflowStateData) */
export type GetInputGuidanceInput = Omit<GetInputWorkflowInput, 'workflowStateData'>;

/**
 * Get Input Tool Metadata Type
 */
export type GetInputToolMetadata = WorkflowToolMetadata<
  typeof GET_INPUT_WORKFLOW_INPUT_SCHEMA,
  typeof GET_INPUT_WORKFLOW_RESULT_SCHEMA
>;

/**
 * Creates a "prompt-friendly" description of the properties requiring input.
 * Helper function used by generateTaskGuidance.
 *
 * @param properties - Array of properties requiring user input
 * @returns A formatted description of the properties
 */
function generatePropertiesDescription(
  properties: z.infer<typeof GET_INPUT_PROPERTY_SCHEMA>[]
): string {
  return properties
    .map(
      property =>
        `- Property Name: ${property.propertyName}\n- Friendly Name: ${property.friendlyName}\n- Description: ${property.description}`
    )
    .join('\n\n');
}

/**
 * Generates the task guidance for user input collection.
 * This is the single source of truth for the input gathering prompt.
 *
 * @param input - The input containing properties requiring user input
 * @returns The guidance prompt string
 */
function generateGetInputTaskGuidance(input: Record<string, unknown>): string {
  const typedInput = input as GetInputGuidanceInput;
  return `
# ROLE
You are an input gathering tool, responsible for explicitly requesting and gathering the
user's input for a set of unfulfilled properties.

# TASK
Your job is to provide a prompt to the user that outlines the details for a set of properties
that require the user's input. The prompt should be polite and conversational.

# CONTEXT
Here is the list of properties that require the user's input, along with their describing
metadata:

${generatePropertiesDescription(typedInput.propertiesRequiringInput)}

# INSTRUCTIONS
1. Based on the properties listed in "CONTEXT", generate a prompt that outlines the details
   for each property.
2. Present the prompt to the user and instruct the user to provide their input.
3. **IMPORTANT:** YOU MUST NOW WAIT for the user to provide a follow-up response to your prompt.
    1. You CANNOT PROCEED FROM THIS STEP until the user has provided THEIR OWN INPUT VALUE.
`;
}

/**
 * Factory function to create Get Input Tool metadata with a dynamic tool ID
 *
 * @param toolId - The unique identifier for the tool (e.g., 'magen-get-input', 'mobile-magen-get-input')
 * @returns Tool metadata object for Get Input Tool
 */
export function createGetInputMetadata(toolId: string): GetInputToolMetadata {
  return {
    toolId,
    title: 'Get User Input',
    description: 'Provides a prompt to the user to elicit their input for a set of properties',
    inputSchema: GET_INPUT_WORKFLOW_INPUT_SCHEMA,
    outputSchema: MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA,
    resultSchema: GET_INPUT_WORKFLOW_RESULT_SCHEMA,
    generateTaskGuidance: generateGetInputTaskGuidance,
  } as const;
}
