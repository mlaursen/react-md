import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import { execSync, ExecOptions } from "child_process";
import nodeGlob from "glob";
import now from "performance-now";
import prettyMS from "pretty-ms";
import gzipSize from "gzip-size";
import filesize from "filesize";
import prettier from "prettier";
import log from "loglevel";

import {
  packageJson,
  types,
  dist,
  src,
  es,
  lib,
  packagesRoot,
  tsConfigESModule,
  tsConfigCommonJS,
  tsConfigVariables,
} from "./paths";

const readDir = promisify(fs.readdir);
const prettierConfig = prettier.resolveConfig.sync(
  path.join(packagesRoot, "button", "src", "index.ts")
);

export const glob = promisify(nodeGlob);

export function upperFirst(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

/**
 * Converts a string to "title" cased by splitting on all hyphens,
 * capitializing the first letter of each split, and then joining
 * back together.
 */
export function toTitle(s: string, joinWith: string = "") {
  return s
    .split("-")
    .map(upperFirst)
    .join(joinWith);
}

export interface CopyFilesOptions {
  message?: string | null;
  prefix?: string;
  replace?: (src: string) => string;
}

/**
 * A quick util that can copy a list of files with some nice logging.
 */
export async function copyFiles(
  files: string[],
  dest: string,
  options: CopyFilesOptions = {}
): Promise<any> {
  const { message, prefix = `src${path.sep}`, replace } = options;
  if (message !== null) {
    log.debug(message || "Copying the following files:");
  }

  await Promise.all(
    files.map(src => {
      const destSrc = replace ? replace(src) : src.substring(prefix.length);
      const currDest = path.join(dest, destSrc);
      log.debug(`- ${src} -> ${currDest}`);

      return fs.copy(src, currDest);
    })
  );
  log.debug();
}

export interface PackageJson {
  name: string;
  version: string;
  scripts?: JSON;
  dependencies?: JSON;
  devDependencies?: JSON;
}

/**
 * Gets the package.json file for the current working directory of
 * this script.
 */
export function getPackageJson(): Promise<PackageJson> {
  return fs.readJson(path.join(process.cwd(), packageJson));
}

/**
 * Gets the packge name for the current working directory of this script.
 * The package name can either be prefixed with @react-md or not.
 */
export async function getPackageName(prefixed: boolean = false) {
  const packageJson = await getPackageJson();
  const { name } = packageJson;

  return prefixed ? name : name.replace(/.+\//, "");
}

const NO_STYLES_PACKAGES = /material-icons|portal/;
const NO_TYPESCRIPT_PACKAGES = /elevation/;
type ScopedPackageFilter = (name: string) => boolean;
interface ScopedPackageOptions {
  prefixed?: boolean;
  filter?: "ts" | "scss" | ScopedPackageFilter;
}

/**
 * Gets all the react-md scoped package names. The packages can either be
 * prefixed with @react-md/ or not. They will not be prefixed by default.
 */
export async function geScopedPackageNames({
  prefixed = false,
  filter,
}: ScopedPackageOptions = {}) {
  const directories = await fs.readdir(packagesRoot);
  let customFilter: ScopedPackageFilter;
  if (filter === "ts") {
    customFilter = name => !NO_TYPESCRIPT_PACKAGES.test(name);
  } else if (filter === "scss") {
    customFilter = name => !NO_STYLES_PACKAGES.test(name);
  } else if (filter) {
    customFilter = filter;
  } else {
    customFilter = () => true;
  }

  return directories
    .filter(
      name =>
        !/dev-utils|documentation|react-md/.test(name) && customFilter(name)
    )
    .map(name => (prefixed ? `@react-md/${name}` : name));
}

export type TsConfigType = "commonjs" | "module" | "variables" | "check";

/**
 * I dislike maintaining multiple config files, so each time I try to build
 * a package, i'll re-create the tsconfig.json files required. These tsconfig
 * files will extend their "root" versions at the project base, but the extend
 * functionality isn't 100% what I need so additional settings are added.
 */
export function createTsConfig(
  tsConfigType: TsConfigType,
  packageName: string
) {
  const isCommonJS = tsConfigType === "commonjs";
  const isESModule = tsConfigType === "module";
  const isVariables = tsConfigType === "variables";

  let cacheExtension = "";
  let outDir: undefined | string;
  if (isESModule) {
    outDir = `./${es}`;
    cacheExtension = ".ejs";
  } else if (isCommonJS) {
    outDir = `./${lib}`;
    cacheExtension = ".cjs";
  } else if (isVariables) {
    outDir = `./${dist}`;
    cacheExtension = ".var";
  }

  let extendsPrefix = ".base";
  if (isVariables || isCommonJS) {
    extendsPrefix = ".cjs";
  }

  const exclude = [
    "**/__tests__/*",
    !isVariables && "**/scssVariables.ts",
  ].filter(Boolean);

  return {
    extends: `../../tsconfig${extendsPrefix}.json`,
    compilerOptions: {
      outDir,
      rootDir: src,
      incremental: !isVariables || undefined,
      declaration: isESModule || isVariables || undefined,
      declarationDir: isESModule ? types : undefined,
      target: isESModule ? undefined : "es5",
    },
    include: [isVariables ? path.join(src, "scssVariables.ts") : src],
    exclude: exclude.length ? exclude : undefined,
  };
}

export async function createTsConfigFiles() {
  const { found, variables, variablesOnly } = await checkForTypescriptFiles();
  if (!found) {
    return;
  }

  const packageName = await getPackageName();
  const config = { spaces: 2 };
  if (!variablesOnly) {
    log.info(`Creating \`${tsConfigESModule}\`...`);
    await fs.writeJson(
      tsConfigESModule,
      createTsConfig("module", packageName),
      config
    );

    log.info(`Creating \`${tsConfigCommonJS}\`...`);
    await fs.writeJson(
      tsConfigCommonJS,
      createTsConfig("commonjs", packageName),
      config
    );
  }

  if (variables) {
    log.info(`Creating the \`${tsConfigVariables}\` file...`);
    await fs.writeJson(
      tsConfigVariables,
      createTsConfig("variables", packageName),
      config
    );
  }
}

export async function checkForTypescriptFiles() {
  const allTsFiles = await glob(`${src}/**/*.+(ts|tsx)`);
  const filtered = allTsFiles.filter(
    filePath => !filePath.includes("__tests__")
  );
  const variables = filtered.some(filePath =>
    filePath.includes("scssVariables")
  );

  return {
    found: filtered.length > 0,
    variables,
    variablesOnly: filtered.length === 1 && variables,
  };
}

/**
 * This will time any async function and log the duration. Requires verbose
 * mode for any logging though.
 */
export async function time(fn: () => Promise<any>, command: string) {
  log.debug(`Running "${command}"...`);
  const startTime = now();
  await fn();

  log.info(`Completed "${command}" in ${prettyMS(now() - startTime)}`);
}

/**
 * A wrapper for execSync that will ensure that the cwd is set,
 * IO can be shown, and the current environment varaibles are
 * passed down.
 */
export function exec(command: string, options: ExecOptions = {}) {
  execSync(command, {
    cwd: process.cwd(),
    stdio: "inherit",
    ...options,
    env: {
      ...process.env,
      ...options.env,
    },
  });
}

/**
 * A simple function that will convert a list of things into a "prettified"
 * console.log-able version for debugging.
 */
export function list(things: (string | boolean | null | undefined)[]) {
  return things
    .filter(Boolean)
    .map(thing => `- ${thing}`)
    .join("\n");
}

/**
 * Creates a string of the provided file path as well as the gzipped
 * file size of the file path.
 */
export function getFileSize(filePath: string, noPath: boolean = false) {
  const size = filesize(gzipSize.sync(filePath));
  if (noPath) {
    return size;
  }

  return `${filePath} ${size}`;
}

/**
 * Prints the gzip sizes for the provided file paths.
 */
export function printSizes(
  filePaths: string | string[],
  message: string = `The gzipped file size${
    filePaths.length > 1 ? "s are" : " is"
  }:`
) {
  if (typeof filePaths === "string") {
    filePaths = [filePaths];
  }

  if (!filePaths.length) {
    return;
  }

  log.debug(message);
  log.debug(list(filePaths.map(fp => getFileSize(fp))));
}

/**
 * A nice util that will list all the filesizes for the `*.min` files
 * within a package.
 */
export async function printMinifiedSizes(exclude?: RegExp) {
  let minified = await glob(`${dist}/**/*.min*`);
  if (exclude) {
    minified = minified.filter(name => !exclude.test(name));
  }

  printSizes(minified);
}

/**
 * Formats any code provided with prettier.
 *
 * @param code The code to format
 * @param filePath A filepath to use to resolve prettier config.
 * @param parser An optional parser to apply when the file being formatted
 * is not typescript or javascript.
 */
export function format(code: string, parser?: prettier.BuiltInParserName) {
  return prettier.format(code, {
    ...prettierConfig,
    parser: parser || prettierConfig.parser || "babel",
  });
}

/**
 * Cleans and removes all the files provided.
 */
export function clean(files: string[]) {
  log.info("Cleaning the following directories and files:");
  log.info(list(files));
  log.info("");

  return Promise.all(files.map(path => fs.remove(path)));
}
