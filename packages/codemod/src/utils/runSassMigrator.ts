import { readFile, writeFile } from "node:fs/promises";
import postcssScss from "postcss-scss";

import { getSassFilesToTransform } from "./getSassFilesToTransform.js";
import { type SassTransformer } from "./types.js";

export interface RunSassMigratorOptions {
  dry: boolean;
  files: readonly string[];
  migration: SassTransformer;
}

export async function runSassMigrator(
  options: RunSassMigratorOptions
): Promise<void> {
  const { dry, migration } = options;
  const files = await getSassFilesToTransform(options.files);

  for (const filePath of files) {
    const contents = await readFile(filePath, "utf8");
    const root = postcssScss.parse(contents);
    const updated = migration(root);
    if (updated) {
      if (dry) {
        // eslint-disable-next-line no-console
        console.log(`sass-migrator would have updated "${filePath}".`);
      } else {
        await writeFile(filePath, root.toString(postcssScss.stringify), "utf8");
      }
    }
  }
}
