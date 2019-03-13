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
import { glob, list, log, isVerbose, time, toTitle } from "./utils";

const DEMOS_FOLDER = "components/Demos/";

export interface ResolveConfig {
  components: string[];
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
  const demos = parseFile(indexPath, aliases, compilerOptions).filter(name =>
    name.startsWith(demoRoot)
  );

  log("Found the following demos:");
  log(list(demos));
  log();

  return demos.map(demoPath =>
    createSandboxedDemo(demoPath, aliases, compilerOptions)
  );
}

async function createSandboxJsonFiles(components: string[]) {
  if (!isVerbose() && !components.length) {
    log(
      `Starting to traverse all the demo files to resolve their imports so
that a code sandbox and inline-code blocks can be shown.

This will take a *very* long time especially when specific package filters
have not been used.

You can also enable the \`--verbose\` flag to list everything that is going on
behind the scenes so there is _some_ sense of progress...
`,
      true
    );
  }

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

  const matcher = components.length
    ? `+(${components.map(name => toTitle(name)).join("|")})`
    : "*";

  const globString = `${DEMOS_FOLDER}${matcher}/index.tsx`;
  log("Using the following glob string...");
  log(list([globString]));
  log();

  const demoIndexes = await glob(globString);
  if (!demoIndexes.length) {
    log("No demo indexes found!");
    log();
    process.exit(1);
    return;
  }

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
  const { components, lookupsOnly } = config;
  if (!lookupsOnly) {
    await time(() => createSandboxJsonFiles(components), "creating sandboxes");
  }

  time(createSandboxLookups, "sandbox lookups");
}
