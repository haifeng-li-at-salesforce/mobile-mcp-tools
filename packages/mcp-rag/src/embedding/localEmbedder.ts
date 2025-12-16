/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import * as fs from 'fs';
import * as path from 'path';
import { loadAndCompile, type CompiledModel, Tensor } from '@litertjs/core';
import { EMBEDDING_DIMENSION } from '../types.js';
import { WordPieceTokenizer } from './wordPieceTokenizer.js';

/**
 * Local embedding service using TFLite model with WordPiece tokenizer.
 * Uses a singleton pattern to avoid reloading the model.
 */
export class LocalEmbedder {
  private static instance: LocalEmbedder | null = null;
  private model: CompiledModel | null = null;
  private tokenizer: WordPieceTokenizer | null = null;
  private modelPath: string;
  private vocabPath: string;
  private isLoading: boolean = false;
  private loadPromise: Promise<void> | null = null;

  private constructor(
    modelPath: string = path.join(__dirname, '../../resources/model/all-MiniLM-L6-v2-quant.tflite'),
    vocabPath: string = path.join(__dirname, '../../resources/model/vocab.txt')
  ) {
    this.modelPath = modelPath;
    this.vocabPath = vocabPath;
  }

  /**
   * Get the singleton instance of LocalEmbedder.
   * @param modelPath - Path to the TFLite model file
   * @param vocabPath - Path to the vocabulary file
   */
  static getInstance(
    modelPath?: string,
    vocabPath?: string
  ): LocalEmbedder {
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
    if (this.model && this.tokenizer) {
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
      throw new Error(`Model file not found: ${this.modelPath}`);
    }
    if (!fs.existsSync(this.vocabPath)) {
      throw new Error(`Vocabulary file not found: ${this.vocabPath}`);
    }

    // Load TFLite model using LiteRT
    const modelBuffer = fs.readFileSync(this.modelPath);
    // Use 'wasm' accelerator for Node.js environment
    this.model = await loadAndCompile(modelBuffer, { accelerator: 'wasm' });

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

    if (!this.model || !this.tokenizer) {
      throw new Error('Embedding model or tokenizer not initialized');
    }

    // Tokenize the input text
    const tokenized = this.tokenizer.tokenize(text);

    // Prepare input tensors as Int32Arrays with batch dimension
    const inputIds = new Int32Array(tokenized.inputIds);
    const attentionMask = new Int32Array(tokenized.attentionMask);
    const tokenTypeIds = new Int32Array(tokenized.tokenTypeIds);

    // Create LiteRT Tensors with shape [1, sequence_length]
    const inputIdsTensor = new Tensor(inputIds, [1, tokenized.inputIds.length]);
    const attentionMaskTensor = new Tensor(attentionMask, [1, tokenized.attentionMask.length]);
    const tokenTypeIdsTensor = new Tensor(tokenTypeIds, [1, tokenized.tokenTypeIds.length]);

    let normalized: number[];
    
    try {
      // Run inference with LiteRT model
      const outputs = this.model.run([inputIdsTensor, attentionMaskTensor, tokenTypeIdsTensor]) as Tensor[];
      
      // Get the first output tensor (token embeddings)
      const outputTensor = outputs[0];
      
      // Convert to typed array
      const outputArray = outputTensor.toTypedArray();
      
      // Reshape from flat array to [sequence_length, hidden_size]
      // Output shape should be [1, sequence_length, hidden_size]
      const seqLength = tokenized.inputIds.length;
      const hiddenSize = outputArray.length / seqLength;
      
      const tokenEmbeddings: number[][] = [];
      for (let i = 0; i < seqLength; i++) {
        const row: number[] = [];
        for (let j = 0; j < hiddenSize; j++) {
          row.push(outputArray[i * hiddenSize + j]);
        }
        tokenEmbeddings.push(row);
      }

      // Apply mean pooling with attention mask
      const embedding = this.meanPooling(
        tokenEmbeddings,
        tokenized.attentionMask
      );

      // L2 normalize
      normalized = this.l2Normalize(embedding);
      
      // Clean up tensors
      inputIdsTensor.delete();
      attentionMaskTensor.delete();
      tokenTypeIdsTensor.delete();
      outputs.forEach(t => t.delete());
    } catch (error) {
      // Ensure tensors are disposed even on error
      inputIdsTensor.delete();
      attentionMaskTensor.delete();
      tokenTypeIdsTensor.delete();
      throw error;
    }

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

    if (!this.model || !this.tokenizer) {
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
    return this.model !== null && this.tokenizer !== null;
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
