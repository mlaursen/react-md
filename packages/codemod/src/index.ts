#!/usr/bin/env node
import { Argument, Command, Option } from "commander";

import { migrate } from "./migrations/v5-to-v6.js";
import { getAvailableTransforms } from "./utils/getAvailableTransforms.js";
import { getFilesToTransform } from "./utils/getFilesToTransform.js";
import { getParser, parsers } from "./utils/getParser.js";
import { getTransformName } from "./utils/getTransformName.js";
import { runJscodeshift } from "./utils/runJscodeshift.js";
import { sassMigrator } from "./utils/sassMigrator.js";
import { type ProgramOptions } from "./utils/types.js";

const {
  transformNames,
  availableTransforms,
  versionedTransforms,
  getValidTransformFile,
} = getAvailableTransforms(import.meta.url);

const program = new Command().name("npx @react-md/codemod").description(
  `Run a codemod script to update to the latest version of ReactMD.

 Running this script without any options or commands will start an interactive wizard.
 `
);

interface ActionOptions extends ProgramOptions {
  files: string[];
  transform: string;
}

async function handleAction(options: ActionOptions): Promise<void> {
  const transform = await getTransformName({
    transform: options.transform,
    transformNames,
    versionedTransforms,
  });
  const files = await getFilesToTransform(options.files);
  const parser = await getParser(options.parser);

  runJscodeshift({
    ...options,
    files,
    parser,
    transform: getValidTransformFile(transform),
  });
}

program
  .command("sass-migrator")
  .option("-d, --dry", "Dry run (no changes are made to files)", false)
  .addArgument(
    new Argument("<version>", "The version of react-md to migrate to").choices([
      "v5-to-v6",
    ])
  )
  .argument(
    "[files...]",
    'An optional glob or folder path to transform (default: ".")'
  )
  .action((version, files, opts: Pick<ProgramOptions, "dry">) => {
    sassMigrator({
      dry: opts.dry,
      files,
      version,
    });
  });

program
  .command("migrate/v5-to-v6")
  .option("-d, --dry", "Dry run (no changes are made to files)", false)
  .option("-p, --print", "Print transformed files to your terminal", false)
  .option(
    "-a, --auto-confirm",
    "Run all the codemods without requiring a confirmation (only for full release migration scripts)",
    false
  )
  .addOption(
    new Option("--parser <parser>", "The file parser to use.")
      .choices([...parsers, ""])
      .default("")
  )
  .argument(
    "[files...]",
    'An optional glob or folder path to transform (default: ".")'
  )
  .action((files, opts: ProgramOptions) => {
    migrate({
      ...opts,
      files,
      transformNames,
      availableTransforms,
      versionedTransforms,
      getValidTransformFile,
    });
  });

availableTransforms.forEach((transformFile) => {
  const transform = transformFile.replace(/\.js$/, "");
  program
    .command(transform)
    .option("-d, --dry", "Dry run (no changes are made to files)", false)
    .option("-p, --print", "Print transformed files to your terminal", false)
    .option(
      "-a, --auto-confirm",
      "Run all the codemods without requiring a confirmation (only for full release migration scripts)",
      false
    )
    .addOption(
      new Option("--parser <parser>", "The file parser to use.")
        .choices([...parsers, ""])
        .default("")
    )
    .argument(
      "[files...]",
      'An optional glob or folder path to transform (default: ".")'
    )
    .action((files, opts: ProgramOptions) => {
      handleAction({
        ...opts,
        files,
        transform,
      });
    });
});

program.action(() => {
  handleAction({
    dry: false,
    print: false,
    parser: "",
    autoConfirm: false,
    files: [],
    transform: "",
  });
});

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    // eslint-disable-next-line no-console
    console.log("👋 until next time!");
  } else {
    throw error;
  }
});

program.parse(process.argv);
