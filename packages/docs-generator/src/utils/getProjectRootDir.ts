import { execSync } from "node:child_process";

export function getProjectRootDir(): string {
  return execSync("git rev-parse --show-toplevel").toString().trim();
}
