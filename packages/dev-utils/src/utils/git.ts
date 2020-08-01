import { execSync } from "child_process";

import { projectRoot } from "../constants";

export default function git(command: string): string {
  return execSync(`git ${command}`, {
    cwd: projectRoot,
    stdio: "pipe",
  })
    .toString()
    .trim();
}
