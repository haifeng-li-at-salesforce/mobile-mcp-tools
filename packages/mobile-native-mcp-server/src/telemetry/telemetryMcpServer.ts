/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { McpServer, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  CallToolResult,
  Implementation,
  ServerNotification,
  ServerRequest,
} from '@modelcontextprotocol/sdk/types.js';
import { ServerOptions } from '@modelcontextprotocol/sdk/server/index.js';
import { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { Telemetry } from './telemetry.js';

const PRODUCT_FEATURE_ID = 'aJCEE0000000mGf4AI';

/**
 * Extended server options that include telemetry support.
 */
export type TelemetryMcpServerOptions = ServerOptions & {
  /** Optional telemetry instance for tracking server events */
  telemetry?: Telemetry;
};

/**
 * An MCP server implementation that extends the base McpServer with telemetry capabilities.
 *
 * Wraps `registerTool()` to automatically track:
 * - Tool execution timing and success/error status
 * - PDP (Product Data Platform) events for product feature tracking
 * - Server lifecycle events (start, stop)
 */
export class TelemetryMcpServer extends McpServer {
  private telemetry?: Telemetry;

  public constructor(serverInfo: Implementation, options?: TelemetryMcpServerOptions) {
    super(serverInfo, options);
    this.telemetry = options?.telemetry;

    // Patch registerTool to wrap callbacks with telemetry
    const originalRegisterTool = this.registerTool.bind(this);
    this.registerTool = ((name: string, config: Record<string, unknown>, cb: ToolCallback) => {
      const wrappedCb = async (
        args: unknown,
        extra: RequestHandlerExtra<ServerRequest, ServerNotification>
      ): Promise<CallToolResult> => {
        const startTime = Date.now();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const result = await (cb as Function)(args, extra);
        //const runtimeMs = Date.now() - startTime;

        // this.telemetry?.sendEvent('TOOL_CALLED', {
        //   name,
        //   runtimeMs,
        //   isError: result.isError ?? false,
        // });

        this.telemetry?.sendPdpEvent({
          eventName: 'salesforceMcp.executed',
          productFeatureId: PRODUCT_FEATURE_ID,
          componentId: name,
        });

        return result;
      };

      return originalRegisterTool(
        name,
        config as Parameters<typeof originalRegisterTool>[1],
        wrappedCb as ToolCallback
      );
    }) as typeof this.registerTool;

    this.server.oninitialized = (): void => {
      const clientInfo = this.server.getClientVersion();
      if (clientInfo) {
        this.telemetry?.addAttributes({
          clientName: clientInfo.name,
          clientVersion: clientInfo.version,
        });
      }
      this.telemetry?.sendEvent('SERVER_START_SUCCESS');
    };
  }
}
