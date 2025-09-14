import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

type Runtime = {
  isNode: boolean;
  isBun: boolean;
};

const SECTION_TITLES = {
  cloneSupport: "Clone Support Matrix",
  benchmark: "Benchmark Results",
} as const;

function readText(file: string): string {
  const p = resolve(process.cwd(), file);
  if (!existsSync(p)) throw new Error(`File not found: ${file}`);
  return readFileSync(p, "utf8");
}

function detectRuntime(): Runtime {
  const isNode = typeof process !== "undefined" && !!process.versions?.node;
  const isBun = typeof Bun !== "undefined";
  return { isNode, isBun };
}

function getBenchmarkFilenames(runtime: Runtime): {
  file: string;
  label: string;
} {
  if (runtime.isBun) return { file: "BENCHMARK_BUN.md", label: "Bun" };
  if (runtime.isNode) return { file: "BENCHMARK_NODE.md", label: "Node" };
  return { file: "BENCHMARK.md", label: "Benchmark" };
}

function buildBenchmarkSection(benchLabel: string, benchBody: string): string {
  // reverse the label to link to the other runtime's benchmark
  if (benchLabel === "Node") {
    benchLabel = "Bun";
  } else if (benchLabel === "Bun") {
    benchLabel = "Node";
  }
  const link = `for ${benchLabel} please refer to [${benchLabel}](${
    benchLabel === "Node"
      ? "README.md"
      : benchLabel === "Bun"
      ? "README.bun.md"
      : "README.md"
  })`;
  return ` ${link}\n\n${benchBody.trim()}`;
}

function replaceSection(
  content: string,
  sectionTitle: string,
  newBody: string
): string {
  const headingLine = `## ${sectionTitle}`;
  const headingIdx = content.indexOf(headingLine);

  if (headingIdx === -1) {
    return content.trimEnd() + `\n\n${headingLine}\n\n${newBody.trim()}\n`;
  }

  const before = content.slice(0, headingIdx);
  const afterHeadingIdx = headingIdx + headingLine.length;

  const consumedNewlines =
    content.slice(afterHeadingIdx).match(/^\r?\n*/)?.[0].length ?? 0;
  const sectionBodyStart = afterHeadingIdx + consumedNewlines;

  const rest = content.slice(sectionBodyStart);
  const nextHeadingRel = rest.search(/(?=^|[\r\n])##\s+/);
  const sectionBodyEnd =
    nextHeadingRel === -1 ? content.length : sectionBodyStart + nextHeadingRel;

  return (
    before +
    headingLine +
    "\n\n" +
    newBody.trim() +
    "\n" +
    content.slice(sectionBodyEnd)
  );
}

function main(): void {
  const { isNode, isBun } = detectRuntime();
  const fileName = isBun ? "README.bun.md" : isNode ? "README.node.md" : "README.md";
  const readmePath = resolve(process.cwd(), fileName);
  const readme = readText(fileName);

  const { file: benchFile, label: benchLabel } = getBenchmarkFilenames({
    isNode,
    isBun,
  });
  const benchRaw = readText(benchFile);
  const matrixRaw = readText("CLONE_SUPPORT.md");

  let updated = readme;
  updated = replaceSection(
    updated,
    SECTION_TITLES.cloneSupport,
    matrixRaw.trim()
  );
  updated = replaceSection(
    updated,
    SECTION_TITLES.benchmark,
    buildBenchmarkSection(benchLabel, benchRaw)
  );

  if (updated !== readme) {
    writeFileSync(readmePath, updated, "utf8");
    console.log("README updated.");
  } else {
    console.log("README unchanged.");
  }
}

main();
