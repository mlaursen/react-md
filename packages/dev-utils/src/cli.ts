#!/usr/bin/env node

import commander from "commander";

import { default as build, BuildConfig } from "./build";
import clean from "./clean";
import test from "./test";
import markdownTOC from "./markdownTOC";
import copyReadmes from "./copyReadmes";
import sandbox from "./sandbox";
import docStyles from "./docStyles";
import sassdoc from "./sassdoc";

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
  .option("--umd", "Updates the build process to include the UMD build.")
  .option(
    "--variables-only",
    "Only creates updates the `src/scssVariables.ts` file"
  )
  .option(
    "--gzip-size",
    "Always logs the gzip size instead of requiring the verbose flag to be enabled."
  )
  .option("--themes-only", "Only build the react-md theme files.")
  .option("--update", "Update all the shared files.")
  .option("--update-only", "Update all the shared files only.")
  .option("--verbose")
  .action((_, program: BuildConfig) => {
    build(program);
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
  .command("doc-styles")
  .option("--verbose")
  .action(() => docStyles());

commander
  .command("sandbox [components...]")
  .description(
    "Creates all the `Sandbox.json` files within the documentation package " +
      "so that dynamic code sandboxes and inline code can be used."
  )
  .option(
    "--clean",
    "This will clean all the sandboxes before running the sandbox command"
  )
  .option(
    "--lookups-only",
    "This will only the command to update the sandboxes.ts file in the demos folder."
  )
  .option(
    // want this option so that the Json files don't need to be stored in git and the app can
    // run immediately for new users
    "--empty",
    "Creates an empty version of all the sandboxes that do not exist yet."
  )
  .option("--verbose")
  .action(
    (
      components: string[],
      { lookupsOnly = false, empty = false, clean = false }: any
    ) => {
      sandbox({ lookupsOnly, components, empty, clean });
    }
  );

commander
  .command("sassdoc")
  .option(
    "--no-clean",
    "Boolean if the temp styles directory should not be cleaned up after this script is run"
  )
  .option("--verbose")
  .action(({ clean }: { clean: boolean }) => {
    sassdoc(clean);
  });

commander.parse(process.argv);
