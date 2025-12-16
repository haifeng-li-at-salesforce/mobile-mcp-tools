/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { describe, it, expect } from 'vitest';
import { MarkdownParser, parseMarkdownContent } from '../../src/parsing/markdownParser.js';

describe('MarkdownParser', () => {
  describe('parseContent', () => {
    it('should parse a simple document with one section', () => {
      const content = `# Title

This is content.`;
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.doc).toBe('test.md');
      expect(result.path).toBe('/docs');
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Title');
      expect(result.sections[0].level).toBe(1);
      expect(result.sections[0].content).toBe('This is content.');
    });

    it('should parse multiple sections', () => {
      const content = `# Section 1

Content 1.

## Section 2

Content 2.

### Section 3

Content 3.`;
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.sections).toHaveLength(3);
      expect(result.sections[0].title).toBe('Section 1');
      expect(result.sections[0].level).toBe(1);
      expect(result.sections[1].title).toBe('Section 2');
      expect(result.sections[1].level).toBe(2);
      expect(result.sections[2].title).toBe('Section 3');
      expect(result.sections[2].level).toBe(3);
    });

    it('should handle preamble content before first header', () => {
      const content = `This is preamble content.

# First Section

Section content.`;
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.sections).toHaveLength(2);
      expect(result.sections[0].title).toBe('_preamble');
      expect(result.sections[0].level).toBe(0);
      expect(result.sections[0].content).toBe('This is preamble content.');
      expect(result.sections[1].title).toBe('First Section');
    });

    it('should handle document with no headers', () => {
      const content = `Just some plain text.

With multiple paragraphs.`;
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('_document');
      expect(result.sections[0].level).toBe(0);
    });

    it('should compute content hash', () => {
      const content = '# Test\n\nContent';
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.contentHash).toBeDefined();
      expect(result.contentHash.length).toBe(32); // MD5 hex length

      // Same content should produce same hash
      const result2 = parser.parseContent(content, 'test.md', '/docs');
      expect(result.contentHash).toBe(result2.contentHash);

      // Different content should produce different hash
      const result3 = parser.parseContent('# Different\n\nContent', 'test.md', '/docs');
      expect(result.contentHash).not.toBe(result3.contentHash);
    });

    it('should handle empty content', () => {
      const content = '';
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.sections).toHaveLength(0);
    });

    it('should preserve raw content', () => {
      const content = '# Title\n\nContent here.';
      const parser = new MarkdownParser();
      const result = parser.parseContent(content, 'test.md', '/docs');

      expect(result.rawContent).toBe(content);
    });
  });

  describe('parseMarkdownContent helper', () => {
    it('should work as a convenience function', () => {
      const result = parseMarkdownContent('# Test\n\nContent', 'test.md', '/docs');
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Test');
    });
  });
});
