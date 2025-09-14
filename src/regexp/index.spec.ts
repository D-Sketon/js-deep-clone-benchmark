import { describe, it, expect } from "vitest";
import { regexObject, successCloneType } from "./fixtures";

import { CloneType } from "../utils/constant";
import { buildTestCases } from "../utils/test";

const successCases = buildTestCases(successCloneType);

const failCases = buildTestCases([
  CloneType.CopyAnything,
  CloneType.KlonaJson,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.FastestJsonCopy,
  CloneType.PlainObjectClone,
  CloneType.JSON,
]);

function collectRegex(o: any, acc: RegExp[] = []): RegExp[] {
  if (!o || typeof o !== "object") return acc;
  if (o instanceof RegExp) {
    acc.push(o);
    return acc;
  }
  if (Array.isArray(o)) {
    for (const v of o) collectRegex(v, acc);
    return acc;
  }
  for (const k of Object.keys(o)) collectRegex(o[k], acc);
  return acc;
}

function regexSnapshot(list: RegExp[]) {
  return list.map((r) => `${r.source}::${r.flags}`).sort();
}

describe("regex-object success cases", () => {
  const baseline = regexSnapshot(collectRegex(regexObject));
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(regexObject);
      const snap = regexSnapshot(collectRegex(cloned));
      expect(snap).toEqual(baseline);

      const first = collectRegex(cloned)[0];
      if (first && "lastIndex" in first) {
        (first as RegExp).lastIndex = 3;
        const originalFirst = collectRegex(regexObject)[0];
        expect(originalFirst.lastIndex).toBe(0);
      }
    });
  }
});

describe("regex-object fail cases", () => {
  const baseline = regexSnapshot(collectRegex(regexObject));
  for (const [name, fn] of failCases) {
    it(name, () => {
      const cloned = fn(regexObject);
      if (name === CloneType.PlainObjectClone) {
        const snap = regexSnapshot(collectRegex(cloned));
        expect(snap).toEqual(baseline.map(() => `(?:)::`));
        return;
      }
      if (name === CloneType.CopyAnything || name === CloneType.KlonaJson) {
        const snap = regexSnapshot(collectRegex(cloned));
        expect(snap).toEqual(baseline);

        const first = collectRegex(cloned)[0];
        if (first && "lastIndex" in first) {
          (first as RegExp).lastIndex = 3;
          const originalFirst = collectRegex(regexObject)[0];
          expect(originalFirst.lastIndex).toBe(3);
        }
        return;
      }
      expect(collectRegex(cloned).length).toBe(0);
    });
  }
});
