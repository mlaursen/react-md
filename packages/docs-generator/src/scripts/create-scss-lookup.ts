import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { format } from "prettier";
import { compileScss } from "../utils/compileScssModule.js";
import { loadDemoScssInNode } from "../utils/getScssCodeFile.js";
import { log } from "../utils/log.js";

async function run(scssLookupPath: string): Promise<void> {
  const lookup: Record<string, string> = {};
  compileScss({
    scss: `@use "everything";`,
    load(fileUrl) {
      const contents = loadDemoScssInNode(fileUrl);
      lookup[fileUrl] = contents;
      return contents;
    },
  });

  const scssLookupCode = `export const SCSS_LOOKUP: Record<string, string> = ${JSON.stringify(lookup)};`;
  const formatted = await format(scssLookupCode, {
    parser: "typescript",
  });
  const parentFolder = dirname(scssLookupPath);
  if (!existsSync(parentFolder)) {
    await mkdir(parentFolder, { recursive: true });
  }
  await writeFile(scssLookupPath, formatted, "utf8");
}

export async function createScssLookup(): Promise<void> {
  const src = join(process.cwd(), "src");
  const scssLookupPath = join(src, "generated", "rmdScssLookup.ts");

  await log(
    run(scssLookupPath),
    "",
    `Generated ${scssLookupPath.replace(src, "@")}`
  );
}
