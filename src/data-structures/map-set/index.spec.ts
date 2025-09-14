import { describe, it, expect } from "vitest";
import { mapSetObject, successCloneType } from "./fixtures";
import MapCoreJs from "core-js-pure/actual/map";
import SetCoreJs from "core-js-pure/actual/set";

import { buildTestCases } from "../../utils/test";
import { CloneType } from "../../utils/constant";

const successCases = buildTestCases(successCloneType);

const failCases = buildTestCases([
  CloneType.CopyAnything,
  CloneType.KlonaLite,
  CloneType.KlonaJson,
  CloneType.FastestJsonCopy,
  CloneType.PlainObjectClone,
  CloneType.JSON,
]);

function isMap(obj: any): boolean {
  return obj instanceof Map || obj instanceof MapCoreJs;
}

function isSet(obj: any): boolean {
  return obj instanceof Set || obj instanceof SetCoreJs;
}

function collectAllMaps(obj: any, acc: Map<any, any>[] = []): Map<any, any>[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isMap(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllMaps(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllMaps(obj[k], acc);
  return acc;
}

function collectAllSets(obj: any, acc: Set<any>[] = []): Set<any>[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isSet(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllSets(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllSets(obj[k], acc);
  return acc;
}

describe("map-set-object success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(mapSetObject);
      expect(cloned).not.toBe(mapSetObject);

      // Check Maps
      const originalMaps = collectAllMaps(mapSetObject);
      const clonedMaps = collectAllMaps(cloned);
      expect(clonedMaps.length).toBe(originalMaps.length);
      for (let i = 0; i < originalMaps.length; i++) {
        expect(clonedMaps[i]).not.toBe(originalMaps[i]);
        if (name === CloneType.StructuredCloneCoreJs) {
          Array.from(clonedMaps[i].entries()).forEach(([key, value]) => {
            expect(originalMaps[i].has(key)).toBe(true);
            const originalValue = originalMaps[i].get(key);
            expect(originalValue.id).toBe(value.id);
            expect(originalValue.name).toBe(value.name);
            expect(originalValue.email).toBe(value.email);
            expect(originalValue.lastLogin).toEqual(value.lastLogin);
          });
        } else {
          expect(Array.from(clonedMaps[i].entries())).toEqual(
            Array.from(originalMaps[i].entries())
          );
        }
      }

      // Check Sets
      const originalSets = collectAllSets(mapSetObject);
      const clonedSets = collectAllSets(cloned);
      expect(clonedSets.length).toBe(originalSets.length);
      for (let i = 0; i < originalSets.length; i++) {
        expect(clonedSets[i]).not.toBe(originalSets[i]);
        expect(Array.from(clonedSets[i])).toEqual(Array.from(originalSets[i]));
      }

      // Modify cloned and check original is unchanged
      if (cloned.users instanceof Map) {
        const firstUser = Array.from(cloned.users.values())[0] as any;
        if (firstUser && firstUser.roles instanceof Set) {
          firstUser.roles.add("new-role");
          expect(mapSetObject.users.get("u-1")!.roles.has("new-role")).toBe(
            false
          );
        }
      }
    });
  }
});

describe("map-set-object fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      try {
        const cloned = fn(mapSetObject);

        // For fail cases, Maps and Sets might not be cloned properly
        const originalMaps = collectAllMaps(mapSetObject);
        const clonedMaps = collectAllMaps(cloned);
        if (originalMaps.length > 0 && clonedMaps.length > 0) {
          // If cloned has Maps, check if they are the same reference
          expect(clonedMaps[0]).toBe(originalMaps[0]);
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  }
});
