import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { CloneType } from "./constant";

type SuccessMap = Record<string, Set<CloneType>>;
type CaseMeta = {
  rel: string;
  group: "json" | "json-circular" | "top" | "ds";
  display: string;
};

async function findFixtureFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findFixtureFiles(full)));
    } else if (entry.isFile() && entry.name === "fixtures.ts") {
      files.push(full);
    }
  }
  return files;
}

function normalizeName(p: string, repoRoot: string): string {
  const rel = path.relative(repoRoot, p).replace(/\\/g, "/");
  // e.g. src/data-structures/buffer/fixtures.ts -> buffer
  const m = rel.match(/^src\/(.+?)\/fixtures\.ts$/);
  if (!m) return rel;
  const segs = m[1].split("/");
  return segs[segs.length - 1];
}

function sortCloneTypes(a: CloneType, b: CloneType): number {
  return a.localeCompare(b);
}

function sortCaseNames(
  success: SuccessMap,
  metaMap: Record<string, CaseMeta>
): string[] {
  const preferredTopOrder = ["regexp", "date"];
  return Object.keys(success).sort((a, b) => {
    const ma = metaMap[a];
    const mb = metaMap[b];
    const groupWeight = (m: CaseMeta) => {
      if (m.group === "json") return 0;
      if (m.group === "json-circular") return 1;
      if (m.group === "top") return 2;
      return 3; // ds
    };
    const ga = groupWeight(ma);
    const gb = groupWeight(mb);
    if (ga !== gb) return ga - gb;
    if (ma.group === "top") {
      const ia = preferredTopOrder.indexOf(a);
      const ib = preferredTopOrder.indexOf(b);
      const sa = ia === -1 ? 1000 : ia;
      const sb = ib === -1 ? 1000 : ib;
      if (sa !== sb) return sa - sb;
      return a.localeCompare(b);
    }
    // within same group, sort alphabetically by display name
    return a.localeCompare(b);
  });
}

function renderTable(
  success: SuccessMap,
  metaMap: Record<string, CaseMeta>
): string {
  const caseNames = sortCaseNames(success, metaMap);
  const allTypesAll: CloneType[] = Array.from(
    new Set(Object.values(success).flatMap((s) => Array.from(s)))
  ).sort(sortCloneTypes);

  // Exclude merged/hidden types from visible rows
  const hidden = new Set<CloneType>([
    CloneType.CloneCircular,
    CloneType.RfdcCircles,
    CloneType.RfdcWithRegExp,
    CloneType.RfdcWithCustomClasses,
    CloneType.RfdcWithArrayBuffer,
  ]);
  const allTypes: CloneType[] = allTypesAll.filter((t) => !hidden.has(t));

  // Transposed: first column is CloneType, following columns are cases
  const header = ["Library", ...caseNames];
  const rows: string[][] = [header, header.map(() => "--")];

  for (const t of allTypes) {
    const row: string[] = [t];
    for (const c of caseNames) {
      if (t === CloneType.Rfdc) {
        const hasPlain = success[c].has(CloneType.Rfdc);
        const hasAB = success[c].has(CloneType.RfdcWithArrayBuffer);
        const hasReg = success[c].has(CloneType.RfdcWithRegExp);
        const hasCustom = success[c].has(CloneType.RfdcWithCustomClasses);
        row.push(hasPlain ? "✅" : hasAB || hasReg || hasCustom ? "⚠️" : "❌");
      } else {
        row.push(success[c].has(t) ? "✅" : "❌");
      }
    }
    rows.push(row);
  }

  const lines = rows.map((cols) => `| ${cols.join(" | ")} |`);
  const note = "\n\n> ⚠️: need customize manually to support";
  return lines.join("\n") + note;
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const srcRoot = path.join(repoRoot, "src");
  const fixtureFiles = (await findFixtureFiles(srcRoot)).filter((p) =>
    /src[\\\/]((?!utils).)+[\\\/]fixtures\.ts$/.test(p)
  );

  const success: SuccessMap = {};
  const metaMap: Record<string, CaseMeta> = {};
  for (const f of fixtureFiles) {
    const url = pathToFileURL(f).href;
    const mod = await import(url);
    const list: CloneType[] = mod.successCloneType || [];
    const name = normalizeName(f, repoRoot);
    const set = new Set<CloneType>(list);
    // merge clone(circular) into clone
    if (set.has(CloneType.CloneCircular)) {
      set.add(CloneType.Clone);
      set.delete(CloneType.CloneCircular);
    }
    // merge rfdc(circles) into rfdc
    if (set.has(CloneType.RfdcCircles)) {
      set.add(CloneType.Rfdc);
      set.delete(CloneType.RfdcCircles);
    }
    success[name] = set;
    const rel = path.relative(repoRoot, f).replace(/\\/g, "/");
    const group: CaseMeta["group"] = rel.startsWith("src/data-structures/")
      ? "ds"
      : rel.includes("/json-circular/")
      ? "json-circular"
      : rel.includes("/json/")
      ? "json"
      : "top";
    metaMap[name] = { rel, group, display: name };
  }

  const md = `${renderTable(success, metaMap)}\n`;
  const outPath = path.join(repoRoot, "CLONE_SUPPORT.md");
  await fs.writeFile(outPath, md, "utf8");
  console.log(`Generated: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
