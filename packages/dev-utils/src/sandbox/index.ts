import { execSync } from "child_process";
import { ensureDir, existsSync, remove, writeJson } from "fs-extra";
import log from "loglevel";
import path from "path";

import glob from "../utils/glob";
import list from "../utils/list";
import { toTitle } from "../utils/titles";
import { DEMOS_FOLDER, SANDBOXES_PATH } from "./constants";
import { extractDemoFiles, extractImports } from "./extract";
import { getAliasedImports } from "./formatters";
import generate, {
  createSandboxesLookup,
  findGeneratedSandboxes,
  getSandboxFileName,
} from "./generate";
import getAliases from "./getAliases";
import getCompilerOptions from "./getCompilerOptions";

export interface ResolveConfig {
  components: string[];
  lookupsOnly: boolean;
  empty: boolean;
  clean: boolean;
  cleanOnly: boolean;
  staged: boolean;
}

async function createSandboxJsonFiles(
  components: string[],
  empty: boolean
): Promise<void> {
  const matcher = components.length
    ? `+(${components.map((name) => toTitle(name, "")).join("|")})`
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

  const compilerOptions = getCompilerOptions();

  log.debug("Using the following compiler options:");
  log.debug(JSON.stringify(compilerOptions, null, 2));
  log.debug();

  const aliases = getAliases(compilerOptions);
  const demos = (
    await Promise.all(
      demoIndexes.map((demoIndexPath) => extractDemoFiles(demoIndexPath))
    )
  ).reduce((list, sublist) => [...list, ...sublist], []);

  demos.sort();

  log.debug("Found all the following demo files:");
  log.debug(list(demos));
  log.debug();

  await ensureDir(SANDBOXES_PATH);
  if (empty) {
    const paths = demos.map(getSandboxFileName);
    const missing = paths.filter((p) => !existsSync(p));
    if (missing.length) {
      log.debug("Creating empty sandbox files:", true);
      log.debug(list(missing), true);
      log.debug("", true);

      await Promise.all(paths.map((p) => writeJson(p, {})));
    }

    return;
  }

  log.info("Starting to extract all the imports for each demo...");
  await Promise.all(
    demos.map((demoPath) => {
      const [demoName, folder1, folder2] = demoPath
        .replace(`${path.sep}index.ts`, "")
        .replace(`.${path.sep}`, "")
        .split(path.sep)
        .reverse();
      const packageName =
        folder1 === demoName.replace(/\.tsx?$/, "") ? folder2 : folder1;
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
      const dependencies = allImports.filter((name) => !aliased.includes(name));

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
export default async function sandbox({
  components,
  lookupsOnly,
  empty,
  clean: cleanSandboxes,
  cleanOnly,
  staged,
}: ResolveConfig): Promise<void> {
  if (staged) {
    if (!components.length) {
      const stagedFiles = execSync("git diff --staged --name-only")
        .toString()
        .trim()
        .split("\n");
      components = stagedFiles.filter((name) => name.includes("Demos"));
    }
    const demos = Array.from(
      new Set(
        components.map((filePath) => {
          let demo = filePath.replace(/.+\/Demos\//, "");
          demo = demo.substring(0, demo.indexOf(path.sep));

          return demo;
        })
      )
    );

    await createSandboxJsonFiles(demos, false);
    await createSandboxesLookup();
    return;
  }

  if (cleanSandboxes || cleanOnly) {
    const sandboxes = await findGeneratedSandboxes();
    let filtered = sandboxes;
    if (components.length) {
      const regexp = new RegExp(components.join("|"), "i");
      filtered = sandboxes.filter((pathname) => regexp.test(pathname));
    }

    await Promise.all(filtered.map((name) => remove(name)));
  }

  if (!lookupsOnly && !cleanOnly) {
    await createSandboxJsonFiles(components, empty);
  }

  if (!cleanOnly) {
    await createSandboxesLookup();
  }
}
