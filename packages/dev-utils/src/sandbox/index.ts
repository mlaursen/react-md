import fs from "fs-extra";
import path from "path";
import { CompilerOptions } from "typescript";

import { documentationRoot } from "../paths";
import { glob, isVerbose, list, log, time, toTitle } from "../utils";
import { DEMOS_FOLDER } from "./constants";
import { extractDemoFiles, extractImports } from "./extract";
import { getAliasedImports } from "./formatters";
import generate, { createSandboxesLookup } from "./generate";

export interface ResolveConfig {
  components: string[];
  lookupsOnly: boolean;
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

  const tsconfig = await fs.readJson(
    path.join(documentationRoot, "tsconfig.json")
  );

  // this isn't entirely correct, but not sure how to really do this.
  const compilerOptions = tsconfig.compilerOptions as CompilerOptions;
  delete compilerOptions.moduleResolution;

  log("Using the following compiler options:");
  log(JSON.stringify(compilerOptions, null, 2));
  log();

  const aliases = Object.keys(compilerOptions.paths).map(name =>
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

  log("Found the following demos index files:");
  log(list(demoIndexes));
  log();

  const demos = (await Promise.all(
    demoIndexes.map(demoIndexPath =>
      extractDemoFiles(demoIndexPath, aliases, compilerOptions)
    )
  )).reduce((list, sublist) => [...list, ...sublist], []);

  demos.sort();

  log("Found all the following demo files:");
  log(list(demos));
  log();

  log("Starting to extract all the imports for each demo...");
  const demoObjects = await Promise.all(
    demos.map(demoPath => {
      const [demoName, packageName] = demoPath.split("/").reverse();
      const debugName = `${packageName}/${demoName}`;
      log("===================================================");
      log(`Extracting from: ${debugName}`);
      const allImports = extractImports(
        demoPath,
        aliases,
        compilerOptions
      ).filter(Boolean);
      allImports.sort();

      const aliased = getAliasedImports(allImports, aliases);
      const dependencies = allImports.filter(name => !aliased.includes(name));

      log("Found the following dependencies:");
      log(list(dependencies));
      log();
      log("and the following aliased imports:");
      log(list(aliased));
      log();

      return generate({
        demoPath,
        demoName,
        packageName,
        aliases,
        aliased,
        dependencies,
      });
    })
  );
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

  time(createSandboxesLookup, "sandbox lookups");
}
