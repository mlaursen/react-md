#!/usr/bin/env node
import { Command, Option } from "commander";

import { migrate } from "./migrations/v5-to-v6.js";
import { getAvailableTransforms } from "./utils/getAvailableTransforms.js";
import { getFilesToTransform } from "./utils/getFilesToTransform.js";
import { getParser, parsers } from "./utils/getParser.js";
import { getTransformName } from "./utils/getTransformName.js";
import { runJscodeshift } from "./utils/runJscodeshift.js";
import { type ProgramOptions } from "./utils/types.js";

const {
  transformNames,
  availableTransforms,
  versionedTransforms,
  getValidTransformFile,
} = getAvailableTransforms(import.meta.url);

const program = new Command()
  .name("npx @react-md/codemod")
  .description(
    `Run a codemod script to update to the latest version of ReactMD.

 Running this script without any options or commands will start an interactive wizard.
 `
  )
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
  .command("migrate/v5-to-v6")
  .argument(
    "[files...]",
    'An optional glob or folder path to transform (default: ".")'
  )
  .action((files) => {
    const { dry, print, parser, autoConfirm } = program.opts<ProgramOptions>();
    migrate({
      dry,
      print,
      parser,
      files,
      autoConfirm,
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
    .argument(
      "[files...]",
      'An optional glob or folder path to transform (default: ".")'
    )
    .action((files) => {
      const { dry, print, parser, autoConfirm } =
        program.opts<ProgramOptions>();

      handleAction({
        files,
        dry,
        print,
        parser,
        transform,
        autoConfirm,
      });
    });
});

program.action(() => {
  const { dry, print, parser, autoConfirm } = program.opts<ProgramOptions>();
  handleAction({
    dry,
    print,
    parser,
    files: [],
    transform: "",
    autoConfirm,
  });
});

program.parse(process.argv);
