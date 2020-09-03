import { execSync } from "child_process";
import log from "loglevel";
import prompts from "prompts";

import { projectRoot } from "./constants";
import fixChangelogs from "./fixChangelogs";
import prepublish from "./prepublish";
import git, { replaceTag, uncommittedFiles, ammendCommit } from "./utils/git";

export type ReleaseType =
  | "major"
  | "minor"
  | "patch"
  | "premajor"
  | "preminor"
  | "prepatch"
  | "prerelease"
  | "";

export const RELEASE_TYPES: ReadonlyArray<ReleaseType> = [
  "major",
  "minor",
  "patch",
  "premajor",
  "preminor",
  "prepatch",
  "prerelease",
];

export function toReleaseType(value: string): ReleaseType {
  if (RELEASE_TYPES.includes(value as ReleaseType)) {
    return value as ReleaseType;
  }

  return "";
}

const run = (command: string): void => {
  log.debug(command);
  execSync(command, {
    cwd: projectRoot,
    stdio: "inherit",
  });
};

export default async function release(
  type: ReleaseType = "",
  blog: boolean = !type.startsWith("pre")
): Promise<void> {
  // first, update the version since I'll be ammending this commit and tag with
  // libsize changes, prettier changelogs, and adding the themes specifically
  // for the tag only
  run(`npx lerna version ${type} --no-push --yes`);
  await fixChangelogs(false, true);

  // run a clean build to create all the dists
  await prepublish(false);

  // add the pre-compiled themes to git so they can be included in the tag, but
  // then remove them and ammend the commit with them removed so they aren't
  // added to the main branch.
  git("add -f themes");
  await replaceTag();

  if (blog) {
    const { blogged } = await prompts({
      type: "confirm",
      name: "blogged",
      message: "Has the blog been written?",
      initial: false,
    });

    if (!blogged) {
      process.exit(1);
    }

    if (uncommittedFiles()) {
      git("add -u");
      await replaceTag();
    }
  }

  let distTag = "";
  if (type.startsWith("pre")) {
    distTag = " --dist-tag next";
  }
  run(`npx lerna publish from-package${distTag} --yes`);

  git("rm -rf themes");
  ammendCommit();

  git("push origin master");
  git("push --tags");
}
