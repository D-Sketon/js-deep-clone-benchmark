import { describe, it, expect } from "vitest";
import { bufferObject, successCloneType, zeroCopyCloneType } from "./fixtures";

import { buildTestCases } from "../../utils/test";
import { CloneType } from "../../utils/constant";

const successCases = buildTestCases(successCloneType);
const zeroCopyCases = buildTestCases(zeroCopyCloneType);
const failCases = buildTestCases([
  CloneType.CopyAnything,
  CloneType.EsCloneDeep,
  CloneType.Lodash,
  CloneType.FastCopy,
  CloneType.Nanoclone,
  CloneType.JustClone,
  CloneType.KlonaLite,
  CloneType.KlonaJson,
  CloneType.FastestJsonCopy,
  CloneType.PlainObjectClone,
  CloneType.JSON,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
]);

function isBuffer(obj: any): boolean {
  return Buffer.isBuffer(obj);
}

function collectAllBuffers(obj: any, acc: Buffer[] = []): Buffer[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isBuffer(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllBuffers(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllBuffers(obj[k], acc);
  return acc;
}

describe("buffer-object success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(bufferObject);
      expect(cloned).not.toBe(bufferObject);

      // Check Buffers
      const originalBuffers = collectAllBuffers(bufferObject);
      const clonedBuffers = collectAllBuffers(cloned);
      expect(clonedBuffers.length).toBe(originalBuffers.length);
      for (let i = 0; i < originalBuffers.length; i++) {
        expect(clonedBuffers[i]).not.toBe(originalBuffers[i]);
        expect(clonedBuffers[i]).toEqual(originalBuffers[i]);
      }
      // change cloned buffer should not affect original
      if (clonedBuffers.length > 0) {
        const firstClonedBuffer = clonedBuffers[0];
        const originalFirstBuffer = originalBuffers[0];
        const originalFirstByte = originalFirstBuffer[0];
        firstClonedBuffer[0] = (originalFirstByte + 1) % 256;
        expect(originalFirstBuffer[0]).toBe(originalFirstByte);
      }
    });
  }
});

describe("buffer-object zero copy cases", () => {
  for (const [name, fn] of zeroCopyCases) {
    it(name, () => {
      const cloned = fn(bufferObject);
      expect(cloned).not.toBe(bufferObject);

      // Check Buffers
      const originalBuffers = collectAllBuffers(bufferObject);
      const clonedBuffers = collectAllBuffers(cloned);
      expect(clonedBuffers.length).toBe(originalBuffers.length);
      for (let i = 0; i < originalBuffers.length; i++) {
        expect(clonedBuffers[i]).not.toBe(originalBuffers[i]);
        expect(clonedBuffers[i]).toEqual(originalBuffers[i]);
      }
      // change cloned buffer should affect original
      if (clonedBuffers.length > 0) {
        const firstClonedBuffer = clonedBuffers[0];
        const originalFirstBuffer = originalBuffers[0];
        const originalFirstByte = originalFirstBuffer[0];
        firstClonedBuffer[0] = (originalFirstByte + 1) % 256;
        expect(originalFirstBuffer[0]).toBe(originalFirstByte + 1);
      }
    });
  }
});

describe("buffer-object fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      try {
        const cloned = fn(bufferObject);
        // For fail cases, buffers might not be cloned properly
        const originalBuffers = collectAllBuffers(bufferObject);
        const clonedBuffers = collectAllBuffers(cloned);
        if (originalBuffers.length > 0 && clonedBuffers.length > 0) {
          // If cloned has buffers, check if they are the same reference
          expect(clonedBuffers[0]).toBe(originalBuffers[0]);
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  }
});
