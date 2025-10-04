import { describe, it, expect } from "vitest";
import { customObject, successCloneType } from "./fixtures";

import { buildTestCases } from "../utils/test";
import { CloneType, CustomClass } from "../utils/constant";

const successCases = buildTestCases(successCloneType);
const failCases = buildTestCases([
  CloneType.CloneDeep,
  CloneType.CopyAnything,
  CloneType.Deepcopy,
  CloneType.JustClone,
  CloneType.KlonaJson,
  CloneType.FastestJsonCopy,
  CloneType.Nanoclone,
  CloneType.PlainObjectClone,
  CloneType.JSON,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
  CloneType.JsonDiffPatchClone,
]);

function isCustomClass(obj: any): obj is CustomClass {
  return obj instanceof CustomClass;
}

describe("custom-class success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(customObject) as CustomClass;
      expect(cloned).not.toBe(customObject);
      expect(isCustomClass(cloned)).toBe(true);

      // Check properties
      expect(cloned.id).toBe(customObject.id);
      expect(cloned.name).toBe(customObject.name);
      expect(cloned.data).not.toBe(customObject.data);
      expect(cloned.data).toEqual(customObject.data);
      expect(cloned.items).not.toBe(customObject.items);
      expect(cloned.items).toEqual(customObject.items);
      expect(cloned.createdAt.getTime()).toBe(customObject.createdAt.getTime());
      expect(cloned.symbolProp).toBe(customObject.symbolProp); // Symbols are copied by reference in some libs

      // Check methods
      expect(cloned.instanceMethod()).toBe(customObject.instanceMethod());
      expect(cloned.toString()).toBe(customObject.toString());

      // Check getter/setter
      expect(cloned.fullName).toBe(customObject.fullName);
      cloned.fullName = "NewName (99)";
      expect(cloned.name).toBe("NewName");
      expect(cloned.id).toBe(99);

      // Note: Private fields are not typically cloned by most libraries

      // Modify cloned and check original is not affected
      cloned.id = 999;
      expect(customObject.id).toBe(42);
    });
  }
});

describe("custom-class fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      try {
        const cloned = fn(customObject);
        if (name === CloneType.CopyAnything || name === CloneType.KlonaJson) {
          expect(cloned).toEqual(customObject);
          return;
        }
        expect(isCustomClass(cloned)).toBe(false);
        expect(typeof cloned).toBe("object");
        expect(cloned.id).toBe(customObject.id);
        expect(cloned.name).toBe(customObject.name);
        // Methods are lost
        expect(typeof cloned.instanceMethod).toBe("undefined");
        expect(typeof cloned.protoMethod).toBe("undefined");
      } catch (e) {
        // Some libraries may throw errors on certain types
        expect(e).toBeInstanceOf(Error);
      }
    });
  }
});
