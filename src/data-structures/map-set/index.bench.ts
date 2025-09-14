import { group, run, summary } from "mitata";
import {
  mapSetObject,
  buildLargeMapSetObject,
  successCloneType,
} from "./fixtures";

import { buildBenchmark } from "../../utils/benchmark";

const small = mapSetObject;
const large = buildLargeMapSetObject();

summary(() => {
  group("map-set: small", buildBenchmark(successCloneType, small));
  group("map-set: large", buildBenchmark(successCloneType, large));
});

export default async (opts?: Parameters<typeof run>[0]) => {
  return await run(opts);
};
