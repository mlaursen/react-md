import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { compileScssModule } from "../../src/utils/compileScssModule.js";
import { format } from "../../src/utils/format.js";
import { scssModulesCache } from "../codeCache.js";
import { GENERATED_FILE_BANNER } from "../constants.js";

const SCSS_MODULES_PATH = "src/constants/scssModulesLookup.ts";

export async function createScssModule(scssModulePath: string): Promise<void> {
  const scss = await readFile(scssModulePath, "utf8");
  const fileName = basename(scssModulePath);
  const baseName = fileName.replace(".module.scss", "");
  const css = await compileScssModule({
    scss,
    baseName,
  });

  scssModulesCache.set(scssModulePath, {
    css,
    scss,
    baseName,
    fileName,
  });
}

export async function createScssModuleFile(): Promise<void> {
  const contents = await format(`${GENERATED_FILE_BANNER}
import "server-only";
import { type FakeScssModule } from "../utils/fakeScssModules.js";

export const SCSS_MODULES: Record<string, FakeScssModule> =
  ${JSON.stringify(Object.fromEntries(scssModulesCache.entries()))};
`);

  await writeFile(SCSS_MODULES_PATH, contents);
}

export async function updateScssModule(scssModulePath: string): Promise<void> {
  await createScssModule(scssModulePath);
  await createScssModuleFile();
}
