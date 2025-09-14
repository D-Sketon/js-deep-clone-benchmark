import { group, run, summary } from "mitata";
import { arrayBufferObject, buildLargeArrayBufferObject, successCloneType } from "./fixtures";

import { buildBenchmark } from "../../utils/benchmark";

const small = arrayBufferObject;
const large = buildLargeArrayBufferObject();

summary(() => {
  group("array-buffer: small", buildBenchmark(successCloneType, small));
  group("array-buffer: large", buildBenchmark(successCloneType, large, true));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
