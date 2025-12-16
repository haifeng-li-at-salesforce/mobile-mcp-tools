/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { createHash } from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { ParsedDocument, ParsedSection } from '../types.js';

/**
 * Regex pattern to match Markdown headers (# through ######).
 */
const HEADER_REGEX = /^(#{1,6})\s+(.+)$/;

/**
 * Parse a Markdown document into sections.
 * Sections are defined by headers at any level (#, ##, ###, etc.).
 */
export class MarkdownParser {
  /**
   * Parse a Markdown file from disk.
   * @param filePath - Absolute or relative path to the Markdown file
   * @returns Parsed document with sections
   */
  async parseFile(filePath: string): Promise<ParsedDocument> {
    const absolutePath = path.resolve(filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    const doc = path.basename(filePath);
    const dirPath = path.dirname(absolutePath);

    return this.parseContent(content, doc, dirPath);
  }

  /**
   * Parse Markdown content string.
   * @param content - Raw Markdown content
   * @param doc - Document filename
   * @param docPath - Directory path to the document
   * @returns Parsed document with sections
   */
  parseContent(content: string, doc: string, docPath: string): ParsedDocument {
    const lines = content.split('\n');
    const sections: ParsedSection[] = [];

    let currentSection: ParsedSection | null = null;
    let contentLines: string[] = [];
    const preambleLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headerMatch = line.match(HEADER_REGEX);

      if (headerMatch) {
        // Save the previous section
        if (currentSection) {
          currentSection.content = contentLines.join('\n').trim();
          currentSection.endLine = i - 1;
          if (currentSection.content || currentSection.title) {
            sections.push(currentSection);
          }
        } else if (preambleLines.length > 0) {
          // Create a section for content before the first header
          const preambleContent = preambleLines.join('\n').trim();
          if (preambleContent) {
            sections.push({
              title: '_preamble',
              level: 0,
              content: preambleContent,
              startLine: 0,
              endLine: i - 1,
            });
          }
        }

        // Start a new section
        const level = headerMatch[1].length;
        const title = headerMatch[2].trim();

        currentSection = {
          title,
          level,
          content: '',
          startLine: i,
          endLine: i, // Will be updated
        };
        contentLines = [];
      } else {
        // Add line to current section or preamble
        if (currentSection) {
          contentLines.push(line);
        } else {
          preambleLines.push(line);
        }
      }
    }

    // Save the last section
    if (currentSection) {
      currentSection.content = contentLines.join('\n').trim();
      currentSection.endLine = lines.length - 1;
      if (currentSection.content || currentSection.title) {
        sections.push(currentSection);
      }
    } else if (preambleLines.length > 0) {
      // Handle files with no headers
      const preambleContent = preambleLines.join('\n').trim();
      if (preambleContent) {
        sections.push({
          title: '_document',
          level: 0,
          content: preambleContent,
          startLine: 0,
          endLine: lines.length - 1,
        });
      }
    }

    // Compute content hash for change detection
    const contentHash = createHash('md5').update(content).digest('hex');

    return {
      doc,
      path: docPath,
      rawContent: content,
      sections,
      contentHash,
    };
  }

  /**
   * Parse all Markdown files in a directory.
   * @param dirPath - Path to the directory
   * @param recursive - Whether to search recursively (default: true)
   * @returns Array of parsed documents
   */
  async parseDirectory(dirPath: string, recursive: boolean = true): Promise<ParsedDocument[]> {
    const absolutePath = path.resolve(dirPath);
    const documents: ParsedDocument[] = [];

    await this.walkDirectory(absolutePath, absolutePath, documents, recursive);

    return documents;
  }

  private async walkDirectory(
    currentPath: string,
    basePath: string,
    documents: ParsedDocument[],
    recursive: boolean
  ): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory() && recursive) {
        await this.walkDirectory(entryPath, basePath, documents, recursive);
      } else if (entry.isFile() && this.isMarkdownFile(entry.name)) {
        const doc = await this.parseFile(entryPath);
        // Adjust path to be relative to base
        doc.path = path.relative(basePath, path.dirname(entryPath)) || '.';
        documents.push(doc);
      }
    }
  }

  /**
   * Check if a filename has a Markdown extension.
   */
  private isMarkdownFile(filename: string): boolean {
    const ext = path.extname(filename).toLowerCase();
    return ext === '.md' || ext === '.markdown';
  }
}

/**
 * Convenience function to parse a Markdown file.
 * @param filePath - Path to the Markdown file
 * @returns Parsed document with sections
 */
export async function parseMarkdownFile(filePath: string): Promise<ParsedDocument> {
  const parser = new MarkdownParser();
  return parser.parseFile(filePath);
}

/**
 * Convenience function to parse Markdown content.
 * @param content - Raw Markdown content
 * @param doc - Document filename
 * @param docPath - Directory path to the document
 * @returns Parsed document with sections
 */
export function parseMarkdownContent(
  content: string,
  doc: string,
  docPath: string
): ParsedDocument {
  const parser = new MarkdownParser();
  return parser.parseContent(content, doc, docPath);
}

/**
 * Convenience function to parse all Markdown files in a directory.
 * @param dirPath - Path to the directory
 * @param recursive - Whether to search recursively (default: true)
 * @returns Array of parsed documents
 */
export async function parseMarkdownDirectory(
  dirPath: string,
  recursive: boolean = true
): Promise<ParsedDocument[]> {
  const parser = new MarkdownParser();
  return parser.parseDirectory(dirPath, recursive);
}
