import { CloneType, CustomClass } from "../utils/constant";

export const customObject = new CustomClass(42, "TestClass");

export function buildLargeCustomObject(multiplier = 50) {
  return {
    list: Array.from({ length: multiplier }, (_, i) => ({
      ref: i,
      payload: new CustomClass(i, `Class${i}`),
      at: new Date(Date.now() + i * 1000),
      extras: Array.from(
        { length: 5 },
        (__, j) => new CustomClass(j, `Extra${j}`)
      ),
    })),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.Klona,
  CloneType.KlonaLite,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.RamdaClone,
  CloneType.RfdcWithCustomClasses
];
