import { group, run, summary } from "mitata";
import { simpleJson, buildLargeSimpleJson, successCloneType } from "./fixtures";

import { buildBenchmark } from "../utils/benchmark";

const small = simpleJson;
const large = buildLargeSimpleJson();

summary(() => {
  group("simple-json: small", buildBenchmark(successCloneType, small));
  group("simple-json: large", buildBenchmark(successCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
