#!/usr/bin/env node

import commander from "commander";

import { default as build, BuildConfig } from "./build";
import loglevel from "loglevel";
import clean from "./clean";
import markdownTOC from "./markdownTOC";
import copyReadmes from "./copyReadmes";
import sandbox from "./sandbox";
import sassdoc from "./sassdoc";

const argv = process.argv.slice(2);

const DEBUG = "--debug";
const SILENT = "--silent";
if (argv.includes(DEBUG)) {
  loglevel.setLevel("debug");
} else if (argv.includes(SILENT)) {
  loglevel.setLevel("error");
} else {
  loglevel.setLevel("info");
}

const createCommand = (command: string) =>
  commander
    .command(command)
    .option(
      DEBUG,
      "This will enable verbose logging while the script is running."
    )
    .option(SILENT, "This will enable no logging while the script is running.");

createCommand("clean [dirs...]").action((dirs: string[]) => {
  clean(dirs);
});

createCommand("build [options...]")
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
  .option(
    "--css",
    "Update the build to also compile the base .css files for a package."
  )
  .option("--themes-only", "Only build the react-md theme files.")
  .option("--update", "Update all the shared files.")
  .option("--update-only", "Update all the shared files only.")
  .action((_, program: BuildConfig) => {
    build(program);
  });

createCommand("toc [glob]").action((glob: string) => {
  markdownTOC(glob);
});

createCommand("readmes").action(() => copyReadmes());

createCommand("sandbox [components...]")
  .description(
    "Creates all the `Sandbox.json` files within the documentation package " +
      "so that dynamic code sandboxes and inline code can be used."
  )
  .option(
    "--clean",
    "This will clean all the sandboxes before running the sandbox command"
  )
  .option("--clean-only", "This will only clean all the existing Sandbox files")
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
  .action(
    (
      components: string[],
      {
        lookupsOnly = false,
        empty = false,
        clean = false,
        cleanOnly = false,
      }: any
    ) => {
      sandbox({ lookupsOnly, components, empty, clean, cleanOnly });
    }
  );

createCommand("sassdoc")
  .option(
    "--no-clean",
    "Boolean if the temp styles directory should not be cleaned up after this script is run"
  )
  .action(({ clean }: { clean: boolean }) => {
    sassdoc(clean);
  });

commander.parse(process.argv);
