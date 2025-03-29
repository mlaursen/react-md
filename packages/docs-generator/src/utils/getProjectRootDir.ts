import { execSync } from "node:child_process";

let rootDir = "";

export function getProjectRootDir(): string {
  if (!rootDir) {
    rootDir = execSync("git rev-parse --show-toplevel").toString().trim();
  }

  return rootDir;
}
