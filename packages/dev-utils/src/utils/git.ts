import { execSync } from "child_process";
import log from "loglevel";
import { join } from "path";

import { projectRoot } from "../constants";

export default function git(command: string): string {
  log.debug(`git ${command}`);
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

  const { version } = await import(join(projectRoot, "lerna.json"));
  const isTagged = !!git(`tag --list 'v${version}'`);
  if (isTagged) {
    git(`tag -d v${version}`);
    git(`tag -a v${version} -m "v${version}"`);
  }
}
