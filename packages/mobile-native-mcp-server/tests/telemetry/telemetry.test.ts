/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Telemetry, buildTelemetryConfig, TelemetryConfig } from '../../src/telemetry/telemetry.js';

// Mock @salesforce/telemetry to avoid actual network calls
vi.mock('@salesforce/telemetry', () => {
  const mockReporter = {
    start: vi.fn(),
    stop: vi.fn(),
    sendTelemetryEvent: vi.fn(),
    sendPdpEvent: vi.fn(),
    isSfdxTelemetryEnabled: vi.fn().mockReturnValue(true),
  };

  return {
    TelemetryReporter: class MockTelemetryReporter {
      static async create() {
        return mockReporter;
      }

      start = mockReporter.start;
      stop = mockReporter.stop;
      sendTelemetryEvent = mockReporter.sendTelemetryEvent;
      sendPdpEvent = mockReporter.sendPdpEvent;
      isSfdxTelemetryEnabled = mockReporter.isSfdxTelemetryEnabled;
    },
    __mockReporter: mockReporter,
  };
});

describe('buildTelemetryConfig', () => {
  it('should return a config with the provided version', () => {
    const config = buildTelemetryConfig('1.0.0');
    expect(config.version).toBe('1.0.0');
  });

  it('should include platform and arch from process', () => {
    const config = buildTelemetryConfig('1.0.0');
    expect(config.platform).toBe(process.platform);
    expect(config.arch).toBe(process.arch);
  });

  it('should include a userAgent string', () => {
    const config = buildTelemetryConfig('2.0.0');
    expect(config.userAgent).toContain('2.0.0');
    expect(config.userAgent).toContain('node/');
  });

  it('should include a cacheDir path', () => {
    const config = buildTelemetryConfig('1.0.0');
    expect(config.cacheDir).toBeDefined();
    expect(typeof config.cacheDir).toBe('string');
  });
});

describe('Telemetry', () => {
  let telemetry: Telemetry;
  let config: TelemetryConfig;

  beforeEach(() => {
    config = buildTelemetryConfig('0.0.4');
    telemetry = new Telemetry(config);
  });

  describe('constructor', () => {
    it('should create a Telemetry instance', () => {
      expect(telemetry).toBeInstanceOf(Telemetry);
    });
  });

  describe('sendEvent', () => {
    it('should not throw when reporter is not started', () => {
      expect(() => telemetry.sendEvent('TEST_EVENT')).not.toThrow();
    });

    it('should not throw with attributes', () => {
      expect(() => telemetry.sendEvent('TEST_EVENT', { key: 'value' })).not.toThrow();
    });
  });

  describe('sendPdpEvent', () => {
    it('should not throw when reporter is not started', () => {
      expect(() =>
        telemetry.sendPdpEvent({
          eventName: 'test.event',
          productFeatureId: 'testId',
          componentId: 'testComponent',
        })
      ).not.toThrow();
    });
  });

  describe('addAttributes', () => {
    it('should not throw', () => {
      expect(() => telemetry.addAttributes({ clientName: 'test-client' })).not.toThrow();
    });
  });

  describe('start', () => {
    it('should be idempotent (calling start multiple times is safe)', async () => {
      // APP_INSIGHTS_KEY is empty in dev, so start() will return early
      await telemetry.start();
      await telemetry.start();
      // No error means success
    });
  });

  describe('stop', () => {
    it('should be safe to call when not started', () => {
      expect(() => telemetry.stop()).not.toThrow();
    });

    it('should be safe to call multiple times', () => {
      expect(() => {
        telemetry.stop();
        telemetry.stop();
      }).not.toThrow();
    });
  });
});
