#!/usr/bin/env node

import commander from "commander";

import { default as build, BuildConfig } from "./build";
import clean from "./clean";
import test from "./test";
import prepublish from "./prepublish";
import markdownTOC from "./markdownTOC";
import copyReadmes from "./copyReadmes";
import sandbox from "./sandbox";

const argv = process.argv.slice(2);
if (argv[0] === "test") {
  test(argv.slice(1));
}

commander
  .command("clean [dirs...]")
  .option("--verbose")
  .action((otherFiles: string[]) => {
    clean(otherFiles);
  });

commander
  .command("build [options...]")
  .option("--verbose")
  .option("--clean", "Boolean if the clean command should be run before build.")
  .option(
    "--styles-only",
    "Only copies the scss files into the dist directory and compiles any styles.scss files to css"
  )
  .option(
    "--scripts-only",
    "Only compiles the typescript files to ES Modules, CommonJS, and UMD."
  )
  .option("--umd-only", "Only compiles the UMD build.")
  .option("--no-umd", "Excludes the UMD build for this project")
  .option(
    "--variables-only",
    "Only creates updates the `src/scssVariables.ts` file"
  )
  .option(
    "--gzip-size",
    "Always logs the gzip size instead of requiring the verbose flag to be enabled."
  )
  .action((_, program: BuildConfig) => {
    build(program);
  });

commander
  .command("prepublish")
  .option("--verbose")
  .action(() => {
    prepublish();
  });

commander
  .command("toc [glob]")
  .option("--verbose")
  .action((glob: string) => {
    markdownTOC(glob);
  });

commander
  .command("readmes")
  .option("--verbose")
  .action(() => copyReadmes());

commander
  .command("sandbox")
  .option("--verbose")
  .option("--ignore [glob]")
  .option("--lookups-only")
  .action(({ lookupsOnly = false, ignore = "" }: any) => {
    sandbox({ lookupsOnly, ignore });
  });

commander.parse(process.argv);
