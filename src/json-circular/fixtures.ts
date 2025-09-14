import { CloneType } from "../utils/constant";

export interface CircularNode {
  id: number;
  label: string;
  parent?: CircularNode;
  children: CircularNode[];
  extra?: any;
}

export const circularJson: any = {
  id: 1,
  name: "root",
  array: [] as any[],
  meta: { kind: "circular" },
};
circularJson.self = circularJson;
circularJson.array.push(circularJson);
circularJson.meta.root = circularJson;

export function buildLargeCircularJson(depth = 4, breadth = 5) {
  const root: CircularNode & { self?: any } = {
    id: 0,
    label: "node-0",
    children: [],
  };
  root.self = root;

  let idCounter = 1;
  function build(node: CircularNode, d: number) {
    if (d >= depth) return;
    for (let i = 0; i < breadth; i++) {
      const child: CircularNode = {
        id: idCounter++,
        label: `node-${idCounter}`,
        parent: node,
        children: [],
        extra: {
          nums: Array.from({ length: 8 }, (_, k) => k * (i + 1)),
          flags: { a: i % 2 === 0, b: d, txt: `d${d}i${i}` },
        },
      };
      (child.extra as any).root = root;
      node.children.push(child);
      build(child, d + 1);
    }
  }
  build(root, 0);
  return root;
}

export const successCloneType = [
  CloneType.CloneCircular,
  CloneType.Deepcopy,
  CloneType.FastCopy,
  CloneType.RfdcCircles,
  CloneType.EsCloneDeep,
  CloneType.Lodash,
  CloneType.NanoCopy,
  CloneType.Nanoclone,
  CloneType.RamdaClone,
  CloneType.StructuredClone,
  CloneType.StructuredClonePolyfill,
  CloneType.StructuredCloneCoreJs,
];
