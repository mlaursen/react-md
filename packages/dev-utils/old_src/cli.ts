#!/usr/bin/env node

import commander from "commander";
import loglevel from "loglevel";

import build from "./build";
import changelogs from "./changelogs";
import clean from "./clean";
import configs from "./configs";
import { DEBUG, SILENT } from "./constants";
import docPackages from "./docPackages";
import fixChangelogs from "./fixChangelogs";
import indexer from "./indexer";
import libsize from "./libsize";
import prepublish from "./prepublish";
import readmes from "./readmes";
import release, { toReleaseType, RELEASE_TYPES } from "./release";
import rmdReadme from "./rmdReadme";
import sandbox from "./sandbox";
import sassdoc from "./sassdoc";
import createScssVariables from "./scssVariables";
import copyStyles from "./utils/copyStyles";
import createThemes from "./utils/createThemes";
import watch from "./watch";

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
    .option(DEBUG, "Enables the verbose logging to help debug errors.")
    .option(SILENT, "Disables all logging.");

createCommand("build")
  .description(
    "Compiles all the typescript files in each package that contains components or scssVariables. " +
      "When run from the root, all packages will be built in dependency order with lerna."
  )
  .option("-w, --watch", "Runs type build in watch mode.")
  .option(
    "--cjs",
    "Updates the watch command to also include the CommonJS bundles."
  )
  .option(
    "--scoped-only",
    "Only build the scoped packages to ignore the base `react-md` package."
  )
  .action(
    ({ scopedOnly = false, silent = false, watch = false, cjs = false }) => {
      build(scopedOnly, silent, watch, cjs);
    }
  );

createCommand("prepublish")
  .description(
    "Runs all the required scripts before publishing the packages with lerna. " +
      "Also used for first-time clones to setup all builds in a single command."
  )
  .option(
    "--init",
    "Updates the scripts so that only the typescript files are compiled and " +
      "the scss files are copied to the dist. This is normally used for " +
      "first-time clones."
  )
  .action(({ init = false }) => prepublish(init));

createCommand("styles")
  .description(
    "Copies all the SCSS files into the dist folder as well as creating non-webpack export version."
  )
  .action(() => copyStyles());

createCommand("sassdoc")
  .description(
    "Creates the sassdoc for the documentation site in all scoped packages."
  )
  .option(
    "--no-copy",
    "Updates the command to no longer copy the scss files into all the dists."
  )
  .action(({ copy = true }) => sassdoc(copy));

createCommand("variables")
  .description("Creates the scssVariables file in all scoped packages.")
  .action(() => createScssVariables());

createCommand("readmes")
  .option("--clean", "Removes all the existing readmes before copying them")
  .description(
    "Copies all the readmes from the scoped packages into the documentation site. It also handles adding or removing content from the readmes with special comment tokens."
  )
  .action(({ clean = false }) => readmes(clean));

createCommand("sandbox [components...]")
  .description(
    "Creates all the `Sandbox.json` files within the documentation package " +
      "so that dynamic code sandboxes and inline code can be used."
  )
  .option(
    "--clean",
    "Removes all the sandbox files before creating the sandboxes."
  )
  .option(
    "--clean-only",
    "Removes all the sandbox files without creating new ones."
  )
  .option(
    "--lookups-only",
    "Only updates the sandbox index file in the documentation package for sandbox lookups."
  )
  .option("--staged", "Only creates sandboxes for staged demo files.")
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
    ) => sandbox({ lookupsOnly, components, empty, clean, cleanOnly, staged })
  );

createCommand("libsize")
  .option(
    "--no-umd",
    "Update the command to no longer rebuild the umd bunle automatically."
  )
  .option(
    "--no-themes",
    "Updates the command to no longer rebuild all the default themes."
  )
  .option(
    "--commit",
    "Updates the command to commit any libsize changes to the base README.md and the about page in the documentation site"
  )
  .option(
    "--stage",
    "Updates the command to stage any libsize changes instead of committing."
  )
  .description(
    "Prints the gzipped size for the entire library based on the UMD bundle and the min/max prebuilt CSS themes."
  )
  .action(({ umd = true, themes = true, commit = false, stage = false }) =>
    libsize(umd, themes, commit, stage)
  );

createCommand("themes")
  .description(
    "Create all the pre-compiled themes in the base react-md package."
  )
  .action(() => createThemes());

createCommand("watch")
  .description(
    "Dynamically starts tsc watchers for each package once a file has been changed " +
      "in that package."
  )
  .option(
    "--cjs",
    "Also starts up a commonjs watcher for each package. This is not enabled by " +
      "default since the next server doesn't have hot-reloading for shared packages " +
      "right now so the server would have to be restarted anyways for the changes to " +
      " be in effect."
  )
  .action(({ cjs = false }) => watch(cjs));

createCommand("doc-packages")
  .description(
    "Updates the `src/constants/packages.ts` file in the documentation package."
  )
  .action(() => docPackages());

createCommand("doc-index")
  .description(
    "Indexes all the metadata for the documentation site so that it can be searched."
  )
  .action(() => indexer());

createCommand("clean")
  .description(
    "Cleans the current package or all the packages if run from the root level."
  )
  .action(() => clean(true));

createCommand("configs").action(() => configs());
createCommand("changelogs")
  .option("--clean", "Removes all the existing readmes before copying them")
  .action(({ clean = false }) => changelogs(clean));
createCommand("rmd-readme").action(() => rmdReadme());
createCommand("fix-changelogs")
  .option(
    "--amend",
    "Amend the previous commit to include these changes. This should really only be used during the release process."
  )
  .option("--stage", "Boolean if the changes should only be staged")
  .action(({ amend = false, stage = false }) => fixChangelogs(amend, stage));
createCommand("release")
  .option(
    "-t, --type <type>",
    `The release type. This should be one of: [ ${RELEASE_TYPES.join(", ")} ]`,
    toReleaseType
  )
  .option(
    "-b, --blog",
    "Updates the command to wait for the blog to be written before triggering the release. " +
      "This will default to `true` when the release type is not one of the `pre*` types."
  )
  .option(
    "--yes",
    "Passes `--yes` to the `lerna version` and `lerna publish` commands"
  )
  .description("Triggers a release for react-md")
  .action(({ type = "", blog = undefined, yes }) => release(type, blog, yes));

commander.parse(process.argv);
