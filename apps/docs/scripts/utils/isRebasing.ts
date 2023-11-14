import { execSync } from "node:child_process";

export function isRebasing(): boolean {
  return execSync("git status").toString().includes("rebase");
}
