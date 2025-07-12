import { type ScssCodeFile } from "@react-md/code/types";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { FILE_URL, compileScssModule } from "./compileScssModule.js";
import { getProjectRootDir } from "./getProjectRootDir.js";

const rootDir = getProjectRootDir();
const packagesDir = resolve(rootDir, "packages");
const docsRoot = resolve(rootDir, "apps", "docs");

export function loadDemoScssInNode(fileUrl: string): string {
  const url = fileUrl.replace(FILE_URL, "");

  let filePath = url;
  if (url.startsWith("/docs")) {
    const name = url.replace("/docs/", "");

    filePath = join(docsRoot, name);
  } else {
    // NOTE: If the regexp updates, update in compileScssModule as well
    const [packageName = "", packageScope = ""] =
      url.match(/\/@react-md\/([-a-z0-9]+)\//) || [];
    if (packageScope) {
      const name = url.replace(packageName, "");
      filePath = join(packagesDir, packageScope, name);
    }
  }

  return readFileSync(filePath, "utf8");
}

export interface GetScssCodeFileOptions {
  create: boolean;
  demoName: string;
  scssPath: string;
}

export async function getScssCodeFile(
  options: GetScssCodeFileOptions
): Promise<ScssCodeFile | undefined> {
  const { create, demoName, scssPath } = options;

  if (!create) {
    return;
  }

  const scssCode = await readFile(scssPath, "utf8");
  const compiled = compileScssModule({
    scss: scssCode,
    baseName: demoName,
    load: loadDemoScssInNode,
  });

  return {
    lang: "scss",
    name: "Demo.module.scss",
    code: scssCode,
    compiled,
  };
}
