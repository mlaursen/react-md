import fs from "fs-extra";
import path from "path";
import { CompilerOptions } from "typescript";
import log from "loglevel";

import { documentationRoot, src } from "../paths";
import { glob, list, time, toTitle, clean } from "../utils";
import { DEMOS_FOLDER, SANDBOXES_PATH } from "./constants";
import { extractDemoFiles, extractImports } from "./extract";
import { getAliasedImports } from "./formatters";
import generate, {
  createSandboxesLookup,
  getSandboxFileName,
  findGeneratedSandboxes,
} from "./generate";

export interface ResolveConfig {
  components: string[];
  lookupsOnly: boolean;
  empty: boolean;
  clean: boolean;
  cleanOnly: boolean;
}

async function createSandboxJsonFiles(
  components: string[],
  empty: boolean
): Promise<void> {
  const matcher = components.length
    ? `+(${components.map(name => toTitle(name)).join("|")})`
    : "*";

  const globString = `${DEMOS_FOLDER}/${matcher}/index.tsx`;
  log.debug("Using the following glob string...");
  log.debug(list([globString]));
  log.debug();

  const demoIndexes = await glob(globString);
  if (!demoIndexes.length) {
    log.warn("No demo indexes found!");
    log.warn();
    process.exit(1);
    return;
  }

  log.debug("Found the following demos index files:");
  log.debug(list(demoIndexes));
  log.debug();

  const tsconfig = await fs.readJson(
    path.join(documentationRoot, "tsconfig.json")
  );

  // this isn't entirely correct, but not sure how to really do this.
  const compilerOptions = tsconfig.compilerOptions as CompilerOptions;
  delete compilerOptions.moduleResolution;

  log.debug("Using the following compiler options:");
  log.debug(JSON.stringify(compilerOptions, null, 2));
  log.debug();

  const aliases = Object.keys(compilerOptions.paths).map(name => {
    if (!name.includes("@react-md")) {
      name = name.replace("/*", "");
    }

    return `${src}/${name}`;
  });
  aliases.push(`${src}/_variables.scss`);
  const demos = (await Promise.all(
    demoIndexes.map(demoIndexPath => extractDemoFiles(demoIndexPath, aliases))
  )).reduce((list, sublist) => [...list, ...sublist], []);

  demos.sort();

  log.debug("Found all the following demo files:");
  log.debug(list(demos));
  log.debug();

  await fs.ensureDir(SANDBOXES_PATH);
  if (empty) {
    const paths = demos.map(getSandboxFileName);
    const missing = paths.filter(p => !fs.existsSync(p));
    if (missing.length) {
      log.debug("Creating empty sandbox files:", true);
      log.debug(list(missing), true);
      log.debug("", true);

      await Promise.all(paths.map(p => fs.writeJson(p, {})));
    }

    return;
  }

  log.info("Starting to extract all the imports for each demo...");
  await Promise.all(
    demos.map(demoPath => {
      const [demoName, packageName] = demoPath
        .replace(`${path.sep}index.ts`, "")
        .split(path.sep)
        .reverse();
      const debugName = `${packageName}/${demoName}`;
      log.info(debugName);
      log.info("Extracting dependencies...");
      const allImports = extractImports(
        demoPath,
        aliases,
        compilerOptions
      ).filter(Boolean);
      allImports.sort();

      const aliased = getAliasedImports(allImports, aliases);
      const dependencies = allImports.filter(name => !aliased.includes(name));

      log.debug("Found the following dependencies:");
      log.debug(list(dependencies));
      log.debug("");
      log.debug("and the following aliased imports:");
      log.debug(list(aliased));
      log.debug("");
      log.info("Generating the sandbox json file...");
      log.info("");

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
export default async function sandbox(config: ResolveConfig): Promise<void> {
  const {
    components,
    lookupsOnly,
    empty,
    clean: cleanSandboxes,
    cleanOnly,
  } = config;
  if (cleanSandboxes || cleanOnly) {
    await time(async () => {
      const sandboxes = await findGeneratedSandboxes();
      let filtered = sandboxes;
      if (components.length) {
        const regexp = new RegExp(components.join("|"), "i");
        filtered = sandboxes.filter(pathname => regexp.test(pathname));
      }

      return clean(filtered);
    }, "clean sandboxes");
  }

  if (!lookupsOnly && !cleanOnly) {
    await time(
      () => createSandboxJsonFiles(components, empty),
      "creating sandboxes"
    );
  }

  if (!cleanOnly) {
    time(createSandboxesLookup, "sandbox lookups");
  }
}
