import { CloneFn, CloneType } from "./constant";

export const buildTestCases = (
  cases: CloneType[]
): [string, (v: any) => any][] => {
  return cases.map((type) => [type, CloneFn[type]]);
};
