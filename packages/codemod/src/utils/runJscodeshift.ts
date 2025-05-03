import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { type ProgramOptions } from "./types.js";

const jscodeshiftExecutable = fileURLToPath(
  import.meta.resolve("jscodeshift/bin/jscodeshift", import.meta.url)
);

export interface RunJSCodeshiftOptions
  extends Omit<ProgramOptions, "autoConfirm"> {
  files: readonly string[];
  transform: string;
}

export function runJscodeshift({
  dry,
  print,
  parser,
  files,
  transform,
}: RunJSCodeshiftOptions): void {
  const args: string[] = [];
  if (dry) {
    args.push("--dry");
  }

  if (print) {
    args.push("--print");
  }

  args.push("--verbose=2");
  args.push("--ignore-pattern=**/node_modules/**");

  args.push("--parser", parser);
  args.push(`--extensions=${parser === "tsx" ? "tsx,ts," : ""}jsx,js`);

  args.push("--transform", transform);
  args.push(...files);

  // prefix with `node` because of a bug around: "env: node\r"
  const command = `node ${jscodeshiftExecutable} ${args.join(" ")}`;
  // eslint-disable-next-line no-console
  console.log(command);

  // react-codemod does it... so I'll ignore the security issue fo rnow.
  // https://github.com/reactjs/react-codemod/blob/b34b92a1f0b8ad333efe5effb50d17d46d66588b/bin/cli.js
  execSync(command, { stdio: "inherit" });
}
