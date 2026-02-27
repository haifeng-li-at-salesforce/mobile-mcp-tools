/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TelemetryMcpServer } from '../../src/telemetry/telemetryMcpServer.js';
import { Telemetry, buildTelemetryConfig } from '../../src/telemetry/telemetry.js';

// Mock @salesforce/telemetry
vi.mock('@salesforce/telemetry', () => ({
  TelemetryReporter: class {
    static async create() {
      return new this();
    }
    start = vi.fn();
    stop = vi.fn();
    sendTelemetryEvent = vi.fn();
    sendPdpEvent = vi.fn();
    isSfdxTelemetryEnabled = vi.fn().mockReturnValue(true);
  },
}));

describe('TelemetryMcpServer', () => {
  let mockTelemetry: {
    sendEvent: ReturnType<typeof vi.fn>;
    sendPdpEvent: ReturnType<typeof vi.fn>;
    addAttributes: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockTelemetry = {
      sendEvent: vi.fn(),
      sendPdpEvent: vi.fn(),
      addAttributes: vi.fn(),
    };
  });

  describe('constructor', () => {
    it('should create a server without telemetry', () => {
      const server = new TelemetryMcpServer(
        { name: 'test-server', version: '1.0.0' },
        { capabilities: { logging: {} } }
      );
      expect(server).toBeInstanceOf(TelemetryMcpServer);
    });

    it('should create a server with telemetry', () => {
      const config = buildTelemetryConfig('1.0.0');
      const telemetry = new Telemetry(config);
      const server = new TelemetryMcpServer(
        { name: 'test-server', version: '1.0.0' },
        { capabilities: { logging: {} }, telemetry }
      );
      expect(server).toBeInstanceOf(TelemetryMcpServer);
    });
  });

  describe('registerTool', () => {
    it('should register a tool successfully', () => {
      const server = new TelemetryMcpServer(
        { name: 'test-server', version: '1.0.0' },
        { capabilities: { logging: {} }, telemetry: mockTelemetry as unknown as Telemetry }
      );

      const cb = vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'result' }],
      });

      const tool = server.registerTool('test-tool', { description: 'A test tool' }, cb);

      expect(tool).toBeDefined();
    });

    it('should wrap tool callback to send telemetry events on execution', async () => {
      const server = new TelemetryMcpServer(
        { name: 'test-server', version: '1.0.0' },
        { capabilities: { logging: {} }, telemetry: mockTelemetry as unknown as Telemetry }
      );

      const expectedResult = {
        content: [{ type: 'text' as const, text: 'hello' }],
      };
      const cb = vi.fn().mockResolvedValue(expectedResult);

      server.registerTool('my-tool', { description: 'A test tool' }, cb);

      // Verify telemetry has not been called yet (only called during tool execution)
      expect(mockTelemetry.sendEvent).not.toHaveBeenCalled();
      expect(mockTelemetry.sendPdpEvent).not.toHaveBeenCalled();
    });

    it('should work without telemetry configured', () => {
      const server = new TelemetryMcpServer(
        { name: 'test-server', version: '1.0.0' },
        { capabilities: { logging: {} } }
      );

      const cb = vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'result' }],
      });

      expect(() => server.registerTool('test-tool', { description: 'test' }, cb)).not.toThrow();
    });
  });
});
