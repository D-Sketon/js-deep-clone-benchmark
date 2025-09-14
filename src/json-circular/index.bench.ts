import { group, run, summary } from "mitata";
import {
  circularJson,
  buildLargeCircularJson,
  successCloneType,
} from "./fixtures";

import { buildBenchmark } from "../utils/benchmark";

const small = circularJson;
const large = buildLargeCircularJson();

summary(() => {
  group("json-circular: small", buildBenchmark(successCloneType, small));
  group("json-circular: large", buildBenchmark(successCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
