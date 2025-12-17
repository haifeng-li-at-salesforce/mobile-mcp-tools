/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Token IDs for special BERT tokens
 */
const SPECIAL_TOKENS = {
  CLS: 101,
  SEP: 102,
  PAD: 0,
  UNK: 100,
} as const;

/**
 * Result of tokenization with attention mask
 */
export interface TokenizationResult {
  /** Token IDs including [CLS] and [SEP] */
  inputIds: number[];
  /** Attention mask (1 for real tokens, 0 for padding) */
  attentionMask: number[];
  /** Token type IDs (all 0 for single sequence) */
  tokenTypeIds: number[];
}

/**
 * WordPiece tokenizer for BERT-based models.
 * Implements subword tokenization with a vocabulary file.
 */
export class WordPieceTokenizer {
  private vocab: Map<string, number>;
  private idsToTokens: Map<number, string>;
  private maxSequenceLength: number;

  /**
   * Create a WordPiece tokenizer.
   * @param vocabPath - Path to vocab.txt file
   * @param maxSequenceLength - Maximum sequence length (default: 512)
   */
  constructor(vocabPath: string, maxSequenceLength: number = 512) {
    this.vocab = new Map();
    this.idsToTokens = new Map();
    this.maxSequenceLength = maxSequenceLength;
    this.loadVocabulary(vocabPath);
  }

  /**
   * Load vocabulary from file.
   */
  private loadVocabulary(vocabPath: string): void {
    const vocabContent = fs.readFileSync(vocabPath, 'utf-8');
    const lines = vocabContent.split('\n');

    lines.forEach((token, index) => {
      if (token.trim()) {
        this.vocab.set(token.trim(), index);
        this.idsToTokens.set(index, token.trim());
      }
    });

    // Verify special tokens are present
    if (
      !this.vocab.has('[CLS]') ||
      !this.vocab.has('[SEP]') ||
      !this.vocab.has('[PAD]') ||
      !this.vocab.has('[UNK]')
    ) {
      throw new Error('Vocabulary file missing required special tokens');
    }
  }

  /**
   * Tokenize text into WordPiece tokens with special tokens and padding.
   * @param text - Input text to tokenize
   * @returns Tokenization result with input_ids, attention_mask, and token_type_ids
   */
  tokenize(text: string): TokenizationResult {
    // Basic text preprocessing
    text = text.toLowerCase().trim();

    // Tokenize into words
    const words = this.basicTokenize(text);

    // Apply WordPiece to each word
    const tokens: number[] = [];

    for (const word of words) {
      const wordTokens = this.tokenizeWord(word);
      tokens.push(...wordTokens);
    }

    // Truncate if necessary (reserve space for [CLS] and [SEP])
    const maxTokens = this.maxSequenceLength - 2;
    const truncatedTokens = tokens.slice(0, maxTokens);

    // Add [CLS] at the start and [SEP] at the end
    const inputIds = [SPECIAL_TOKENS.CLS, ...truncatedTokens, SPECIAL_TOKENS.SEP];

    // Create attention mask (1 for real tokens, 0 for padding)
    const attentionMask = new Array(inputIds.length).fill(1);

    // Pad to max length
    while (inputIds.length < this.maxSequenceLength) {
      inputIds.push(SPECIAL_TOKENS.PAD);
      attentionMask.push(0);
    }

    // Token type IDs (all 0 for single sequence)
    const tokenTypeIds = new Array(this.maxSequenceLength).fill(0);

    return {
      inputIds,
      attentionMask,
      tokenTypeIds,
    };
  }

  /**
   * Basic tokenization: split on whitespace and punctuation.
   */
  private basicTokenize(text: string): string[] {
    // Split on whitespace
    const words = text.split(/\s+/).filter(w => w.length > 0);

    // Further split on punctuation
    const result: string[] = [];
    for (const word of words) {
      // Split punctuation but keep it
      const parts = word.split(/([^\w]+)/);
      result.push(...parts.filter(p => p.length > 0));
    }

    return result;
  }

  /**
   * Apply WordPiece algorithm to a single word.
   * Implements greedy longest-match-first approach.
   */
  private tokenizeWord(word: string): number[] {
    if (word.length === 0) {
      return [];
    }

    const tokens: number[] = [];
    let start = 0;

    while (start < word.length) {
      let end = word.length;
      let foundToken = false;

      // Try to find the longest subword match
      while (start < end) {
        let substr = word.slice(start, end);

        // Add ## prefix for non-first subwords
        if (start > 0) {
          substr = '##' + substr;
        }

        if (this.vocab.has(substr)) {
          tokens.push(this.vocab.get(substr)!);
          foundToken = true;
          start = end;
          break;
        }

        end -= 1;
      }

      // If no match found, use [UNK] token
      if (!foundToken) {
        tokens.push(SPECIAL_TOKENS.UNK);
        start += 1;
      }
    }

    return tokens;
  }

  /**
   * Get the vocabulary size.
   */
  getVocabSize(): number {
    return this.vocab.size;
  }

  /**
   * Get token string from ID.
   */
  idToToken(id: number): string | undefined {
    return this.idsToTokens.get(id);
  }

  /**
   * Get token ID from string.
   */
  tokenToId(token: string): number | undefined {
    return this.vocab.get(token);
  }
}

/**
 * Create a default WordPiece tokenizer with bundled vocabulary.
 * @param maxSequenceLength - Maximum sequence length (default: 512)
 */
export function createDefaultTokenizer(maxSequenceLength: number = 512): WordPieceTokenizer {
  // Path to the bundled vocab file
  const vocabPath = path.join(__dirname, '../../resources/model/vocab.txt');
  return new WordPieceTokenizer(vocabPath, maxSequenceLength);
}
