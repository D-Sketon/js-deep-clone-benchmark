import { group, run, summary } from "mitata";
import { bufferObject, buildLargeBufferObject, successCloneType } from "./fixtures";

import { buildBenchmark } from "../../utils/benchmark";

const small = bufferObject;
const large = buildLargeBufferObject();

summary(() => {
  group("buffer: small", buildBenchmark(successCloneType, small));
  group("buffer: large", buildBenchmark(successCloneType, large, true));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
