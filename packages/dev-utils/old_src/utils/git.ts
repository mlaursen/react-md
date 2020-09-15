import { execSync } from "child_process";
import log from "loglevel";

import { projectRoot } from "../constants";
import getLernaVersion from "./getLernaVersion";

export default function git(command: string): string {
  log.info(`git ${command}`);
  return execSync(`git ${command}`, {
    cwd: projectRoot,
    stdio: "pipe",
  })
    .toString()
    .trim();
}

export function uncommittedFiles(): boolean {
  return !!git("status --porcelain");
}

export function ammendCommit(): void {
  git("commit --amend --no-edit");
}

export async function replaceTag(): Promise<void> {
  ammendCommit();

  const version = await getLernaVersion();
  const isTagged = !!git(`tag --list 'v${version}'`);
  if (isTagged) {
    git(`tag -d v${version}`);
    git(`tag -a v${version} -m "v${version}"`);
  }
}
