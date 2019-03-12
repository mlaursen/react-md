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

import { packageJson, types, dist, src, es, lib } from "./paths";

export const glob = promisify(nodeGlob);

export function isVerbose() {
  return process.argv.includes("--verbose");
}

export function log(message?: string | null, force: boolean = false) {
  if (message === null || (!force && !isVerbose())) {
    return;
  }

  console.log(message || "");
}

export function upperFirst(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function toTitle(s: string, joinWith: string = "") {
  return s
    .split("-")
    .map(upperFirst)
    .join(joinWith);
}

export async function copyFiles(
  files: string[],
  dest: string,
  message?: string | null,
  prefix: string = `src${path.sep}`
): Promise<any> {
  log(message === null ? null : message || "Copying the following files:");

  await Promise.all(
    files.map(src => {
      const currDest = path.join(dest, src.substring(prefix.length));
      log(`- ${src} -> ${currDest}`);
      return fs.copy(src, currDest);
    })
  );

  log();
}

export interface PackageJson {
  name: string;
  version: string;
  scripts?: JSON;
  dependencies?: JSON;
  devDependencies?: JSON;
}

export function getPackageJson(): Promise<PackageJson> {
  return fs.readJson(path.join(process.cwd(), packageJson));
}

export async function getPackageName(prefixed: boolean = false) {
  const packageJson = await getPackageJson();
  const { name } = packageJson;

  return prefixed ? name : name.replace(/.+\//, "");
}

export type TsConfigType = "commonjs" | "module" | "test" | "variables";

export function createTsConfig(tsConfigType: TsConfigType) {
  const isCommonJS = tsConfigType === "commonjs";
  const isESModule = tsConfigType === "module";
  const isTest = tsConfigType === "test";
  const isVariables = tsConfigType === "variables";

  let outDir: undefined | string;
  if (isESModule) {
    outDir = `./${es}`;
  } else if (isCommonJS) {
    outDir = `./${lib}`;
  } else if (isVariables) {
    outDir = `./${dist}`;
  }

  let extendsPrefix = "base";
  if (isVariables) {
    extendsPrefix = "commonjs";
  } else if (!isESModule) {
    extendsPrefix = tsConfigType;
  }

  return {
    extends: `../../tsconfig.${extendsPrefix}.json`,
    compilerOptions: {
      outDir,
      rootDir: src,
      declaration: isESModule || isVariables,
      declarationDir: isESModule ? types : undefined,
      target: isESModule ? undefined : "es5",
    },
    include: [isVariables ? path.join(src, "scssVariables.ts") : src],
    exclude: [
      !isTest && "**/__tests__/*",
      !isVariables && !isTest && "**/scssVariables.ts",
    ].filter(Boolean),
  };
}

export async function time(fn: () => Promise<any>, command: string) {
  log(`Running "${command}"...`);
  const startTime = now();
  await fn();

  log(`Completed "${command}" in ${prettyMS(now() - startTime)}`);
}

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

export function list(things: (string | boolean | null | undefined)[]) {
  return things
    .filter(Boolean)
    .map(thing => `- ${thing}`)
    .join("\n");
}

export function getFileSize(filePath: string) {
  return `${filePath} ${filesize(gzipSize.sync(filePath))}`;
}

export function printSizes(
  filePaths: string | string[],
  message?: string,
  forceLog: boolean = false
) {
  if (typeof filePaths === "string") {
    filePaths = [filePaths];
  }

  if (!filePaths.length) {
    return;
  }

  log(
    message ||
      `The gzipped file size${filePaths.length > 1 ? "s are" : " is"}:`,
    forceLog
  );
  log(list(filePaths.map(getFileSize)), forceLog);
}

export async function printMinifiedSizes(
  exclude?: RegExp,
  forceLog: boolean = false
) {
  let minified = await glob(`${dist}/**/*.min*`);
  if (exclude) {
    minified = minified.filter(name => !exclude.test(name));
  }

  printSizes(minified, "", forceLog);
}

export async function format(
  code: string,
  filePath: string,
  parser?: prettier.BuiltInParserName
) {
  const options = await prettier.resolveConfig(filePath);
  options.parser = parser || options.parser || "babel";
  return prettier.format(code, options);
}
