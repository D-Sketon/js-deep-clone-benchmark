import { describe, it, expect } from "vitest";
import { dateObject, successCloneType } from "./fixtures";

import { buildTestCases } from "../utils/test";
import { CloneType } from "../utils/constant";

const successCases = buildTestCases(successCloneType);

const failCases = buildTestCases([
  CloneType.CopyAnything,
  CloneType.KlonaJson,
  CloneType.FastestJsonCopy,
  CloneType.PlainObjectClone,
  CloneType.JSON,
]);

function isDate(x: any): x is Date {
  return x instanceof Date;
}

function collectAllDates(obj: any, acc: Date[] = []): Date[] {
  if (!obj || typeof obj !== "object") return acc;
  if (isDate(obj)) {
    acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectAllDates(v, acc);
    return acc;
  }
  for (const k of Object.keys(obj)) collectAllDates(obj[k], acc);
  return acc;
}

describe("date-object success cases", () => {
  for (const [name, fn] of successCases) {
    it(name, () => {
      const cloned = fn(dateObject);
      expect(cloned).not.toBe(dateObject);

      const originalDates = collectAllDates(dateObject)
        .map((d) => d.getTime())
        .sort();
      const clonedDates = collectAllDates(cloned)
        .map((d) => d.getTime())
        .sort();
      expect(clonedDates).toEqual(originalDates);

      cloned.createdAt.setFullYear(1999);
      expect(dateObject.createdAt.getFullYear()).toBe(new Date().getFullYear());
    });
  }
});

describe("date-object fail cases", () => {
  for (const [name, fn] of failCases) {
    it(name, () => {
      const cloned = fn(dateObject);

      const originalDates = collectAllDates(dateObject)
        .map((d) => d.getTime())
        .sort();
      const clonedDates = collectAllDates(cloned)
        .map((d) => d.getTime())
        .sort();
      if (name === CloneType.CopyAnything || name === CloneType.KlonaJson) {
        expect(clonedDates).toEqual(originalDates);
        cloned.createdAt.setFullYear(1999);
        expect(dateObject.createdAt.getFullYear()).not.toBe(
          new Date().getFullYear()
        );
        return;
      }
      expect(clonedDates).not.toEqual(originalDates);
    });
  }
});
