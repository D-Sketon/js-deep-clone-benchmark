import { describe, it, expect } from "vitest";
import { circularJson, successCloneType } from "./fixtures";

import { buildTestCases } from "../utils/test";
import { CloneType } from "../utils/constant";

const successCases = buildTestCases(successCloneType);

const failCases = buildTestCases([
  CloneType.Clone,
  CloneType.CopyAnything,
  CloneType.JustClone,
  CloneType.Rfdc,
  CloneType.CloneDeep,
  CloneType.FastestJsonCopy,
  CloneType.Klona,
  CloneType.KlonaJson,
  CloneType.KlonaLite,
  CloneType.PlainObjectClone,
]);

function assertCircularStructure(cloned: any) {
  expect(cloned).not.toBe(circularJson);
  expect(cloned.self).toBe(cloned);
  expect(cloned.array[0]).toBe(cloned);
  expect(cloned.meta.root).toBe(cloned);
}

describe("json-circular success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(circularJson);
      assertCircularStructure(cloned);
    });
  }
});

describe("json-circular fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      expect(() => fn(circularJson)).toThrow();
    });
  }
});
export { successCloneType };
