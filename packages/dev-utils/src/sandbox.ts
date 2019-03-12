import fs from "fs-extra";
import path from "path";
import { CompilerOptions } from "typescript";

import { documentationRoot } from "./paths";
import {
  createSandboxedDemo,
  createSandboxesFile,
  getRelativeRoot,
  NOOP_FILE,
  parseFile,
} from "./sandboxUtils";
import { glob, list, log, isVerbose, time } from "./utils";

const DEMOS_FOLDER = "components/Demos/";

export interface ResolveConfig {
  ignore: string;
  lookupsOnly: boolean;
}

function parseDemo(
  indexPath: string,
  aliases: string[],
  compilerOptions: CompilerOptions
) {
  const packageName = indexPath.substring(
    DEMOS_FOLDER.length,
    indexPath.lastIndexOf(path.sep)
  );
  log(`Finding all the demos for the ${packageName}`);
  log();

  const demoRoot = getRelativeRoot(indexPath);
  const demos = parseFile(indexPath, compilerOptions).filter(name =>
    name.startsWith(demoRoot)
  );

  log("Found the following demos:");
  log(list(demos));
  log();

  return demos.map(demoPath =>
    createSandboxedDemo(demoPath, aliases, compilerOptions)
  );
}

async function createSandboxJsonFiles(ignore: string) {
  log("Creating a noop file for resolutions and base tsconfig...");
  log();
  await fs.writeFile(NOOP_FILE, "", "utf-8");
  const tsconfig = await fs.readJson(
    path.join(documentationRoot, "tsconfig.json")
  );

  // this isn't entirely correct, but not sure how to really do this.
  const compilerOptions = tsconfig as CompilerOptions;
  const aliases = Object.keys(tsconfig.compilerOptions.paths).map(name =>
    name.replace("/*", "")
  );

  const demoIndexes = await glob(`${DEMOS_FOLDER}*/index.tsx`);
  log("Found the following demos:");
  log(list(demoIndexes));
  log();

  await Promise.all(
    demoIndexes.map(indexPath => {
      const parse = () => parseDemo(indexPath, aliases, compilerOptions);
      if (isVerbose()) {
        return Promise.resolve().then(parse);
      }

      return parse();
    })
  );

  log("Cleaning up the noop file...");
  await fs.remove(NOOP_FILE);
}

async function createSandboxLookups() {
  log("Searching for sandbox json files...");
  const sandboxes = await glob(`${DEMOS_FOLDER}/*/*Sandbox.json`);
  log(list(sandboxes));
  log();

  const code = await createSandboxesFile(sandboxes);
  fs.writeFileSync(path.join(DEMOS_FOLDER, "sandboxes.ts"), code, "utf8");
}

/**
 * Whew. Ok. So this script will traverse all the `packages/documentation/components/Demos/PackageName/index.tsx`
 * files and search for every demo within that file. Once that has been completed, it will resolve all dependencies
 * that are included in that demo file as well as any dependencies from optional scss files.
 *
 * This will take a long time...
 */
export default async function sandbox(config: ResolveConfig) {
  const { ignore, lookupsOnly } = config;
  if (!lookupsOnly) {
    time(() => createSandboxJsonFiles(ignore), "creating sandboxes");
  }

  time(createSandboxLookups, "sandbox lookups");
}
