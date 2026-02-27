/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as os from 'node:os';
import { Attributes, TelemetryReporter, PdpEvent } from '@salesforce/telemetry';

const PROJECT = 'salesforce-mobile-native-mcp-server';

// WARN: This is intentionally empty! It's populated at the time of publish.
//       This is to prevent telemetry pollution from local clones and forks.
const APP_INSIGHTS_KEY = '';
const O11Y_UPLOAD_ENDPOINT = 'https://794testsite.my.site.com/byolwr/webruntime/log/metrics';

const generateRandomId = (): string => randomBytes(20).toString('hex');

/**
 * Lightweight config interface replacing oclif's Config.
 * Provides the same system information without the oclif dependency.
 */
export interface TelemetryConfig {
  version: string;
  platform: string;
  arch: string;
  userAgent: string;
  cacheDir: string;
}

/**
 * Build a TelemetryConfig from the current environment.
 */
export function buildTelemetryConfig(version: string): TelemetryConfig {
  return {
    version,
    platform: process.platform,
    arch: process.arch,
    userAgent: `${PROJECT}/${version} node/${process.version}`,
    cacheDir: join(os.homedir(), '.cache', PROJECT),
  };
}

/**
 * Check if the current host is an internal Salesforce environment
 */
function isInternalHost(): boolean {
  return os.hostname().endsWith('internal.salesforce.com');
}

/**
 * Get internal Salesforce environment properties
 */
function getInternalProperties(): {
  'sfInternal.hostname': string;
  'sfInternal.username': string;
} {
  return {
    'sfInternal.hostname': os.hostname(),
    'sfInternal.username': os.userInfo().username,
  };
}

const getCliId = (cacheDir: string): string => {
  // Try to read sf CLI's CLIID from its cache directory.
  // If it doesn't exist, generate a new one.
  const sfCacheDir = cacheDir.replace(PROJECT, 'sf');
  const cliIdPath = join(sfCacheDir, 'CLIID.txt');
  try {
    return readFileSync(cliIdPath, 'utf-8');
  } catch {
    return generateRandomId();
  }
};

class McpTelemetryReporter extends TelemetryReporter {
  /**
   * TelemetryReporter references sf's config to determine if telemetry is enabled.
   * We want to always send telemetry events, so we override the method to always return true.
   * This is okay to do since the Telemetry class won't be instantiated if telemetry is disabled.
   */
  public isSfdxTelemetryEnabled(): boolean {
    return true;
  }
}

export class Telemetry {
  private sessionId: string;
  private cliId: string;
  private started = false;
  private reporter?: McpTelemetryReporter;

  public constructor(
    private readonly config: TelemetryConfig,
    private attributes: Attributes = {}
  ) {
    this.sessionId = generateRandomId();
    this.cliId = getCliId(config.cacheDir);
  }

  public addAttributes(attributes: Attributes): void {
    this.attributes = { ...this.attributes, ...attributes };
  }

  public sendEvent(eventName: string, attributes?: Attributes): void {
    try {
      this.reporter?.sendTelemetryEvent(eventName, {
        ...this.attributes,
        ...attributes,
        // Identifiers
        sessionId: this.sessionId,
        cliId: this.cliId,
        // System information
        version: this.config.version,
        platform: this.config.platform,
        arch: this.config.arch,
        nodeVersion: process.version,
        nodeEnv: process.env.NODE_ENV,
        origin: this.config.userAgent,
        // Timestamps
        date: new Date().toUTCString(),
        timestamp: String(Date.now()),
        processUptime: process.uptime() * 1000,
        // Internal Properties (only in internal Salesforce environments)
        ...(isInternalHost() ? getInternalProperties() : {}),
      });
    } catch {
      /* intentionally empty */
    }
  }

  public sendPdpEvent(event: PdpEvent): void {
    try {
      this.reporter?.sendPdpEvent(event);
    } catch {
      /* intentionally empty */
    }
  }

  public async start(): Promise<void> {
    if (this.started) return;
    // TODO: re-enable before merging
    // if (!APP_INSIGHTS_KEY) return;
    this.started = true;

    try {
      this.reporter = await McpTelemetryReporter.create({
        project: PROJECT,
        key: APP_INSIGHTS_KEY,
        userId: this.cliId,
        waitForConnection: true,
        o11yUploadEndpoint: O11Y_UPLOAD_ENDPOINT,
        enableO11y: true,
      });

      this.reporter.start();
    } catch {
      // connection probably failed, but we can continue without telemetry
    }
  }

  public stop(): void {
    if (!this.started) return;
    this.started = false;
    this.reporter?.stop();
  }
}
