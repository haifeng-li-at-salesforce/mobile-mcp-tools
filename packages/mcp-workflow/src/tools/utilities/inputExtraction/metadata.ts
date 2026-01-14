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
 * Input Extraction Tool Input Schema
 */
export const INPUT_EXTRACTION_WORKFLOW_INPUT_SCHEMA = WORKFLOW_TOOL_BASE_INPUT_SCHEMA.extend({
  userUtterance: z
    .unknown()
    .describe(
      'Raw user input - can be text, structured data, or any format describing their request'
    ),
  propertiesToExtract: z
    .array(
      z
        .object({
          propertyName: z.string().describe('The name of the property'),
          description: z.string().describe('The description of the property'),
        })
        .describe('The name of the property and its description to correlate with the user input')
    )
    .describe('The array of properties to extract from the user input'),
  resultSchema: z
    .string()
    .describe('The JSON schema definining the extracted properties structure, as a string'),
});

// NOTE: This is a nominal definition, as the actual schema is dynamic, and needs to come
// through the input schema. Having this defined is an artifact of needing to reconsider
// our design for schema representation in our server tools.
export const INPUT_EXTRACTION_WORKFLOW_RESULT_SCHEMA = z.object({
  resultSchema: z
    .string()
    .describe('The JSON schema definining the extracted properties structure, as a string'),
});

export type InputExtractionWorkflowInput = z.infer<typeof INPUT_EXTRACTION_WORKFLOW_INPUT_SCHEMA>;

/** Input type for guidance generation (excludes workflowStateData) */
export type InputExtractionGuidanceInput = Omit<InputExtractionWorkflowInput, 'workflowStateData'>;

/**
 * Input Extraction Tool Metadata Type
 */
export type InputExtractionToolMetadata = WorkflowToolMetadata<
  typeof INPUT_EXTRACTION_WORKFLOW_INPUT_SCHEMA,
  typeof INPUT_EXTRACTION_WORKFLOW_RESULT_SCHEMA
>;

/**
 * Generates the task guidance for input extraction.
 * This is the single source of truth for the extraction prompt.
 *
 * @param input - The input containing user utterance and properties to extract
 * @returns The guidance prompt string
 */
function generateInputExtractionTaskGuidance(input: Record<string, unknown>): string {
  const typedInput = input as InputExtractionGuidanceInput;
  return `
# ROLE
You are a **conservative** data extraction tool. Your primary directive is to ONLY extract 
values that are EXPLICITLY and LITERALLY stated in the user's input. You never guess, 
assume, infer, or fill in missing information.

# CRITICAL CONSTRAINT

**When in doubt, output \`null\`.** It is ALWAYS better to return \`null\` for a property 
than to guess or infer a value. Guessing causes downstream errors. Missing values can be 
collected later. There is NO penalty for returning \`null\`, but there IS a penalty for 
inventing values.

---
# TASK

Analyze the user utterance below and extract ONLY values that are EXPLICITLY stated.
For each property, output either:
- The EXACT value found in the text, OR
- \`null\` if the value is not explicitly present

---
# CONTEXT

## USER UTTERANCE TO ANALYZE
${JSON.stringify(typedInput.userUtterance)}

## PROPERTIES TO EXTRACT
\`\`\`json
${JSON.stringify(typedInput.propertiesToExtract)}
\`\`\`

---
# INSTRUCTIONS

1. Read the "USER UTTERANCE TO ANALYZE" carefully.
2. For each property in "PROPERTIES TO EXTRACT":
   - Search for an EXPLICIT, LITERAL value in the user's text
   - If found verbatim or with trivial transformation, extract it
   - If NOT found, you MUST output \`null\`
3. Ensure output keys exactly match the \`propertyName\` values from the input list.

---
# EXAMPLES OF CORRECT BEHAVIOR

**Example 1 - Partial Information:**
User says: "I want to build an iOS app"
Properties: platform, projectName
Correct output: { "platform": "iOS", "projectName": null }
WRONG output: { "platform": "iOS", "projectName": "MyApp" }  // "MyApp" was NEVER mentioned!

**Example 2 - No Relevant Information:**
User says: "Hello, I need help"
Properties: platform, projectName
Correct output: { "platform": null, "projectName": null }
WRONG output: { "platform": "iOS", "projectName": "App" }  // Both are fabricated!

**Example 3 - Complete Information:**
User says: "Create an Android app called WeatherTracker"
Properties: platform, projectName
Correct output: { "platform": "Android", "projectName": "WeatherTracker" }

---
# FINAL REMINDER

**DO NOT GUESS. DO NOT INFER. DO NOT ASSUME.**
If a value is not EXPLICITLY stated in the user utterance, output \`null\`.
When uncertain, \`null\` is ALWAYS the correct answer.
`;
}

/**
 * Factory function to create Input Extraction Tool metadata with a dynamic tool ID
 *
 * @param toolId - The unique identifier for the tool (e.g., 'magen-input-extraction', 'mobile-magen-input-extraction')
 * @returns Tool metadata object for Input Extraction Tool
 */
export function createInputExtractionMetadata(toolId: string): InputExtractionToolMetadata {
  return {
    toolId,
    title: 'Input Extraction',
    description: 'Parses user input and extracts structured project properties',
    inputSchema: INPUT_EXTRACTION_WORKFLOW_INPUT_SCHEMA,
    outputSchema: MCP_WORKFLOW_TOOL_OUTPUT_SCHEMA,
    resultSchema: INPUT_EXTRACTION_WORKFLOW_RESULT_SCHEMA,
    generateTaskGuidance: generateInputExtractionTaskGuidance,
  } as const;
}
