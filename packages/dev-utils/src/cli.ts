#!/usr/bin/env node

import commander from "commander";
import loglevel from "loglevel";

import build, { BuildConfig } from "./build";
import clean from "./clean";
import copyReadmes from "./copyReadmes";
import {
  CLEAN,
  CLEAN_ONLY,
  CSS,
  DEBUG,
  EMPTY,
  GZIP,
  LOOKUPS_ONLY,
  NO_CLEAN,
  SCRIPTS_ONLY,
  SILENT,
  STAGED,
  STYLES_ONLY,
  THEMES,
  THEMES_ONLY,
  UMD,
  UMD_ONLY,
  UPDATE,
  UPDATE_ONLY,
  VARIABLES_ONLY,
} from "./flags";
import markdownTOC from "./markdownTOC";
import sandbox from "./sandbox";
import sassdoc from "./sassdoc";

const argv = process.argv.slice(2);

if (argv.includes(DEBUG)) {
  loglevel.setLevel("debug");
} else if (argv.includes(SILENT)) {
  loglevel.setLevel("error");
} else {
  loglevel.setLevel("info");
}

const createCommand = (command: string): commander.Command =>
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
  .option(CLEAN, "Boolean if the clean command should be run before build.")
  .option(
    STYLES_ONLY,
    "Only copies the scss files into the dist directory and compiles any styles.scss files to css"
  )
  .option(
    SCRIPTS_ONLY,
    "Only compiles the typescript files to ES Modules, CommonJS, and UMD."
  )
  .option(UMD, "Updates the build process to include the UMD build.")
  .option(UMD_ONLY, "Only compiles the UMD build.")
  .option(
    VARIABLES_ONLY,
    "Only creates updates the `src/scssVariables.ts` file"
  )
  .option(
    GZIP,
    "Always logs the gzip size instead of requiring the verbose flag to be enabled."
  )
  .option(
    CSS,
    "Update the build to also compile the base .css files for a package."
  )
  .option(
    THEMES,
    "Update the build to also create the main theme files in the react-md base package"
  )
  .option(THEMES_ONLY, "Only build the react-md theme files.")
  .option(UPDATE, "Update all the shared files.")
  .option(UPDATE_ONLY, "Update all the shared files only.")
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
    CLEAN,
    "This will clean all the sandboxes before running the sandbox command"
  )
  .option(CLEAN_ONLY, "This will only clean all the existing Sandbox files")
  .option(
    LOOKUPS_ONLY,
    "This will only the command to update the sandboxes.ts file in the demos folder."
  )
  .option(
    // want this option so that the Json files don't need to be stored in git and the app can
    // run immediately for new users
    EMPTY,
    "Creates an empty version of all the sandboxes that do not exist yet."
  )
  .option(
    STAGED,
    "This will update the command to work with `lint-staged` to dynamically update only the required sandboxes"
  )
  .action(
    (
      components: string[],
      {
        lookupsOnly = false,
        empty = false,
        clean = false,
        cleanOnly = false,
        staged = false,
      }
    ) => {
      sandbox({ lookupsOnly, components, empty, clean, cleanOnly, staged });
    }
  );

createCommand("sassdoc")
  .option(
    NO_CLEAN,
    "Boolean if the temp styles directory should not be cleaned up after this script is run"
  )
  .action(({ clean }: { clean: boolean }) => {
    sassdoc(clean);
  });

commander.parse(process.argv);
