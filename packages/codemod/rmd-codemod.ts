#!/usr/bin/env node

/* eslint-disable no-console */
import { execSync } from "child_process";
import { Command, Option } from "commander";
import { existsSync } from "fs";
import { globSync } from "glob";
import inquirer from "inquirer";
import { join } from "path";

const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
const transforms = globSync("**/*.js", {
  cwd: join(__dirname, "transforms"),
  ignore: ["**/__tests__/**", "**/__testfixtures__/**", "utils/**/*"],
}).map((transform) => transform.replace(".js", ""));

const parserOptions = [
  { name: "Javascript", value: "babel" },
  { name: "Typescript", value: "tsx" },
] as const;
const parsers = parserOptions.map(({ value }) => value);

type Parser = (typeof parsers)[number];

const program = new Command().name("npx @react-md/codemod").description(
  `Run a codemod script to update to the latest version of ReactMD.

Running this script without any options or commands will start an interactive wizard.
`
);

function getTransformFile(transformName: string): string {
  let transform = transformName;
  switch (transform) {
    case "v3-to-v4":
      transform = `${transform}/preset`;
      break;
  }

  const filePath = join(__dirname, "transforms", `${transform}.js`);
  if (!existsSync(filePath)) {
    console.error(`${transform} codemod does not exist`);
    console.error(`Choose one of:
${transforms.join("\n")}
`);
    process.exit(1);
  }

  return filePath;
}

interface Options {
  dry: boolean;
  print: boolean;
  files: string[];
  parser: Parser | "";
  transform: string;
}

interface Answers {
  files: string;
  parser: Parser;
  transform: string;
}

async function handleAction(options: Options): Promise<void> {
  const requiresFiles = !options.files.length;
  const answers = await inquirer.prompt<Answers>([
    {
      type: "list",
      name: "transform",
      message: "Which transform would you like to apply?",
      when: !options.transform,
      pageSize: transforms.length,
      choices: transforms,
    },
    {
      type: "input",
      name: "files",
      message: "On which files or directory should the codemods be applied?",
      default: ".",
      when: requiresFiles,
      filter: (files: string): string => files.trim(),
    },
    {
      type: "list",
      name: "parser",
      message: "Which dialect of JavaScript do you use?",
      default: "tsx",
      when: !options.parser,
      pageSize: parserOptions.length,
      choices: parserOptions,
    },
  ]);

  const filePatterns = requiresFiles ? [answers.files] : options.files;
  const files = [];
  for (const pattern of filePatterns) {
    if (pattern.includes("*")) {
      files.push(...globSync(pattern));
    } else {
      files.push(pattern);
    }
  }

  const args: string[] = [];
  if (options.dry) {
    args.push("--dry");
  }

  if (options.print) {
    args.push("--print");
  }

  args.push("--verbose=2");
  args.push("--ignore-pattern=**/node_modules/**");

  const parser: Parser = options.parser || answers.parser;
  args.push("--parser", parser);
  args.push(`--extensions=${parser === "tsx" ? "tsx,ts," : ""}jsx,js`);

  const transform: string = options.transform || answers.transform;
  args.push("--transform", getTransformFile(transform));
  args.push(...files);

  // prefix with `node` because of a bug around: "env: node\r"
  const command = `node ${jscodeshiftExecutable} ${args.join(" ")}`;
  console.log(command);
  // react-codemod does it... so I'll ignore the security issue fo rnow.
  // https://github.com/reactjs/react-codemod/blob/b34b92a1f0b8ad333efe5effb50d17d46d66588b/bin/cli.js
  execSync(command, { stdio: "inherit" });
}

transforms.forEach((transform) => {
  program
    .command(transform)
    .argument(
      "[files...]",
      'An optional glob or folder path to transform (default: ".")'
    )
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
    )
    .action((files, { dry, print, parser }) => {
      handleAction({ files, dry, print, parser, transform });
    });
});

program.action(() => {
  handleAction({
    dry: false,
    print: false,
    parser: "",
    files: [],
    transform: "",
  });
});

program.parse(process.argv);
