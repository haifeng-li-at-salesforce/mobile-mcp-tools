# How to Write MCP (Model Context Protocol) Evaluation Tests

This guide shows you how to create MCP Evaluation Tests for your MCP tools. This document is a bit verbose, with a complete reference implementation available for guidance, but the goal is to help AI experts creating new tests.

**Note:** This document is obviously focused on LWC, and specifically talks about evaluating MCP tools that provide the knowledge to identify and fix issues in single components. You should be able to adapt the evaluations to cover different scenarios but you may need help. Bring questions to the [#proj-a4d-adk-eval](https://salesforce.enterprise.slack.com/archives/C0702GXEYRM) channel.

---

## Overview

**MCP Evaluation Tests** verify that tools work correctly across models. These tests run end-to-end scenarios to validate tools and score the final result.

The evaluation process:

1. Uses an MCP client (Claude Code, Cursor or Cline CLI) to execute a tool
2. Confirms that the correct MCP tool was discovered and triggered as expected
3. Compares the generated output against expected reference examples
4. Provides LangSmith traces for monitoring and debugging

This document will not detail the four key metrics we typically log, but [another document by the ADK team](https://docs.google.com/document/d/1_T69_JrPULsBB0rsPxSX-U8oiYCrOll-JvzBj5AjXls/edit?tab=t.0#heading=h.d9p4ng368zow) provides that. For MCP evals, we also track the tools that we expect to be called.

---

## Directory Structure

MCP evaluation tests follow this structure:

```
src/mcp/
├── __tests__/                          # MCP evaluation tests directory
│   ├── dataset/                        # Shared MCP evaluation datasets
│   │   ├── bad/modules/c/              # Components with issues (shared by all tools)
│   │   ├── good/modules/c/             # Fixed reference components (shared by all tools)
│   │   └── {mcpToolName}Dataset.ts     # Dataset configuration (camelCase)
│   └── {mcpToolName}.eval.ts           # Evaluation test file (camelCase)
└── tools/                              # MCP tools directory
    └── {action}_lwc_{domain}.ts        # The MCP guide tool being tested
```

**Naming Convention**: Use the camelCase version of the MCP tool name (e.g., `guide_lwc_my_tool` → `guideLwcMyTool.eval.ts`).

**Tool Names Reference**: Find the official MCP tool name in `src/mcp/tools-names-const.ts` (e.g., `lwcGuideRtlSupportToolName = 'guide_lwc_rtl_support'`).

**Note**: The `bad/` and `good/` folders are currently shared across all MCP evaluation tests. Each dataset configuration file specifies which components it uses. Do **NOT** change a component used by another test or you may break their evals. (TODO: Future work is needed to enable per-test datasets.)

---

## Prerequisites

Before creating an MCP evaluation test, you'll need:

1. **The Tool You're Testing**: An existing tool in `src/mcp/tools/` (e.g., `guide_lwc_rtl.ts`)
2. **MCP Client**: You’ll need to configure an MCP-enabled client, such as Claude Code or Cursor. The setup is a bit involved and changes rapidly, so [we've documented those steps in a Google Doc](https://docs.google.com/document/d/1LGfqboDQa9jzVVsTPog_DiFoO8N1B1O5Xw7vpnD6O9c/edit?tab=t.xc2xwib64ruu#heading=h.m93aiaomk0ki).

---

## Creating an MCP Evaluation Test

### Step 1: Create the Dataset File

Create a dataset file in the MCP tests dataset directory:

**Naming Convention**: Use camelCase version of your MCP tool name + `Dataset.ts`

- Example: `guide_lwc_my_tool` → `guideLwcMyToolDataset.ts`
- **Tip**: Check `src/mcp/tools-names-const.ts` for the official tool name

**Location**: `src/mcp/__tests__/dataset/{mcpToolName}Dataset.ts`

**Example**: `src/mcp/__tests__/dataset/guideLwcMyToolDataset.ts`

```typescript
import { RunContext, LwcCodeType } from '@sfdc-internal/adk-core';
import { LwcAbstractDataset, CodeEvaluationData } from '@sfdc-internal/adk-eval';

/**
 * My Tool MCP Evaluation Dataset
 *
 * This dataset defines the components to be tested in your MCP evaluation.
 * Each component should have a clear issue that your MCP tool should fix.
 */
export default class GuideLwcMyToolDataset extends LwcAbstractDataset {
  protected getModuleUrl(): string {
    return import.meta.url;
  }

  // MCP evaluation datasets don't use the run method
  // This is required by the abstract class but not used
  async run([_code]: [LwcCodeType], _context: RunContext) {
    return [];
  }

  protected override initializeData(): CodeEvaluationData {
    return {
      dataset: [
        {
          input: { name: 'c/component1' }, // Component path in bad/good folders
          output: [], // Empty for MCP evaluations
        },
        {
          input: { name: 'c/component2' },
          output: [],
        },
        // Add at least 3-5 components for good coverage
      ],
    };
  }
}
```

**Key Points**:

- **Naming Convention**: Use PascalCase version of the tool name + `Dataset` (e.g., `guide_lwc_my_tool` → `GuideLwcMyToolDataset`)
- **File Name**: Match the class name in camelCase (e.g., `GuideLwcMyToolDataset` → `guideLwcMyToolDataset.ts`)
- Component names should match folders in `bad/modules/c/` and `good/modules/c/`
- Keep the `outputs` property empty `[]` for MCP evaluations. (It's used by our legacy reviewer evals.)

---

### Step 2: Create Bad Components

Create example components **with issues** to test against:

**Location**: `src/mcp/__tests__/dataset/bad/modules/c/[component-name]/`

**Note**: This is a shared folder used by all MCP evaluation tests.

**Structure**:

```
bad/modules/c/
  ├── component1/
  │   ├── component1.js
  │   ├── component1.html
  │   └── component1.css
  ├── component2/
  │   ├── component2.js
  │   └── component2.html
  └── ...
```

**Key Points**:

- Aim for 3-10 test components that represent a range of complexity
- Introduce realistic issues that your tool will fix
- Do **not** include comments that point out the issues. If the issues are subtle, describe them in the dataset file.

---

### Step 3: Create Good Components

Create **fixed versions** of the bad components:

**Location**: `src/mcp/__tests__/dataset/good/modules/c/[component-name]/`

**Note**: Remember, this is a shared folder used by all MCP evaluation tests.

**Structure**:

```
good/modules/c/
  ├── component1/
  │   ├── component1.js
  │   ├── component1.html
  │   └── component1.css
  ├── component2/
  │   ├── component2.js
  │   └── component2.html
  └── ...
```

**Key Points**:

- Create exact 1:1 matches for bad/good components
- Good components should represent the ideal fix
- Include all files needed for the component

---

### Step 4: Create the Evaluation Test File

Create the actual test file:

**Naming Convention**: Use camelCase version of your MCP tool name + `.eval.ts`

- Example: `guide_lwc_my_tool` → `guideLwcMyTool.eval.ts`
- **Tip**: Check `src/mcp/tools-names-const.ts` for the official tool name

**Location**: `src/mcp/__tests__/{mcpToolName}.eval.ts`

**Example**: `src/mcp/__tests__/guideLwcMyTool.eval.ts`

```typescript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, describe, logOutputs, wrapEvaluator } from 'langsmith/vitest';
import {
  getCurrentTestConfig,
  trace,
  computeLwcMcpToolEvalDataset,
  scoreLwcMcpToolChanges, // Default LWC scorer
  createLwcMcpToolScorer, // For custom LWC scoring criteria
  createMcpToolScorer, // For non-LWC domains
  McpToolRunner,
} from '@sfdc-internal/adk-eval';
// Import the schema that the Client output should adhere to
// For LWC components: LwcCodeSchema, LwcCodeType, sharedProtoForAllLwcCodeArtifact
// For Jest tests: JestTestsConfig, JestTestsType
// For custom schemas: Extend base schema with z.extend() if needed
import { LwcCodeSchema, LwcCodeType, sharedProtoForAllLwcCodeArtifact } from '@sfdc-internal/adk-core';
import { guide_lwc_my_tool } from '../tools/guide_lwc_my_tool.js';
import GuideLwcMyToolDataset from './dataset/guideLwcMyToolDataset.js';

// Path to the test dataset containing components with issues
const datasetPath = path.resolve(import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url)), 'dataset/');

// Extract relative path from project root
const relativePath = path.relative(process.cwd(), datasetPath);

// Preprocess the dataset and get the MCP guidance
const guideLwcMyToolDataset = new GuideLwcMyToolDataset();
const mcpGuidance = await guide_lwc_my_tool.fn();
const DATASET = await computeLwcMcpToolEvalDataset(guideLwcMyToolDataset.data, datasetPath);

// This evaluation tests MCP client's ability to use guide_lwc_my_tool to identify and fix issues in Lightning Web Components
describe(
  'Guide LWC My Tool MCP Tool Evaluation',
  () => {
    test.each(DATASET)(
      'evaluates my tool domain corrections',
      async ({ inputs }) => {
        try {
          console.log('Starting evaluation for', inputs.name);

          // Prompt that instructs the MCP client to run the tool and generate fixed code
          // Use the dynamic tool name instead of hardcoding
          const prompt = `Use the ${guide_lwc_my_tool.name} tool on @${relativePath}/bad/modules/${inputs.name}. Return the updated LWC component named ${inputs.name} that incorporates the recommended changes.`;

          // Execute the MCP tool and generate the component
          // Configure McpToolRunner with the schema that matches what the client should output
          const lwcMcpToolRunner = new McpToolRunner<typeof LwcCodeSchema, LwcCodeType>({
            schema: LwcCodeSchema,
            augmentMissingAttrs: sharedProtoForAllLwcCodeArtifact, // Required for LWC components
            targetTools: [guide_lwc_my_tool.name], // Can include multiple tools for orchestration workflows
          });
          const mcpToolResult = await trace(inputs.name, async () => lwcMcpToolRunner.runAndTrace(prompt))();
          const refactorResult = mcpToolResult.result;

          // Log outputs to Langsmith for debugging
          console.log('Logging outputs to Langsmith...');
          logOutputs({
            reference: inputs.reference,
            generatedFiles: refactorResult,
          });

          // Evaluate code similarity between expected and generated code
          console.log('Starting code similarity evaluation...');
          const wrappedScoreFn = wrapEvaluator(scoreLwcMcpToolChanges);
          await wrappedScoreFn({
            reference: inputs.reference,
            modified: refactorResult,
            mcpGuidance: (mcpGuidance.content[0] as { text: string }).text,
            mcpToolResult,
          });

          console.log('Code similarity evaluation completed');
          console.log('Evaluation finished for', inputs.name, '\n');
        } catch (error) {
          console.error('Error during evaluation for', inputs.name, ':', error);
          throw error;
        }
      },
      5 * 60 * 1000, // 5 minute timeout, MCP flows can take a while
    );
  },
  getCurrentTestConfig(),
);
```

**Customization Points**:

1. **Import the appropriate schema** (based on what client should return):

   - For LWC components: `LwcCodeSchema`, `LwcCodeType`, `sharedProtoForAllLwcCodeArtifact`
   - For Jest tests: `JestTestsConfig`, `JestTestsType`
   - For custom schemas: Extend base schema with `z.extend()` if needed

   ```typescript
   import { LwcCodeSchema, LwcCodeType, sharedProtoForAllLwcCodeArtifact } from '@sfdc-internal/adk-core';
   ```

2. **Import your guide tool**:

   ```typescript
   import { guide_lwc_my_tool } from '../tools/guide_lwc_my_tool.js';
   ```

3. **Import your dataset**:

   ```typescript
   import GuideLwcMyToolDataset from './dataset/guideLwcMyToolDataset.js';
   ```

4. **Update the describe block** (match the tool's full name):

   ```typescript
   describe('Guide LWC My Tool MCP Tool Evaluation', () => {
     test.each(DATASET)('evaluates my tool domain corrections', ...)
   ```

5. **Configure McpToolRunner** with the correct schema:

   - Include multiple tools in `targetTools` array for orchestration workflows

   ```tyescript
   const lwcMcpToolRunner = new McpToolRunner<typeof LwcCodeSchema, LwcCodeType>({
     schema: LwcCodeSchema,
     augmentMissingAttrs: sharedProtoForAllLwcCodeArtifact,
     targetTools: [guide_lwc_my_tool.name],
   });
   ```

6. **Use dynamic tool name in prompt** (DO NOT hardcode):

   ```typescript
   const prompt = `Use the ${guide_lwc_my_tool.name} tool on @${relativePath}/bad/modules/${inputs.name}. Return the updated LWC component named ${inputs.name} that incorporates the recommended changes.`;
   ```

7. **Customize scoring criteria** (optional):

   By default, `scoreLwcMcpToolChanges` applies standard LWC quality criteria. For domain-specific evaluations, create custom scorers:

   **For LWC domains** (accessibility, RTL, etc.):

   ```typescript
   const rtlScorer = createLwcMcpToolScorer({
     artifactLabel: 'RTL-Internationalized Lightning Web Component',
     domainSpecificQualityCriteria: [
       'CSS logical properties replace physical properties',
       'Text alignment uses logical values (start/end)',
       'No hardcoded left/right positioning',
     ],
     customScoringGuidelines: `...`, // Optional custom scoring definition for Excellent, Good, Satisfactory etc.
   });

   const wrappedScoreFn = wrapEvaluator(rtlScorer);
   ```

   **For non-LWC domains** (Jest tests, etc.):

   ```typescript
   const scorer = createMcpToolScorer<JestTestsType, JestTestEvaluationTemplate>(
     {
       artifactLabel: 'Jest Test Suite',
       domainSpecificQualityCriteria: ['Comprehensive test coverage', 'Proper mocking of dependencies'],
     },
     (modified, reference, mcpGuidance, mcpToolResult) =>
       createJestTestEvaluationTemplate(modified, reference, mcpGuidance, mcpToolResult, componentCode),
   );
   ```

   | Scorer                   | Use Case                                                        |
   | ------------------------ | --------------------------------------------------------------- |
   | `scoreLwcMcpToolChanges` | Standard LWC evaluations (default)                              |
   | `createLwcMcpToolScorer` | LWC with domain-specific criteria and custom scoring guidelines |
   | `createMcpToolScorer`    | Non-LWC artifacts or custom logic                               |

**Key Points**:

- **Naming Convention**: File name must be camelCase version of MCP tool name (e.g., `guide_lwc_my_tool` → `guideLwcMyTool.eval.ts`)
- **Schema Selection**: Choose the schema that matches the Client's expected output type
- **Dynamic Tool Name**: Always use `${guide_lwc_my_tool.name}` instead of hardcoding the tool name string
- **Class Names**: Use PascalCase (e.g., `GuideLwcMyToolDataset`)
- **Variable Names**: Use camelCase (e.g., `guideLwcMyToolDataset`)
- **McpToolRunner**: Must be configured with the correct schema, type parameters, and `targetTools` array specifying which MCP tools should be triggered (used for assertion during evaluation)
- **Custom Scoring**: For domain-specific evaluations, use `createLwcMcpToolScorer` or `createMcpToolScorer` instead of the default `scoreLwcMcpToolChanges` (see item 7 above)
- The prompt should be clear and specific
- Timeout is 5 minutes (300,000ms) for complex evaluations

---

## Running Your MCP Evaluation Test

### Basic Command

```bash
# For Claude Code (using guideLwcMyTool as example)
CLIENT=CLAUDE_CODE TEST_MODEL=claude-4-sonnet op run --env-file='.env' -- npm run test -- guideLwcMyTool

# For Cursor with Claude
CLIENT=CURSOR TEST_MODEL=claude-4-sonnet op run --env-file='.env' -- npm run test -- guideLwcMyTool

# For Cursor with GPT-5 (exclusively available in CURSOR)
CLIENT=CURSOR TEST_MODEL=gpt-5 op run --env-file='.env' -- npm run test -- guideLwcMyTool

# For Cline with claude-3-7-sonnet (exclusively available in CLINE)
CLIENT=CLINE TEST_MODEL=claude-3-7-sonnet op run --env-file='.env' -- npm run test -- guideLwcMyTool
```

**Note**: Use the camelCase version of your tool name (without `.eval.ts` extension) as the test name.

### Command Breakdown

- `CLIENT`: Client to use (`CLAUDE_CODE`, `CURSOR` or `CLINE`)
- `TEST_MODEL`: Model to use for evaluation (`claude-4-sonnet`, `gpt-5` or `claude-3-7-sonnet`)
  - `gpt-5` is exclusively available with CURSOR
  - `claude-3-7-sonnet` is exclusively available with CLINE
- `npm run test -- <testName>`: Run specific test (without `.eval.ts` extension)

---

## File Structure Summary

Your complete MCP evaluation structure should look like this:

```
src/mcp/
├── __tests__/
│   ├── dataset/
│   │   ├── bad/modules/c/         # Shared across all MCP evaluations
│   │   │   ├── component1/
│   │   │   │   ├── component1.js
│   │   │   │   ├── component1.html
│   │   │   │   └── component1.css
│   │   │   └── component2/
│   │   │       └── ...
│   │   ├── good/modules/c/        # Shared across all MCP evaluations
│   │   │   ├── component1/
│   │   │   │   ├── component1.js
│   │   │   │   ├── component1.html
│   │   │   │   └── component1.css
│   │   │   └── component2/
│   │   │       └── ...
│   │   └── {mcpToolName}Dataset.ts          # camelCase + Dataset.ts
│   └── {mcpToolName}.eval.ts                 # camelCase + .eval.ts
└── tools/                              # MCP tools directory
    └── {action}_lwc_{domain}.ts        # The MCP guide tool being tested
```

**Generic Example**: For `guide_lwc_my_tool` tool:

- Dataset: `guideLwcMyToolDataset.ts`
- Eval: `guideLwcMyTool.eval.ts`
- Tool: `guide_lwc_my_tool.ts`

---

## Reference Implementation

For a complete working example of a tool that fixes issues in a single LWC component, see the RTL (Right-to-Left) MCP evaluation test. This is the canonical reference implementation:

- **Guide tool**: `src/mcp/tools/guide_lwc_rtl.ts` (named `guide_lwc_rtl_support`)
- **Dataset**: `src/mcp/__tests__/dataset/guideLwcRtlSupportDataset.ts`
- **Eval test**: `src/mcp/__tests__/guideLwcRtlSupport.eval.ts`
- **Bad components**: `src/mcp/__tests__/dataset/bad/modules/c/` (shared folder)
- **Good components**: `src/mcp/__tests__/dataset/good/modules/c/` (shared folder)

**Why RTL is the Reference**:

- Follows camelCase naming convention: `guide_lwc_rtl_support` → `guideLwcRtlSupport`
- Uses dynamic tool name reference: `${guide_lwc_rtl_support.name}`
- Proper PascalCase class names: `GuideLwcRtlSupportDataset`
- Clear describe block naming: `'Guide LWC RTL Support MCP Tool Evaluation'`
- Complete dataset with diverse component examples
- Well-structured test prompts and evaluation logic

This is the **canonical reference** for MCP evaluation structure and should be followed exactly when creating new MCP evaluation tests.

---

## Best Practices

### Component Selection

- **Choose diverse scenarios**: Cover various edge cases and patterns that your MCP tool should handle
- **Include simple and complex examples**: Mix minimal (1-2 files) and multi-file components
- **Be realistic**: Use patterns that developers actually write
- **Avoid revealing clues**: Don't hint at issues in variable names, function names, or comments

### Bad Components

- **Make issues clear**: Each component should have identifiable problems your MCP tool should catch
- **Focus on one domain**: All components should align with what your guide tool addresses
- **Use realistic code**: Mimic actual developer scenarios

### Good Components

- **Represent ideal fixes**: Show the best way to address the issue according to your guide tool
- **Match file structure exactly**: Keep 1:1 correspondence with bad components
- **Be consistent**: Apply fixes uniformly across all examples

### MCP Evaluation Testing

- **Start small**: Test with 2-3 components first to validate your setup
- **Check LangSmith traces**: Review what the MCP client received and generated
- **Iterate on prompts**: Refine the evaluation prompt if similarity scores are low
- **Verify tool execution**: Ensure your guide tool returns expected guidance

---

## Troubleshooting

### Common Issues

#### 1. Test Fails with "Component not found"

**Problem**: Component path mismatch between dataset and actual files

**Solution**: Verify component names in dataset match folder names exactly:

```typescript
{
  input: {
    name: 'c/component1';
  }
} // Matches folder: bad/modules/c/component1/
```

#### 2. Evaluation Returns Empty Results

**Problem**: Prompt not clear enough or MCP tool not executing

**Solution**:

- Check prompt specificity
- Verify MCP tool is properly exported
- Review LangSmith traces to see what the client received

#### 3. Poor Similarity Scores

**Problem**: Generated code doesn't match expected good code

**Solution**:

- Review prompt clarity
- Check MCP guidance content
- Examine LangSmith traces for insights
- Consider adjusting expected good examples

#### 4. Timeout Errors

**Problem**: Test takes longer than 5 minutes

**Solution**:

- Simplify components for faster processing
- Increase timeout value (though this may indicate other issues)
- Check for infinite loops in MCP client

### MCP-Specific Debugging

1. **Check LangSmith traces**: See what the MCP client received and what code it generated
2. **Verify MCP client**: Ensure your `.mcp.json` and client configuration are correct
3. **Test components individually**: Run evaluation on one component to isolate issues
4. **Inspect tool output**: Verify your guide tool returns complete guidance text
5. **Check prompt**: Ensure the evaluation prompt is clear and specific
6. **Validate tool execution**: Confirm the MCP client successfully called your guide tool

---

## Getting Help

If you encounter issues:

1. Check the RTL MCP evaluation implementation for reference
2. Review LangSmith traces to debug evaluation failures
3. Verify your MCP client configuration (.mcp.json file)
