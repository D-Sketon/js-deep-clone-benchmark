import { CloneType } from "./constant";
import { bench, ctx, do_not_optimize, run } from "mitata";
import { buildTestCases } from "./test";

export interface BenchmarkResult {
  name: string;
  avg: number;
  p99: number;
  p75: number;
  ops: number;
}

export const buildBenchmark = (cases: CloneType[], v: any, gc?: boolean) => {
  return () => {
    for (const [name, fn] of buildTestCases(cases)) {
      if (gc) {
        bench(name, () => do_not_optimize(fn(v))).gc("inner");
      } else {
        bench(name, () => do_not_optimize(fn(v)));
      }
    }
  };
};

export const runAllBenchmarks = async (
  tasks: {
    name: string;
    task: typeof run;
  }[],
  opts?: Parameters<typeof run>[0]
) => {
  const result: [ctx | null, Record<string, Record<string, BenchmarkResult[]>>] = [null, {}];
  const results = result[1];
  for (const { name, task } of tasks) {
    results[name] = {};
    const res = await task(opts);
    if (!result[0]) {
      result[0] = res.context;
    }
    // @ts-ignore
    const { layout = [] } = res;
    res.benchmarks.forEach((result) => {
      if (result && result.alias) {
        const avg = (result.runs[0]?.stats?.avg || 0) / 1000;
        const p99 = (result.runs[0]?.stats?.p99 || 0) / 1000;
        const p75 = (result.runs[0]?.stats?.p75 || 0) / 1000;
        const newResult: BenchmarkResult = {
          name: result.alias,
          avg,
          p99,
          p75,
          ops: Math.round(1000000 / avg),
        };
        const groupIndex = (result as any).group;
        const hasValidGroupIndex =
          typeof groupIndex === "number" && groupIndex >= 0;
        const groupName = hasValidGroupIndex
          ? layout[groupIndex]?.name
          : undefined;
        const finalGroupName = groupName || "unknown";
        if (!results[name][finalGroupName]) {
          results[name][finalGroupName] = [];
        }
        results[name][finalGroupName].push(newResult);
      }
    });
  }
  return result;
};
