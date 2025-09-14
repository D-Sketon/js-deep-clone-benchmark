import { describe, it, expect } from "vitest";
import { simpleJson, successCloneType } from "./fixtures";

import { buildTestCases } from "../utils/test";

const cases = buildTestCases(successCloneType);

describe("simple-json deep clone libs", () => {
  for (const [name, fn] of cases) {
    it(name, () => {
      const cloned = fn(simpleJson);
      expect(cloned).not.toBe(simpleJson);
      expect(cloned).toEqual(simpleJson);

      if (cloned && typeof cloned === "object") {
        (cloned as any).id = 9999;
        expect(simpleJson.id).toBe(123);
      }
    });
  }
});
