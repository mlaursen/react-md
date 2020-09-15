import { ensureDir, writeFile } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { clean, format, glob } from "../utils";
import { DEMOS_FOLDER, SANDBOXES_FILE, SANDBOXES_PATH } from "./constants";
import { createSandboxes } from "./createSandboxes";

type Lookups = Record<string, Record<string, string>>;

export async function sandbox(
  pattern: string = "*",
  demoPattern = "",
  cleanSandboxes = false
): Promise<void> {
  if (cleanSandboxes) {
    const sandboxes = await glob(join(SANDBOXES_PATH, "**/*.json"));
    await clean(sandboxes);
  }

  const fullPattern = `${DEMOS_FOLDER}/${pattern}/index.tsx`;
  const demoFiles = await glob(fullPattern);
  if (!demoFiles.length) {
    log.error("No demos found with the following pattern:");
    log.error(pattern);
    log.error(new Error().stack);
    process.exit(1);
  }

  createSandboxes(demoFiles, demoPattern);

  const sandboxes = await glob(join(SANDBOXES_PATH, "**/*.json"));
  const packages = new Set<string>();
  const lookups = sandboxes.reduce<Lookups>((lookups, pathname) => {
    const [pkg, fileName] = pathname
      .substring(pathname.lastIndexOf("/") + 1)
      .split("-");

    packages.add(`"${pkg}"`);
    lookups[pkg] = lookups[pkg] || {};
    lookups[pkg][
      fileName.replace(".json", "")
    ] = `() => resolve(import('./${pkg}-${fileName}'))`;

    return lookups;
  }, {});

  const stringified = JSON.stringify(lookups, null, 2).replace(
    /"(\(.+)"/g,
    "$1"
  );

  const code = SANDBOXES_FILE.replace(
    "{{SANDBOXES_JSON}}",
    stringified
  ).replace("{{PACKAGE_UNION}}", Array.from(packages).join(" | "));
  const formatted = format(code, "typescript");

  await ensureDir(SANDBOXES_PATH);
  await writeFile(join(SANDBOXES_PATH, "index.ts"), formatted);
}
