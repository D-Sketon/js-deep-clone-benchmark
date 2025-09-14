import { group, run, summary } from "mitata";
import { dateObject, buildLargeDateObject, successCloneType } from "./fixtures";

import { buildBenchmark } from "../utils/benchmark";

const small = dateObject;
const large = buildLargeDateObject();

summary(() => {
  group("date: small", buildBenchmark(successCloneType, small));
  group("date: large", buildBenchmark(successCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
