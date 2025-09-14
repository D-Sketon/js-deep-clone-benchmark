import { CloneType } from "../utils/constant";

export const simpleJson = {
  id: 123,
  name: "example",
  active: true,
  tags: ["alpha", "beta", "gamma"],
  meta: {
    created: 1731000000000,
    nested: {
      level: 1,
      list: Array.from({ length: 10 }, (_, i) => ({ i, v: i * 2 })),
    },
  },
  items: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `value-${i}`,
    data: { a: i, b: i % 2 === 0, arr: [i, i + 1, i + 2] },
  })),
  matrix: Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => r * 5 + c)
  ),
  nullField: null,
};

export function buildLargeSimpleJson(multiplier = 50) {
  return {
    root: Array.from({ length: multiplier }, (_, i) => ({
      i,
      payload: simpleJson,
      arr: Array.from({ length: 10 }, (__, j) => ({
        j,
        x: j * i,
        y: `#${i}-${j}`,
      })),
    })),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.CloneDeep,
  CloneType.CopyAnything,
  CloneType.Deepcopy,
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.FastestJsonCopy,
  CloneType.JustClone,
  CloneType.Klona,
  CloneType.KlonaJson,
  CloneType.KlonaLite,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.Nanoclone,
  CloneType.PlainObjectClone,
  CloneType.RamdaClone,
  CloneType.Rfdc,
  CloneType.RfdcCircles,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
  CloneType.JSON,
];
