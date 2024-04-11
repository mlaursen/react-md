import { type ScssCodeFile } from "@react-md/code/types";
import { readFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { format } from "prettier";
import { FILE_URL, compileScssModule } from "./compileScssModule.js";
import { logComplete } from "./log.js";

const coreSrc = resolve(process.cwd(), "../../packages/core/src");

export interface GetScssCodeFileOptions {
  create: boolean;
  createLookup: boolean;

  aliasDir: string;
  demoName: string;
  scssPath: string;
  scssLookupPath: string;
}

export async function getScssCodeFile(
  options: GetScssCodeFileOptions
): Promise<ScssCodeFile | undefined> {
  const { create, createLookup, aliasDir, demoName, scssPath, scssLookupPath } =
    options;

  if (!create) {
    return;
  }

  const scssCode = await readFile(scssPath, "utf8");
  const start = Date.now();
  const lookup: Record<string, string> = {};
  const compiled = compileScssModule({
    scss: scssCode,
    baseName: demoName,
    load(fileUrl) {
      const name = fileUrl.replace(`${FILE_URL}/@react-md/`, "");
      const path = name === "core" ? "_core.scss" : name;
      const fullPath = join(coreSrc, path);

      const contents = readFileSync(fullPath, "utf8");
      lookup[fileUrl] = contents;

      return contents;
    },
  });

  if (createLookup) {
    const aliasedPath = scssLookupPath.replace(aliasDir, "@");
    const scssLookupCode = `export const SCSS_LOOKUP: Record<string, string> = ${JSON.stringify(lookup)};`;
    const formatted = await format(scssLookupCode, {
      parser: "typescript",
    });
    await writeFile(scssLookupPath, formatted, "utf8");

    logComplete(`Generated ${aliasedPath}`, Date.now() - start);
  }

  return {
    lang: "scss",
    name: "Demo.module.scss",
    code: scssCode,
    compiled,
  };
}
