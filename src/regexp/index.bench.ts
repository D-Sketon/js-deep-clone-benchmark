import { group, run, summary } from "mitata";
import {
  regexObject,
  buildLargeRegexObject,
  successCloneType,
} from "./fixtures";

import { buildBenchmark } from "../utils/benchmark";

const small = regexObject;
const large = buildLargeRegexObject();

summary(() => {
  group("regex: small", buildBenchmark(successCloneType, small));
  group("regex: large", buildBenchmark(successCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
