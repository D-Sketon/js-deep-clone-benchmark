import { CloneType } from "../utils/constant";

export interface RegexRichObject {
  id: number;
  emailPattern: RegExp;
  uuidPattern: RegExp;
  urlPattern: RegExp;
  nested: {
    pathPattern: RegExp;
    list: RegExp[];
    mapLike: Record<string, RegExp>;
  };
  tags: { name: string; pattern: RegExp }[];
}

export const regexObject: RegexRichObject = {
  id: 77,
  emailPattern: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i,
  uuidPattern:
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  urlPattern: /https?:\/\/[^\s]+/i,
  nested: {
    pathPattern: /^(?:[A-Za-z]:)?[\/\\](?:[\w.-]+[\/\\])*[\w.-]+$/,
    list: [/foo/i, new RegExp("bar\\d+", "g"), /multi\s+word/],
    mapLike: {
      js: /\.jsx?$/i,
      ts: /\.tsx?$/i,
      css: /\.s?css$/i,
    },
  },
  tags: Array.from({ length: 12 }, (_, i) => ({
    name: `tag-${i}`,
    pattern: new RegExp(`^tag-${i}$`),
  })),
};

export function buildLargeRegexObject(multiplier = 60) {
  return {
    bucket: Array.from({ length: multiplier }, (_, i) => ({
      ref: i,
      base: regexObject,
      stamp: new RegExp(`^item-${i}-[a-z]+$`, i % 2 ? "i" : undefined),
      exts: Object.fromEntries([
        ["img", /\.(?:png|jpe?g|gif|webp)$/i],
        ["data", /\.(?:json|ya?ml|csv)$/i],
      ]),
    })),
  };
}

export const successCloneType = [
  CloneType.Clone,
  CloneType.CloneCircular,
  CloneType.CloneDeep,
  CloneType.Deepcopy,
  CloneType.EsCloneDeep,
  CloneType.FastCopy,
  CloneType.JustClone,
  CloneType.Klona,
  CloneType.KlonaLite,
  CloneType.RfdcWithRegExp,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.Nanoclone,
  CloneType.RamdaClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
  CloneType.StructuredClone,
];
