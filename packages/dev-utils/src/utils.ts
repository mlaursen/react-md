import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import { execSync, ExecOptions } from "child_process";
import nodeGlob from "glob";
import now from "performance-now";
import prettyMS from "pretty-ms";
import gzipSize from "gzip-size";
import filesize from "filesize";

import { packageJson, types, dist, src } from "./paths";

export const glob = promisify(nodeGlob);

export function log(message?: string | null, force: boolean = false) {
  if (message === null || (!force && process.argv.includes("--silent"))) {
    return;
  }

  if (!message) {
    console.log();
  } else {
    console.log(message);
  }
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

export interface IPackageJson {
  name: string;
  version: string;
  scripts?: JSON;
  dependencies?: JSON;
  devDependencies?: JSON;
}

export function getPackageJson(): Promise<IPackageJson> {
  return fs.readJson(path.join(process.cwd(), packageJson));
}

export async function getPackageName(prefixed: boolean = false) {
  const packageJson = await getPackageJson();
  const { name } = packageJson;

  return prefixed ? name : name.replace(/.+\//, "");
}

export type TsConfigType = "commonjs" | "module" | "test";

export function createTsConfig(tsConfigType: TsConfigType) {
  const isCommonJS = tsConfigType === "commonjs";
  const isESModule = tsConfigType === "module";
  const isTest = tsConfigType === "test";

  let outDir: undefined | string;
  if (isESModule) {
    outDir = "./es";
  } else if (isCommonJS) {
    outDir = "./lib";
  }

  return {
    extends: `../../tsconfig.${isESModule ? "base" : tsConfigType}.json`,
    compilerOptions: {
      outDir,
      rootDir: src,
      declaration: isESModule,
      declarationDir: isESModule ? types : undefined,
      target: isESModule ? undefined : "es5",
    },
    include: [src],
    exclude: isTest ? undefined : ["**/__tests__/*"],
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

export function printSizes(filePaths: string | string[], message?: string) {
  if (typeof filePaths === "string") {
    filePaths = [filePaths];
  }

  log(
    message || `The gzipped file size${filePaths.length > 1 ? "s are" : " is"}:`
  );
  log(list(filePaths.map(getFileSize)));
}

export async function printMinifiedSizes(exclude?: RegExp) {
  let minified = await glob(`${dist}/**/*.min*`);
  if (exclude) {
    minified = minified.filter(name => !exclude.test(name));
  }

  printSizes(minified);
}
