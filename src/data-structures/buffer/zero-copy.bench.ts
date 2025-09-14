import { group, run, summary } from "mitata";
import { bufferObject, buildLargeBufferObject, zeroCopyCloneType } from "./fixtures";

import { buildBenchmark } from "../../utils/benchmark";

const small = bufferObject;
const large = buildLargeBufferObject();

summary(() => {
  group("buffer: small", buildBenchmark(zeroCopyCloneType, small));
  group("buffer: large", buildBenchmark(zeroCopyCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
