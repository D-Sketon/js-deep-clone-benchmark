import { group, run, summary } from "mitata";
import { customObject, buildLargeCustomObject, successCloneType } from "./fixtures";

import { buildBenchmark } from "../utils/benchmark";

const small = customObject;
const large = buildLargeCustomObject();

summary(() => {
  group("custom-class: small", buildBenchmark(successCloneType, small));
  group("custom-class: large", buildBenchmark(successCloneType, large));
});

export default async () => {
  return await run();
};