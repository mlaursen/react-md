#!/usr/bin/env node

import commander from "commander";
import loglevel from "loglevel";

import { clean } from "./clean";
import { configs } from "./configs";
import { CLEAN, DEBUG, SILENT } from "./constants";
import { indexer } from "./indexer";
import { libsize } from "./libsize";
import { release, RELEASE_TYPES, toReleaseType } from "./release";
import { sandbox } from "./sandbox";
import { sassdoc } from "./sassdoc";
import { shared } from "./shared";
import { themes } from "./themes";
import { umd } from "./umd";
import { copyStyles } from "./utils";
import { variables } from "./variables";
import { watch } from "./watch";

const argv = process.argv.slice(2);

if (argv.includes(DEBUG)) {
  loglevel.setLevel("debug");
} else if (argv.includes(SILENT)) {
  loglevel.setLevel("error");
} else {
  loglevel.setLevel("info");
}

const createCommand = (
  command: string,
  cleanable = false
): commander.Command => {
  const instance = commander
    .command(command)
    .option(DEBUG, "Enables the verbose logging to help debug errors.")
    .option(SILENT, "Disables all logging.");

  if (cleanable) {
    return instance.option(
      CLEAN,
      "Removes the existing files before executing."
    );
  }

  return instance;
};

createCommand("clean")
  .description("Cleans all the distributables for all publishable packages.")
  .action(() => clean());

createCommand("styles")
  .description(
    "Copies all the SCSS files into the dist folder as well as creating non-webpack specific versions."
  )
  .action(() => copyStyles());

createCommand("sassdoc")
  .description(
    "Creates the sassdoc for the documentation site in all scoped packages."
  )
  .action(() => sassdoc());

createCommand("variables")
  .description("Creates the `src/scssVariables` file in all scoped packages.")
  .action(() => variables());

createCommand("configs")
  .description(
    "Re-generates all the `tsconfig.*` files for the Typescript project references."
  )
  .action(() => configs());

createCommand("copy-shared", true)
  .description(
    "Copies all the shared markdown files and utils throughout the repo into the documentation folder."
  )
  .action(({ clean = false }) => shared(clean));

createCommand("doc-index")
  .description(
    "Indexes (terribly) metadata throughout react-md for the documentation site."
  )
  .action(() => indexer());

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
  .option(
    "--no-clean",
    "Disables cleaning when the build waas cancelled beforehand"
  )
  .description("Goes through the steps of releasing a new version of react-md.")
  .action(({ yes = false, blog = undefined, type = "", clean = true }) =>
    release({
      autoYes: yes,
      blog,
      clean,
      type,
    })
  );

createCommand("sandbox", true)
  .option(
    "--empty",
    "Creates a mostly empty sandbox index file just so the typechecker will pass."
  )
  .option(
    "-p, --pattern [pattern]",
    "An optional glob pattern to use. This should be quoted if using asterisks"
  )
  .option("-d, --demo [demo]", "An optional demo pattern regex string filter.")
  .description("Creates the `*-Sandbox.json` files in the documentation site.")
  .action(({ pattern = "*", demo = "", clean = false, empty = false }) =>
    sandbox({
      empty,
      pattern,
      demoPattern: demo,
      cleanSandboxes: clean,
    })
  );

createCommand("libsize")
  .option(
    "--no-umd",
    "Boolean if the UMD bundles should be ignored in the output."
  )
  .option(
    "--force-umd",
    "Force recompiles the umd bundles since the bundles are only built if none can be found."
  )
  .option(
    "--no-themes",
    "Boolean if the CSS bundles should be ignored in the output."
  )
  .option(
    "--force-themes",
    "Force recompiles the pre-compiled themes since these themes are only created if none can be found."
  )
  .option(
    "--stage-changes",
    "Boolean if any changes to the documentation pages due to libsize changes should be added to the git index."
  )
  .description(
    "Prints the gzpped size for the entire library based on the UMD bundles and the pre-compiled themes."
  )
  .action(
    ({
      umd = true,
      forceUmd = false,
      themes = true,
      forceThemes = false,
      stageChanges = false,
    }) =>
      libsize({
        umd,
        forceUmd,
        themes,
        forceThemes,
        stageChanges,
      }).then(() => {
        // .action only allows Promise<void> or void
      })
  );

createCommand("themes")
  .description(
    "Creates all the pre-compiled css themes in the root `/themes` folder. " +
      "This really shouldn't be run other than during the release script since`" +
      "the `/themes` folder is ignored by git until a release is tagged."
  )
  .action(() => themes());

createCommand("umd")
  .description(
    "Compiles the UMD bundles for `react-md`. This really shouldn't be used as it's handled by the `release` script automatically."
  )
  .action(() => umd());

createCommand("watch")
  .option(
    "--cjs",
    "Spin up a commonjs tsc watcher as well instead of only the ejs watcher."
  )
  .description(
    "A custom watch script that handles copying all changed scss files as well as starting tsc watchers."
  )
  .action(({ cjs = false }) => watch(cjs));

commander.parse(process.argv);
