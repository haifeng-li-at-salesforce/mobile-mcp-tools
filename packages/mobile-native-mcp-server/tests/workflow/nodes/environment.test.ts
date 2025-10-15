/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { execSync } from 'child_process';
import { EnvironmentValidationNode } from '../../../src/workflow/nodes/environment.js';
import { MockLogger } from '../../utils/MockLogger.js';
import { createTestState } from '../../utils/stateBuilders.js';

// Mock child_process module
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}));

// Helper to create valid environment check command output
function createValidCommandOutput(
  hasMetAllRequirements: boolean = true,
  tests: Array<{
    title: string;
    hasPassed: boolean;
    duration?: string;
    message: string;
  }> = []
): string {
  const defaultTests =
    tests.length > 0
      ? tests
      : [
          {
            title: 'Xcode Installation',
            hasPassed: true,
            duration: '0.5',
            message: 'Xcode 15.0 is installed',
          },
          {
            title: 'iOS Simulator',
            hasPassed: true,
            duration: '0.3',
            message: 'iOS 17.0 simulator is available',
          },
        ];

  return JSON.stringify({
    outputContent: {
      hasMetAllRequirements,
      totalDuration: '1.2',
      tests: defaultTests,
    },
  });
}

describe('EnvironmentValidationNode', () => {
  let mockLogger: MockLogger;
  let node: EnvironmentValidationNode;
  let mockExecSync: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockLogger = new MockLogger();
    mockLogger.reset();
    node = new EnvironmentValidationNode(mockLogger);
    mockExecSync = vi.mocked(execSync);
    mockExecSync.mockReset();
  });

  describe('Node Properties', () => {
    it('should have correct node name', () => {
      expect(node.name).toBe('validateEnvironment');
    });

    it('should create default logger when none provided', () => {
      const nodeWithoutLogger = new EnvironmentValidationNode();
      expect(nodeWithoutLogger['logger']).toBeDefined();
    });

    it('should initialize environment check schema', () => {
      expect(node['environmentCheckSchema']).toBeDefined();
      expect(typeof node['environmentCheckSchema']).toBe('string');
      // Should be valid JSON
      expect(() => JSON.parse(node['environmentCheckSchema'])).not.toThrow();
    });
  });

  describe('execute() - Success Cases', () => {
    it('should successfully validate iOS environment when all requirements are met', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const validOutput = createValidCommandOutput(true);
      mockExecSync.mockReturnValue(validOutput);

      const result = node.execute(inputState);

      // Verify command was called correctly
      expect(mockExecSync).toHaveBeenCalledTimes(1);
      expect(mockExecSync).toHaveBeenCalledWith(
        'sf force lightning local setup -p iOS -l 17.0 --json',
        { encoding: 'utf-8', timeout: 20000 }
      );

      // Verify result state
      expect(result.environmentValidated).toBe(true);
      expect(result.environmentCheckReport).toBeDefined();
      expect(result.environmentCheckReport?.environmentCheckSchema).toBeDefined();
      expect(result.environmentCheckReport?.environmentCheckOutput).toBeDefined();
      expect(result.environmentCheckReport?.environmentCheckOutput.hasMetAllRequirements).toBe(
        true
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(2);
    });

    it('should successfully validate Android environment when all requirements are met', () => {
      const inputState = createTestState({
        platform: 'Android',
      });

      const validOutput = createValidCommandOutput(true, [
        {
          title: 'Android Studio',
          hasPassed: true,
          duration: '0.5',
          message: 'Android Studio is installed',
        },
        {
          title: 'Android SDK',
          hasPassed: true,
          duration: '0.3',
          message: 'Android SDK 35 is available',
        },
      ]);
      mockExecSync.mockReturnValue(validOutput);

      const result = node.execute(inputState);

      // Verify command was called with Android parameters
      expect(mockExecSync).toHaveBeenCalledWith(
        'sf force lightning local setup -p Android -l 35 --json',
        { encoding: 'utf-8', timeout: 20000 }
      );

      // Verify result state
      expect(result.environmentValidated).toBe(true);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(2);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].title).toBe(
        'Android Studio'
      );
    });

    it('should default to iOS when platform is undefined', () => {
      const inputState = createTestState({
        platform: undefined,
      });

      const validOutput = createValidCommandOutput(true);
      mockExecSync.mockReturnValue(validOutput);

      const result = node.execute(inputState);

      // Should use iOS as default
      expect(mockExecSync).toHaveBeenCalledWith(
        'sf force lightning local setup -p iOS -l 17.0 --json',
        { encoding: 'utf-8', timeout: 20000 }
      );

      expect(result.environmentValidated).toBe(true);
    });

    it('should log command execution (pre and post)', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const validOutput = createValidCommandOutput(true);
      mockExecSync.mockReturnValue(validOutput);

      node.execute(inputState);

      const debugLogs = mockLogger.getLogsByLevel('debug');
      expect(debugLogs.length).toBeGreaterThan(0);

      const preExecutionLog = debugLogs.find(log => log.message.includes('pre-execution'));
      const postExecutionLog = debugLogs.find(log => log.message.includes('post-execution'));

      expect(preExecutionLog).toBeDefined();
      expect(preExecutionLog?.data).toHaveProperty('command');
      expect(postExecutionLog).toBeDefined();
      expect(postExecutionLog?.data).toHaveProperty('environmentCheckOutput');
    });

    it('should parse environment check output with optional fields', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const outputWithOptionals = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: true,
          tests: [
            {
              title: 'Test Check',
              hasPassed: true,
              message: 'Test passed',
              // duration is optional
            },
          ],
          // totalDuration is optional
        },
      });

      mockExecSync.mockReturnValue(outputWithOptionals);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(true);
      expect(result.environmentCheckReport?.environmentCheckOutput.totalDuration).toBeUndefined();
      expect(
        result.environmentCheckReport?.environmentCheckOutput.tests[0].duration
      ).toBeUndefined();
    });
  });

  describe('execute() - Failed Requirements', () => {
    it('should handle failed environment validation gracefully', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const failedOutput = createValidCommandOutput(false, [
        {
          title: 'Xcode Installation',
          hasPassed: false,
          message: 'Xcode is not installed',
        },
      ]);
      mockExecSync.mockReturnValue(failedOutput);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.hasMetAllRequirements).toBe(
        false
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].hasPassed).toBe(false);
    });

    it('should handle partially failed requirements', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const partiallyFailedOutput = createValidCommandOutput(false, [
        {
          title: 'Xcode Installation',
          hasPassed: true,
          message: 'Xcode is installed',
        },
        {
          title: 'iOS Simulator',
          hasPassed: false,
          message: 'iOS 17.0 simulator is not available',
        },
        {
          title: 'Command Line Tools',
          hasPassed: true,
          message: 'Command line tools are installed',
        },
      ]);
      mockExecSync.mockReturnValue(partiallyFailedOutput);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(3);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].hasPassed).toBe(true);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[1].hasPassed).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[2].hasPassed).toBe(true);
    });
  });

  describe('execute() - Platform Validation', () => {
    it('should reject unsupported platform', () => {
      const inputState = createTestState({
        platform: 'Windows' as 'iOS', // Force invalid platform
      });

      const result = node.execute(inputState);

      // Should not call execSync
      expect(mockExecSync).not.toHaveBeenCalled();

      // Should return failed state
      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.hasMetAllRequirements).toBe(
        false
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(1);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].title).toBe(
        'Platform not supported'
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'Windows'
      );
    });

    it('should log error for unsupported platform', () => {
      const inputState = createTestState({
        platform: 'Linux' as 'iOS',
      });

      node.execute(inputState);

      const errorLogs = mockLogger.getLogsByLevel('error');
      expect(errorLogs.length).toBeGreaterThan(0);
      expect(errorLogs[0].message).toContain('Invalid platform');
    });
  });

  describe('execute() - Error Handling', () => {
    it('should handle command execution error with Error object', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const error = new Error('Command failed');
      mockExecSync.mockImplementation(() => {
        throw error;
      });

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.hasMetAllRequirements).toBe(
        false
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(1);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].title).toBe(
        'Error executing environment validation command'
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toBe(
        'Command failed'
      );
    });

    it('should handle command execution error with stderr and stdout', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const error = {
        message: 'Process exited with code 1',
        stderr: 'Error: command not found',
        stdout: 'Some output before error',
      };
      mockExecSync.mockImplementation(() => {
        throw error;
      });

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);

      // Verify debug logging includes stderr and stdout
      const debugLogs = mockLogger.getLogsByLevel('debug');
      const errorLog = debugLogs.find(log =>
        log.message.includes('Error executing environment validation command')
      );

      expect(errorLog).toBeDefined();
      expect(errorLog?.data).toHaveProperty('stderr', 'Error: command not found');
      expect(errorLog?.data).toHaveProperty('stdout', 'Some output before error');
      expect(errorLog?.data).toHaveProperty('command');
    });

    it('should handle non-Error thrown values', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      mockExecSync.mockImplementation(() => {
        throw 'String error message';
      });

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toBe(
        'String error message'
      );
    });

    it('should handle timeout errors', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const timeoutError = new Error('Command timed out after 20000ms');
      mockExecSync.mockImplementation(() => {
        throw timeoutError;
      });

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'timed out'
      );
    });

    it('should handle invalid JSON output', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      mockExecSync.mockReturnValue('This is not valid JSON');

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'Invalid command output format'
      );
    });

    it('should handle JSON with missing outputContent field', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const invalidStructure = JSON.stringify({
        someOtherField: 'value',
        // missing outputContent
      });

      mockExecSync.mockReturnValue(invalidStructure);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'Invalid command output format'
      );
    });

    it('should handle JSON with invalid outputContent schema', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const invalidSchema = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: 'not-a-boolean', // Should be boolean
          tests: [],
        },
      });

      mockExecSync.mockReturnValue(invalidSchema);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'Invalid command output format'
      );
    });

    it('should handle JSON with invalid test schema', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const invalidTestSchema = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: true,
          tests: [
            {
              title: 'Test',
              hasPassed: true,
              // missing required 'message' field
            },
          ],
        },
      });

      mockExecSync.mockReturnValue(invalidTestSchema);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'Invalid command output format'
      );
    });

    it('should log error when JSON parsing fails', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      mockExecSync.mockReturnValue('Invalid JSON');

      node.execute(inputState);

      const errorLogs = mockLogger.getLogsByLevel('error');
      expect(errorLogs.length).toBeGreaterThan(0);
      expect(errorLogs.some(log => log.message.includes('Failed to parse command output'))).toBe(
        true
      );
    });
  });

  describe('execute() - Integration Scenarios', () => {
    it('should handle empty tests array', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const outputWithEmptyTests = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: true,
          tests: [],
        },
      });

      mockExecSync.mockReturnValue(outputWithEmptyTests);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(true);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(0);
    });

    it('should handle large number of test results', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const manyTests = Array.from({ length: 50 }, (_, i) => ({
        title: `Test ${i + 1}`,
        hasPassed: i % 5 !== 0, // Every 5th test fails
        message: `Test ${i + 1} result`,
      }));

      const outputWithManyTests = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: false, // Some tests failed
          tests: manyTests,
        },
      });

      mockExecSync.mockReturnValue(outputWithManyTests);

      const result = node.execute(inputState);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(50);
    });

    it('should preserve all test result details including durations', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const detailedOutput = createValidCommandOutput(true, [
        {
          title: 'Quick Check',
          hasPassed: true,
          duration: '0.1',
          message: 'Fast check passed',
        },
        {
          title: 'Slow Check',
          hasPassed: true,
          duration: '5.8',
          message: 'Slow check passed',
        },
      ]);

      mockExecSync.mockReturnValue(detailedOutput);

      const result = node.execute(inputState);

      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].duration).toBe('0.1');
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[1].duration).toBe('5.8');
      expect(result.environmentCheckReport?.environmentCheckOutput.totalDuration).toBe('1.2');
    });

    it('should include environment check schema in report', () => {
      const inputState = createTestState({
        platform: 'iOS',
      });

      const validOutput = createValidCommandOutput(true);
      mockExecSync.mockReturnValue(validOutput);

      const result = node.execute(inputState);

      expect(result.environmentCheckReport?.environmentCheckSchema).toBeDefined();
      const schema = JSON.parse(result.environmentCheckReport!.environmentCheckSchema);

      // Verify schema structure
      expect(schema).toHaveProperty('type', 'object');
      expect(schema).toHaveProperty('properties');
      expect(schema.properties).toHaveProperty('hasMetAllRequirements');
      expect(schema.properties).toHaveProperty('tests');
    });
  });

  describe('parseEnvironmentCheckOutput()', () => {
    it('should successfully parse valid output', () => {
      const validOutput = createValidCommandOutput(true);
      const result = node['parseEnvironmentCheckOutput'](validOutput);

      expect(result.hasMetAllRequirements).toBe(true);
      expect(result.tests).toHaveLength(2);
    });

    it('should throw error for invalid JSON', () => {
      expect(() => {
        node['parseEnvironmentCheckOutput']('Not JSON');
      }).toThrow('Invalid command output format');
    });

    it('should throw error for missing outputContent', () => {
      const invalidOutput = JSON.stringify({ someOtherField: 'value' });

      expect(() => {
        node['parseEnvironmentCheckOutput'](invalidOutput);
      }).toThrow('Invalid command output format');
    });

    it('should throw error for invalid schema', () => {
      const invalidSchema = JSON.stringify({
        outputContent: {
          hasMetAllRequirements: 'not-boolean',
        },
      });

      expect(() => {
        node['parseEnvironmentCheckOutput'](invalidSchema);
      }).toThrow('Invalid command output format');
    });
  });

  describe('createFlatformNotSupportedState()', () => {
    it('should create proper error state for unsupported platform', () => {
      const result = node['createFlatformNotSupportedState']('WebOS');

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckSchema).toBeDefined();
      expect(result.environmentCheckReport?.environmentCheckOutput.hasMetAllRequirements).toBe(
        false
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(1);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].title).toBe(
        'Platform not supported'
      );
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].hasPassed).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'WebOS'
      );
    });
  });

  describe('createValidationFailedState()', () => {
    it('should create proper error state from Error object', () => {
      const error = new Error('Command failed');
      const command = 'test-command';

      const result = node['createValidationFailedState'](error, command);

      expect(result.environmentValidated).toBe(false);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests).toHaveLength(1);
      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toBe(
        'Command failed'
      );
    });

    it('should extract stderr and stdout from error object', () => {
      const error = {
        message: 'Failed',
        stderr: 'Error output',
        stdout: 'Normal output',
      };
      const command = 'test-command';

      node['createValidationFailedState'](error, command);

      const debugLogs = mockLogger.getLogsByLevel('debug');
      const errorLog = debugLogs.find(log =>
        log.message.includes('Error executing environment validation command')
      );

      // Error object is converted to string when it's not an Error instance
      expect(errorLog?.data).toMatchObject({
        message: '[object Object]', // Non-Error objects are converted to string
        command: 'test-command',
        stderr: 'Error output',
        stdout: 'Normal output',
      });
    });

    it('should handle error without stderr/stdout', () => {
      const error = new Error('Simple error');
      const command = 'test-command';

      node['createValidationFailedState'](error, command);

      const debugLogs = mockLogger.getLogsByLevel('debug');
      const errorLog = debugLogs.find(log =>
        log.message.includes('Error executing environment validation command')
      );

      // The implementation always includes stderr/stdout, but they'll be undefined
      expect(errorLog?.data).toMatchObject({
        message: 'Simple error',
        command: 'test-command',
        stderr: undefined,
        stdout: undefined,
      });
    });

    it('should convert non-Error values to string', () => {
      const error = { complex: 'object' };
      const command = 'test-command';

      const result = node['createValidationFailedState'](error, command);

      expect(result.environmentCheckReport?.environmentCheckOutput.tests[0].message).toContain(
        'object'
      );
    });
  });
});
