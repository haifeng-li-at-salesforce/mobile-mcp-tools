/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as ort from 'onnxruntime-node';
import { EMBEDDING_DIMENSION } from '../types.js';
import { WordPieceTokenizer } from './wordPieceTokenizer.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Local embedding service using ONNX Runtime with WordPiece tokenizer.
 * Uses a singleton pattern to avoid reloading the model.
 *
 * This implementation uses onnxruntime-node for native Node.js support.
 * Download the ONNX model from Hugging Face:
 *   https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
 *
 * For quantized version (~22MB):
 *   https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/blob/main/onnx/model_quantized.onnx
 */
export class LocalEmbedder {
  private static instance: LocalEmbedder | null = null;
  private session: ort.InferenceSession | null = null;
  private tokenizer: WordPieceTokenizer | null = null;
  private modelPath: string;
  private vocabPath: string;
  private isLoading: boolean = false;
  private loadPromise: Promise<void> | null = null;

  private constructor(
    modelPath: string = path.join(__dirname, '../../resources/model/model_int8.onnx'),
    vocabPath: string = path.join(__dirname, '../../resources/model/vocab.txt')
  ) {
    this.modelPath = modelPath;
    this.vocabPath = vocabPath;
  }

  /**
   * Get the singleton instance of LocalEmbedder.
   * @param modelPath - Path to the ONNX model file
   * @param vocabPath - Path to the vocabulary file
   */
  static getInstance(modelPath?: string, vocabPath?: string): LocalEmbedder {
    if (!LocalEmbedder.instance) {
      LocalEmbedder.instance = new LocalEmbedder(modelPath, vocabPath);
    }
    return LocalEmbedder.instance;
  }

  /**
   * Reset the singleton instance (useful for testing).
   */
  static resetInstance(): void {
    LocalEmbedder.instance = null;
  }

  /**
   * Initialize the embedding model and tokenizer.
   * This is called automatically on first embed() call.
   */
  async initialize(): Promise<void> {
    if (this.session && this.tokenizer) {
      return;
    }

    if (this.isLoading && this.loadPromise) {
      await this.loadPromise;
      return;
    }

    this.isLoading = true;
    this.loadPromise = this.loadModelAndTokenizer();
    await this.loadPromise;
    this.isLoading = false;
  }

  private async loadModelAndTokenizer(): Promise<void> {
    // Verify files exist
    if (!fs.existsSync(this.modelPath)) {
      throw new Error(
        `Model file not found: ${this.modelPath}\n` +
          'Please download the ONNX model from:\n' +
          'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/blob/main/onnx/model_quantized.onnx'
      );
    }
    if (!fs.existsSync(this.vocabPath)) {
      throw new Error(`Vocabulary file not found: ${this.vocabPath}`);
    }

    // Create ONNX Runtime inference session
    this.session = await ort.InferenceSession.create(this.modelPath, {
      executionProviders: ['cpu'],
    });

    // Initialize tokenizer
    this.tokenizer = new WordPieceTokenizer(this.vocabPath, 512);
  }

  /**
   * Generate embedding for a single text.
   * @param text - The text to embed
   * @returns 384-dimensional normalized embedding vector
   */
  async embed(text: string): Promise<number[]> {
    await this.initialize();

    if (!this.session || !this.tokenizer) {
      throw new Error('Embedding model or tokenizer not initialized');
    }

    // Tokenize the input text
    const tokenized = this.tokenizer.tokenize(text);

    // Create ONNX tensors
    const inputIds = new ort.Tensor('int64', BigInt64Array.from(tokenized.inputIds.map(BigInt)), [
      1,
      tokenized.inputIds.length,
    ]);
    const attentionMask = new ort.Tensor(
      'int64',
      BigInt64Array.from(tokenized.attentionMask.map(BigInt)),
      [1, tokenized.attentionMask.length]
    );
    const tokenTypeIds = new ort.Tensor(
      'int64',
      BigInt64Array.from(tokenized.tokenTypeIds.map(BigInt)),
      [1, tokenized.tokenTypeIds.length]
    );

    // Run inference
    const feeds = {
      input_ids: inputIds,
      attention_mask: attentionMask,
      token_type_ids: tokenTypeIds,
    };

    const results = await this.session.run(feeds);

    // Get the output tensor - typically named 'last_hidden_state' or 'token_embeddings'
    // The output shape is [1, sequence_length, hidden_size]
    const outputName = this.session.outputNames[0];
    const outputTensor = results[outputName];
    const outputData = outputTensor.data as Float32Array;

    // Reshape from flat array to [sequence_length, hidden_size]
    const seqLength = tokenized.inputIds.length;
    const hiddenSize = outputData.length / seqLength;

    const tokenEmbeddings: number[][] = [];
    for (let i = 0; i < seqLength; i++) {
      const row: number[] = [];
      for (let j = 0; j < hiddenSize; j++) {
        row.push(outputData[i * hiddenSize + j]);
      }
      tokenEmbeddings.push(row);
    }

    // Apply mean pooling with attention mask
    const embedding = this.meanPooling(tokenEmbeddings, tokenized.attentionMask);

    // L2 normalize
    const normalized = this.l2Normalize(embedding);

    // Verify dimension
    if (normalized.length !== EMBEDDING_DIMENSION) {
      throw new Error(
        `Expected embedding dimension ${EMBEDDING_DIMENSION}, got ${normalized.length}`
      );
    }

    return normalized;
  }

  /**
   * Apply mean pooling over token embeddings using attention mask.
   */
  private meanPooling(tokenEmbeddings: number[][], attentionMask: number[]): number[] {
    const seqLength = tokenEmbeddings.length;
    const hiddenSize = tokenEmbeddings[0].length;

    // Sum embeddings for non-padding tokens
    const sumEmbedding = new Array(hiddenSize).fill(0);
    let sumMask = 0;

    for (let i = 0; i < seqLength; i++) {
      if (attentionMask[i] === 1) {
        for (let j = 0; j < hiddenSize; j++) {
          sumEmbedding[j] += tokenEmbeddings[i][j];
        }
        sumMask += 1;
      }
    }

    // Average by number of non-padding tokens
    return sumEmbedding.map(val => val / sumMask);
  }

  /**
   * L2 normalize a vector.
   */
  private l2Normalize(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(val => val / norm);
  }

  /**
   * Generate embeddings for multiple texts in batch.
   * @param texts - Array of texts to embed
   * @returns Array of 384-dimensional normalized embedding vectors
   */
  async embedBatch(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) {
      return [];
    }

    await this.initialize();

    if (!this.session || !this.tokenizer) {
      throw new Error('Embedding model or tokenizer not initialized');
    }

    const embeddings: number[][] = [];

    // Process in batches to manage memory
    const batchSize = 32;
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchEmbeddings = await Promise.all(batch.map(text => this.embed(text)));
      embeddings.push(...batchEmbeddings);
    }

    return embeddings;
  }

  /**
   * Check if the embedder is initialized.
   */
  isInitialized(): boolean {
    return this.session !== null && this.tokenizer !== null;
  }

  /**
   * Get the model path.
   */
  getModelPath(): string {
    return this.modelPath;
  }

  /**
   * Get the embedding dimension.
   */
  getDimension(): number {
    return EMBEDDING_DIMENSION;
  }
}

/**
 * Convenience function to embed text using the default model.
 * @param text - The text to embed
 * @returns 384-dimensional normalized embedding vector
 */
export async function embed(text: string): Promise<number[]> {
  const embedder = LocalEmbedder.getInstance();
  return embedder.embed(text);
}

/**
 * Convenience function to embed multiple texts using the default model.
 * @param texts - Array of texts to embed
 * @returns Array of 384-dimensional normalized embedding vectors
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const embedder = LocalEmbedder.getInstance();
  return embedder.embedBatch(texts);
}
