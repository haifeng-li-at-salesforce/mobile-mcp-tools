/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { execSync } from 'child_process';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { State } from '../metadata.js';
import { BaseNode } from './abstractBaseNode.js';
import { createComponentLogger, Logger } from '../../logging/logger.js';

const RequirementResultSchema = z.object({
  title: z.string().describe('The title of the requirement check'),
  hasPassed: z.boolean().describe('Whether the individual requirement check passed'),
  duration: z.string().optional().describe('The duration of the requirement check in seconds'),
  message: z.string().describe('The detailed message of the check result'),
});

const EnvironmentCheckOutputSchema = z.object({
  hasMetAllRequirements: z.boolean().describe('Whether all requirements have been met'),
  totalDuration: z
    .string()
    .optional()
    .describe('The total duration of the requirement checks in seconds'),
  tests: z.array(RequirementResultSchema).describe('Array of individual requirement check results'),
});

export type EnvironmentCheckOutput = z.infer<typeof EnvironmentCheckOutputSchema>;

export const EnvironmentCheckReportSchema = z.object({
  environmentCheckSchema: z.string().describe('The schema of the environment check output'),
  environmentCheckOutput: EnvironmentCheckOutputSchema,
});

export type EnvironmentCheckReport = z.infer<typeof EnvironmentCheckReportSchema>;

const PLATFORM_API_LEVELS = {
  iOS: '17.0',
  Android: '35',
};

export class EnvironmentValidationNode extends BaseNode {
  protected readonly logger: Logger;
  private readonly environmentCheckSchema: string;
  constructor(logger?: Logger) {
    super('validateEnvironment');
    this.logger = logger ?? createComponentLogger('EnvironmentValidationNode');
    this.environmentCheckSchema = JSON.stringify(zodToJsonSchema(EnvironmentCheckOutputSchema));
  }

  execute = (state: State): Partial<State> => {
    const platform = state.platform ?? 'iOS';
    const apiLevel = PLATFORM_API_LEVELS[platform];
    if (!apiLevel) {
      return this.createFlatformNotSupportedState(platform);
    }

    // Execute the sf force lightning local setup command
    const command = `sf force lightning local setup -p ${platform.toLowerCase()} -l ${apiLevel} --json`;

    let environmentCheckOutput: EnvironmentCheckOutput = {
      hasMetAllRequirements: false,
      totalDuration: undefined,
      tests: [],
    };
    try {
      this.logger.debug(`Executing command (pre-execution)`, { command });
      const output = execSync(command, { encoding: 'utf-8', timeout: 20000 });

      environmentCheckOutput = this.parseEnvironmentCheckOutput(output);

      this.logger.debug(`Executing command (post-execution)`, { environmentCheckOutput });
    } catch (error) {
      return this.createValidationFailedState(error, command);
    }

    return {
      environmentValidated: environmentCheckOutput.hasMetAllRequirements,
      environmentCheckReport: {
        environmentCheckSchema: this.environmentCheckSchema,
        environmentCheckOutput,
      },
    };
  };

  // Parse and validate the JSON output
  private parseEnvironmentCheckOutput(output: string): EnvironmentCheckOutput {
    try {
      const environmentCheckReport = JSON.parse(output);
      return EnvironmentCheckOutputSchema.parse(environmentCheckReport.outputContent);
    } catch (error) {
      const parsingError = new Error(
        `Invalid command output format: ${error instanceof Error ? error.message : String(error)}`
      );
      this.logger.error('Failed to parse command output', parsingError);
      throw parsingError;
    }
  }

  private createFlatformNotSupportedState(platform: string): Partial<State> {
    this.logger.error('Invalid platform', new Error(`Invalid platform: ${platform}`));
    return {
      environmentValidated: false,
      environmentCheckReport: {
        environmentCheckSchema: this.environmentCheckSchema,
        environmentCheckOutput: {
          hasMetAllRequirements: false,
          tests: [
            {
              title: 'Platform not supported',
              hasPassed: false,
              message: `Platform ${platform} is not supported`,
            },
          ],
        },
      },
    };
  }

  private createValidationFailedState(error: unknown, command: string): Partial<State> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = {
      message: errorMessage,
      command,
      stderr:
        error && typeof error === 'object' && 'stderr' in error && error.stderr
          ? String((error as { stderr?: unknown }).stderr)
          : undefined,
      stdout:
        error && typeof error === 'object' && 'stdout' in error && error.stdout
          ? String((error as { stdout?: unknown }).stdout)
          : undefined,
    };
    this.logger.debug('Error executing environment validation command', errorDetails);
    return {
      environmentValidated: false,
      environmentCheckReport: {
        environmentCheckSchema: this.environmentCheckSchema,
        environmentCheckOutput: {
          hasMetAllRequirements: false,
          tests: [
            {
              title: 'Error executing environment validation command',
              hasPassed: false,
              message: errorMessage,
            },
          ],
        },
      },
    };
  }
}
