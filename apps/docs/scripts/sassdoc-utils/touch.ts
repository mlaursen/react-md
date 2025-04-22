import { log, logComplete } from "docs-generator/utils/log";
import { getAliasedFileName } from "docs-generator/utils/writeGeneratedFile";
import { existsSync } from "fs";
import { type GeneratedSassDocWithOrder } from "sassdoc-generator";

import {
  GENERATED_SASSDOC_FILE,
  GENERATED_SASSDOC_NAV_ITEMS_FILE,
} from "../constants.js";
import { ensureGeneratedDir } from "../ensureGeneratedDir.js";
import { createSassDocFile } from "./createSassDocFile.js";
import { generateNavItems } from "./generateNavItems.js";

const empty: GeneratedSassDocWithOrder = {
  mixins: new Map(),
  functions: new Map(),
  variables: new Map(),
  mixinsOrder: new Map(),
  functionsOrder: new Map(),
  variablesOrder: new Map(),
};

const runIfNotExists = async (
  fn: (generated: GeneratedSassDocWithOrder) => Promise<void>,
  fileNames: readonly string[]
): Promise<boolean> => {
  if (fileNames.some((fileName) => !existsSync(fileName))) {
    await fn(empty);
    return true;
  }

  return false;
};

export const touch = async (): Promise<void> => {
  const updates: Parameters<typeof runIfNotExists>[] = [
    [generateNavItems, [GENERATED_SASSDOC_NAV_ITEMS_FILE]],
    [createSassDocFile, [GENERATED_SASSDOC_FILE]],
  ];

  const task = async (): Promise<void> => {
    await ensureGeneratedDir();
    await Promise.all(
      updates.map(async ([fn, fileNames]) => {
        if (await runIfNotExists(fn, fileNames)) {
          fileNames.forEach((fileName) => {
            logComplete(`Created an empty "${getAliasedFileName(fileName)}`);
          });
        }
      })
    );
  };
  await log(
    task(),
    "",
    "Run `pnpm --filter docs sassdoc` to update these files."
  );
};
