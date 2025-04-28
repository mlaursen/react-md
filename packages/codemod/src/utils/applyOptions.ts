import { type Command, Option } from "commander";

import { parsers } from "./getParser.js";

export function applyOptions(program: Command): Command {
  return program
    .option("-d, --dry", "Dry run (no changes are made to files)", false)
    .option("-p, --print", "Print transformed files to your terminal", false)
    .addOption(
      new Option("--parser <parser>", "The file parser to use.")
        .choices([...parsers, ""])
        .default("")
    )
    .addOption(
      new Option(
        "--jscodeshift <jscodeshift>",
        "(Advanced) Pass options directly to jscodeshift"
      ).default("")
    );
}
