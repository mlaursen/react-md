#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from "commander";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { applyOptions } from "./utils/applyOptions.js";
import { getAvailableTransforms } from "./utils/getAvailableTransforms.js";
import { getFilesToTransform } from "./utils/getFilesToTransform.js";
import { type Parser, getParser } from "./utils/getParser.js";
import { getTransformName } from "./utils/getTransformName.js";

const baseUrl = import.meta.url;
const jscodeshiftExecutable = fileURLToPath(
  import.meta.resolve("jscodeshift/bin/jscodeshift", baseUrl)
);

const {
  transformNames,
  availableTransforms,
  versionedTransforms,
  getValidTransformFile,
} = getAvailableTransforms(baseUrl);

const program = new Command().name("npx @react-md/codemod").description(
  `Run a codemod script to update to the latest version of ReactMD.

 Running this script without any options or commands will start an interactive wizard.
 `
);

interface ActionOptions {
  dry: boolean;
  print: boolean;
  files: string[];
  parser: Parser | "";
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

  const args: string[] = [];
  if (options.dry) {
    args.push("--dry");
  }

  if (options.print) {
    args.push("--print");
  }

  args.push("--verbose=2");
  args.push("--ignore-pattern=**/node_modules/**");

  args.push("--parser", parser);
  args.push(`--extensions=${parser === "tsx" ? "tsx,ts," : ""}jsx,js`);

  args.push("--transform", getValidTransformFile(transform));
  args.push(...files);

  // prefix with `node` because of a bug around: "env: node\r"
  const command = `node ${jscodeshiftExecutable} ${args.join(" ")}`;
  console.log(command);

  // react-codemod does it... so I'll ignore the security issue fo rnow.
  // https://github.com/reactjs/react-codemod/blob/b34b92a1f0b8ad333efe5effb50d17d46d66588b/bin/cli.js
  execSync(command, { stdio: "inherit" });
}

availableTransforms.forEach((transformFile) => {
  const transform = transformFile.replace(/\.js$/, "");
  applyOptions(
    program
      .command(transform)
      .argument(
        "[files...]",
        'An optional glob or folder path to transform (default: ".")'
      )
  ).action((files, { dry, print, parser }) => {
    handleAction({ files, dry, print, parser, transform });
  });
});

applyOptions(program).action(() => {
  handleAction({
    dry: false,
    print: false,
    parser: "",
    files: [],
    transform: "",
  });
});

program.parse(process.argv);
