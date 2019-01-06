#!/usr/bin/env node

import commander from "commander";

import { default as build, IBuildConfig } from "./build";
import clean from "./clean";
import test from "./test";
import prepublish from "./prepublish";

const argv = process.argv.slice(2);
if (argv[0] === "test") {
  test(argv.slice(1));
}

commander.command("clean").action(() => {
  clean();
});

commander
  .command("build [options...]")
  .option(
    "--styles-only",
    "Only copies the scss files into the dist directory and compiles any styles.scss files to css"
  )
  .option(
    "--scripts-only",
    "Only compiles the typescript files to ESModules, CommonJS, and UMD."
  )
  .action((_, program: IBuildConfig) => {
    build(program);
  });

commander.command("prepublish").action(() => {
  prepublish();
});

commander.parse(process.argv);
