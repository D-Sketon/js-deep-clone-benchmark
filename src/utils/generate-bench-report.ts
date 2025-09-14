import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { runAllBenchmarks } from "../utils/benchmark";

type Task = {
  name: string;
  task: (opts?: any) => Promise<any>;
};

type TaskMeta = {
  group: "json" | "json-circular" | "top" | "ds";
};

async function findBenchFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findBenchFiles(full)));
    } else if (entry.isFile() && /\.bench\.ts$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function normalizeTaskName(p: string, repoRoot: string): string {
  const rel = path.relative(repoRoot, p).replace(/\\/g, "/");
  // src/json/index.bench.ts -> json
  let m = rel.match(/^src\/([^/]+)\/index\.bench\.ts$/);
  if (m) return m[1];
  // src/data-structures/buffer/index.bench.ts -> buffer
  m = rel.match(/^src\/data-structures\/([^/]+)\/index\.bench\.ts$/);
  if (m) return m[1];
  // src/data-structures/buffer/zero-copy.bench.ts -> buffer-zero-copy
  m = rel.match(/^src\/data-structures\/([^/]+)\/zero-copy\.bench\.ts$/);
  if (m) return `${m[1]}-zero-copy`;
  // Fallback to last directory name
  const segs = rel.split("/");
  if (segs.length >= 2) return segs[segs.length - 2];
  return rel;
}

function getTaskGroup(p: string, repoRoot: string): TaskMeta["group"] {
  const rel = path.relative(repoRoot, p).replace(/\\/g, "/");
  if (rel.startsWith("src/data-structures/")) return "ds";
  if (rel.includes("/json-circular/")) return "json-circular";
  if (rel.includes("/json/")) return "json";
  return "top";
}

function formatOps(ops?: number): string {
  if (!ops || !Number.isFinite(ops)) return "-";
  try {
    return ops.toLocaleString();
  } catch {
    return String(ops);
  }
}

function abbreviateOps(ops: number): string {
  if (!Number.isFinite(ops)) return "-";
  if (ops >= 1_000_000) return `${(ops / 1_000_000).toFixed(1)}M`;
  if (ops >= 1_000) return `${(ops / 1_000).toFixed(1)}k`;
  return String(ops);
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

function toFileSafeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\-_.]+/g, "-");
}

async function renderEchartsBarSVG(
  title: string,
  data: Record<string, number>,
  opts?: { width?: number; barHeight?: number; gap?: number }
): Promise<string> {
  const width = opts?.width ?? 900;
  const barHeight = opts?.barHeight ?? 20;
  const gap = opts?.gap ?? 8;
  const entries = Object.entries(data)
    .filter(([, v]) => Number.isFinite(v))
    .sort((a, b) => b[1] - a[1]);
  const count = entries.length;

  const labels = entries.map(([n]) => `    ${n}`);
  const values = entries.map(([, v]) => v);

  const innerHeight = count > 0 ? count * (barHeight + gap) - gap : 0;
  const height = innerHeight + 160;

  const e = await import("echarts");
  const echartsAny: any = (e as any).default ?? (e as any);
  const chart = echartsAny.init(null, null, {
    renderer: "svg",
    ssr: true,
    width,
    height,
  } as any);

  const option = {
    animation: false,
    backgroundColor: "#ffffff",
    title: {
      text: title,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (val: number) => abbreviateOps(val),
        color: "#111",
      },
      axisLine: { lineStyle: { color: "#999" } },
      splitLine: { show: true },
    },
    yAxis: {
      type: "category",
      axisLabel: { interval: 0, margin: 4, color: "#111" },
      axisLine: { lineStyle: { color: "#999" } },
      data: labels,
    },
    series: [
      {
        type: "bar",
        data: values,
        itemStyle: { color: "#4F46E5" },
      },
    ],
  } as any;

  chart.setOption(option);
  const svg = chart.renderToSVGString();
  chart.dispose();
  return svg as string;
}

async function collectBenchMeta(repoRoot: string): Promise<{
  files: string[];
  nameMap: Record<string, string>;
  metaMap: Record<string, TaskMeta>;
}> {
  const srcRoot = path.join(repoRoot, "src");
  const benchFiles = (await findBenchFiles(srcRoot)).filter((p) =>
    /src[\\\/]((?!utils).)+[\\\/].+\.bench\.ts$/.test(p)
  );

  const metaMap: Record<string, TaskMeta> = {};
  const nameMap: Record<string, string> = {};
  for (const f of benchFiles) {
    const name = normalizeTaskName(f, repoRoot);
    metaMap[name] = { group: getTaskGroup(f, repoRoot) };
    nameMap[f] = name;
  }
  return { files: benchFiles, nameMap, metaMap };
}

function sortTaskNames(
  names: string[],
  metaMap: Record<string, TaskMeta>
): string[] {
  const preferredTopOrder = ["regexp", "date"]; // keep same with generate-clone-support
  const groupWeight = (g: TaskMeta["group"]) => {
    if (g === "json") return 0;
    if (g === "json-circular") return 1;
    if (g === "top") return 2;
    return 3; // ds
  };
  return [...names].sort((a, b) => {
    const ga = groupWeight(metaMap[a]?.group || "ds");
    const gb = groupWeight(metaMap[b]?.group || "ds");
    if (ga !== gb) return ga - gb;
    if ((metaMap[a]?.group || "ds") === "top") {
      const ia = preferredTopOrder.indexOf(a);
      const ib = preferredTopOrder.indexOf(b);
      const sa = ia === -1 ? 1000 : ia;
      const sb = ib === -1 ? 1000 : ib;
      if (sa !== sb) return sa - sb;
      return a.localeCompare(b);
    }
    return a.localeCompare(b);
  });
}

function renderMarkdown(
  ctx: Awaited<ReturnType<typeof runAllBenchmarks>>[0],
  results: Awaited<ReturnType<typeof runAllBenchmarks>>[1],
  metaMap: Record<string, TaskMeta>,
  imageMap: Record<string, { small?: string; large?: string }>
): string {
  const taskNames = sortTaskNames(Object.keys(results), metaMap);
  const lines: string[] = [];

  // print ctx info
  lines.push(`cpu: ${ctx?.cpu.name}\n`);
  lines.push(`runtime: ${ctx?.runtime} ${(ctx as any)?.version} (${ctx?.arch})\n`);

  for (const taskName of taskNames) {
    const groups = results[taskName] || {};
    // Map size label -> { alias -> ops }
    const sizeToOps: Record<string, Record<string, number>> = {
      small: {},
      large: {},
    };
    for (const [groupName, arr] of Object.entries(groups)) {
      const key = /small/i.test(groupName)
        ? "small"
        : /large/i.test(groupName)
        ? "large"
        : "small";
      for (const item of arr) {
        sizeToOps[key][item.name] = item.ops;
      }
    }
    const allAliases = Array.from(
      new Set([
        ...Object.keys(sizeToOps.small),
        ...Object.keys(sizeToOps.large),
      ])
    ).sort((a, b) => a.localeCompare(b));

    lines.push(`### ${taskName}`);
    lines.push("");
    lines.push("| Library | small (ops/s) | large (ops/s) |");
    lines.push("| -- | --: | --: |");
    for (const alias of allAliases) {
      const smallOps = sizeToOps.small[alias];
      const largeOps = sizeToOps.large[alias];
      lines.push(
        `| ${alias} | ${formatOps(smallOps)} | ${formatOps(largeOps)} |`
      );
    }
    lines.push("");
    // embed images if exist
    const imgs = imageMap[taskName] || {};
    if (imgs.small || imgs.large) {
      if (imgs.small) lines.push(`![${taskName} small](${imgs.small})`);
      if (imgs.large) lines.push(`![${taskName} large](${imgs.large})`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

async function main() {
  const isNode = typeof process !== "undefined" && process.versions.node;
  const isBun = typeof Bun !== "undefined";
  const repoRoot = path.resolve(__dirname, "..", "..");
  const { files, nameMap, metaMap } = await collectBenchMeta(repoRoot);
  if (files.length === 0) {
    console.warn("No benchmark tasks found.");
    return;
  }
  let ctx: Awaited<ReturnType<typeof runAllBenchmarks>>[0] = null;
  const aggregate: Awaited<ReturnType<typeof runAllBenchmarks>>[1] = {};
  const desiredOrder = sortTaskNames(Object.values(nameMap), metaMap);
  const orderedFiles = desiredOrder
    .map((n) => Object.keys(nameMap).find((f) => nameMap[f] === n))
    .filter((v): v is string => Boolean(v));

  const assetsDir = path.join(
    repoRoot,
    "assets",
    isBun ? "bun" : isNode ? "node" : "bench"
  );
  if (
    !(await fs
      .access(assetsDir)
      .then(() => true)
      .catch(() => false))
  ) {
    await ensureDir(assetsDir);
  }
  const imageMap: Record<string, { small?: string; large?: string }> = {};

  for (const f of orderedFiles) {
    const url = pathToFileURL(f).href;
    const mod = await import(url);
    const taskFn = (mod.default ?? mod) as Task["task"];
    if (typeof taskFn !== "function") continue;
    const name = nameMap[f];
    const [_ctx, single] = await runAllBenchmarks([{ name, task: taskFn }]);
    if (!ctx) {
      ctx = _ctx;
    }
    Object.assign(aggregate, single);

    // build charts for this task
    const groups = single[name] || {};
    const smallData: Record<string, number> = {};
    const largeData: Record<string, number> = {};
    for (const [groupName, arr] of Object.entries(groups)) {
      const key = /small/i.test(groupName)
        ? "small"
        : /large/i.test(groupName)
        ? "large"
        : "small";
      for (const item of arr) {
        if (key === "small") smallData[item.name] = item.ops;
        else largeData[item.name] = item.ops;
      }
    }
    const safeTask = toFileSafeName(name);
    const relSmall = path.posix.join(
      "assets",
      isBun ? "bun" : isNode ? "node" : "bench",
      `${safeTask}-small.svg`
    );
    const relLarge = path.posix.join(
      "assets",
      isBun ? "bun" : isNode ? "node" : "bench",
      `${safeTask}-large.svg`
    );
    const absSmall = path.join(repoRoot, relSmall);
    const absLarge = path.join(repoRoot, relLarge);

    if (Object.keys(smallData).length > 0) {
      const svg = await renderEchartsBarSVG(
        `${name} • small (ops/s)`,
        smallData
      );
      await fs.writeFile(absSmall, svg, "utf8");
      imageMap[name] = imageMap[name] || {};
      imageMap[name].small = relSmall;
    }
    if (Object.keys(largeData).length > 0) {
      const svg = await renderEchartsBarSVG(
        `${name} • large (ops/s)`,
        largeData
      );
      await fs.writeFile(absLarge, svg, "utf8");
      imageMap[name] = imageMap[name] || {};
      imageMap[name].large = relLarge;
    }
  }

  const md = renderMarkdown(ctx, aggregate, metaMap, imageMap);
  const outPath = isBun
    ? path.join(repoRoot, "BENCHMARK_BUN.md")
    : isNode
    ? path.join(repoRoot, "BENCHMARK_NODE.md")
    : path.join(repoRoot, "BENCHMARK.md");
  await fs.writeFile(outPath, md, "utf8");
  console.log(`Generated: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
