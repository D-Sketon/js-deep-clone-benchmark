import { runAllBenchmarks } from "./utils/benchmark";
import jsonBench from "./json/index.bench";
import jsonCircularBench from "./json-circular/index.bench";
import regexpBench from "./regexp/index.bench";
import dateBench from "./date/index.bench";
import mapSetBench from "./data-structures/map-set/index.bench";
import arrayBufferBench from "./data-structures/array-buffer/index.bench";
import bufferBench from "./data-structures/buffer/index.bench";
import bufferZeroCopyBench from "./data-structures/buffer/zero-copy.bench";
import customClassBench from "./custom-class/index.bench";

const tasks = [
  {
    name: "json",
    task: jsonBench,
  },
  {
    name: "json-circular",
    task: jsonCircularBench,
  },
  {
    name: "regexp",
    task: regexpBench,
  },
  {
    name: "date",
    task: dateBench,
  },
  {
    name: "map-set",
    task: mapSetBench,
  },
  {
    name: "array-buffer",
    task: arrayBufferBench,
  },
  {
    name: "buffer",
    task: bufferBench,
  },
  {
    name: "buffer-zero-copy",
    task: bufferZeroCopyBench,
  },
  {
    name: "custom-class",
    task: customClassBench,
  },
];

async function main() {
   await runAllBenchmarks(tasks);
}
main();
