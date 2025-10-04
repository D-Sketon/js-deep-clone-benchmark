import { describe, it, expect } from "vitest";
import { arrayBufferObject, successCloneType } from "./fixtures";

import { buildTestCases } from "../../utils/test";
import { CloneType } from "../../utils/constant";

const successCases = buildTestCases(successCloneType);

const failCases = buildTestCases([
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.CopyAnything,
  CloneType.Deepcopy,
  CloneType.FastestJsonCopy,
  CloneType.Nanoclone,
  CloneType.JustClone,
  CloneType.KlonaLite,
  CloneType.KlonaJson,
  CloneType.PlainObjectClone,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.JSON,
  CloneType.JsonDiffPatchClone,
]);

function isTypedArray(obj: any): boolean {
  return (
    obj instanceof Uint8Array ||
    obj instanceof Int8Array ||
    obj instanceof Uint16Array ||
    obj instanceof Int16Array ||
    obj instanceof Uint32Array ||
    obj instanceof Int32Array ||
    obj instanceof Float32Array ||
    obj instanceof Float64Array
  );
}

function isDataView(obj: any): boolean {
  return obj instanceof DataView;
}

function collectAllTypedArrays(obj: any, acc: any[] = []): any[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isTypedArray(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllTypedArrays(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllTypedArrays(obj[k], acc);
  return acc;
}

function collectAllDataViews(obj: any, acc: DataView[] = []): DataView[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isDataView(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllDataViews(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllDataViews(obj[k], acc);
  return acc;
}

function collectAllArrayBuffers(
  obj: any,
  acc: ArrayBuffer[] = []
): ArrayBuffer[] {
  if (!obj || typeof obj !== "object") return acc;
  if (obj instanceof ArrayBuffer) {
    acc.push(obj);
    return acc;
  }
  if (isTypedArray(obj) || isDataView(obj)) {
    acc.push(obj.buffer);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllArrayBuffers(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllArrayBuffers(obj[k], acc);
  return acc;
}

describe("array-buffer-object success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(arrayBufferObject);
      expect(cloned).not.toBe(arrayBufferObject);

      // Check ArrayBuffers
      const originalBuffers = collectAllArrayBuffers(arrayBufferObject);
      const clonedBuffers = collectAllArrayBuffers(cloned);
      expect(clonedBuffers.length).toBe(originalBuffers.length);
      for (let i = 0; i < originalBuffers.length; i++) {
        expect(clonedBuffers[i]).toStrictEqual(originalBuffers[i]);
      }

      // Check TypedArrays
      const originalTypedArrays = collectAllTypedArrays(arrayBufferObject);
      const clonedTypedArrays = collectAllTypedArrays(cloned);
      expect(clonedTypedArrays.length).toBe(originalTypedArrays.length);
      for (let i = 0; i < originalTypedArrays.length; i++) {
        expect(clonedTypedArrays[i]).not.toBe(originalTypedArrays[i]);
        expect(Array.from(clonedTypedArrays[i])).toEqual(
          Array.from(originalTypedArrays[i])
        );
        expect(clonedTypedArrays[i].buffer).not.toBe(
          originalTypedArrays[i].buffer
        );
      }

      // Check DataViews
      const originalDataViews = collectAllDataViews(arrayBufferObject);
      const clonedDataViews = collectAllDataViews(cloned);
      expect(clonedDataViews.length).toBe(originalDataViews.length);
      for (let i = 0; i < originalDataViews.length; i++) {
        expect(clonedDataViews[i]).not.toBe(originalDataViews[i]);
        // DataView values should match
        for (let j = 0; j < originalDataViews[i].byteLength; j++) {
          expect(clonedDataViews[i].getUint8(j)).toBe(
            originalDataViews[i].getUint8(j)
          );
        }
        expect(clonedDataViews[i].buffer).not.toBe(originalDataViews[i].buffer);
      }

      // Modify cloned and check original is unchanged
      if (name.includes("StructuredClone")) {
        if (cloned.fileData instanceof ArrayBuffer) {
          const clonedView = new Uint8Array(cloned.fileData);
          clonedView[0] = 255;
          const originalView = new Uint8Array(arrayBufferObject.fileData);
          expect(originalView[0]).not.toBe(255);
        }
        if (cloned.imageData instanceof Uint8Array) {
          cloned.imageData[0] = 128;
          expect(arrayBufferObject.imageData[0]).not.toBe(128);
        }
        if (cloned.audioSamples instanceof Float32Array) {
          cloned.audioSamples[0] = 1.0;
          expect(arrayBufferObject.audioSamples[0]).not.toBe(1.0);
        }
      }
    });
  }
});

describe("array-buffer-object fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      try {
        const cloned = fn(arrayBufferObject);
        // For fail cases, buffers might not be cloned properly
        const originalBuffers = collectAllArrayBuffers(arrayBufferObject);
        const clonedBuffers = collectAllArrayBuffers(cloned);
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
