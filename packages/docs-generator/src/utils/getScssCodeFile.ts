import { type ScssCodeFile } from "@react-md/code/types";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { FILE_URL, compileScssModule } from "./compileScssModule.js";

const rootDir = process.cwd();
const packagesDir = resolve(rootDir, "../../packages");
const coreRoot = resolve(packagesDir, "core");
const codeRoot = resolve(packagesDir, "code");

export function loadDemoScssInNode(fileUrl: string): string {
  const url = fileUrl.replace(FILE_URL, "");

  let filePath: string;
  if (url.startsWith("/docs")) {
    const name = url.replace("/docs/", "");

    filePath = join(rootDir, name);
  } else if (url.includes("/code/")) {
    const name = url.replace("/@react-md/code/", "");
    filePath = join(codeRoot, name);
  } else {
    const name = url.replace("/@react-md/core/", "");
    filePath = join(coreRoot, name);
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
