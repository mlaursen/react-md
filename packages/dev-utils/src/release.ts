import log from "loglevel";
import prompts from "prompts";

import { changelogs } from "./changelogs";
import { clean } from "./clean";
import { libsize } from "./libsize";
import { ammendCommit, getLernaVersion, git, replaceTag, run } from "./utils";
import { variables } from "./variables";

export type ReleaseType =
  | "major"
  | "minor"
  | "patch"
  | "premajor"
  | "preminor"
  | "prepatch"
  | "prerelease"
  | "";

export const RELEASE_TYPES: readonly ReleaseType[] = [
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

async function rollback(): Promise<never> {
  log.error("Cancelling this release...");
  const version = await getLernaVersion();
  git(`reset HEAD^`);
  git(`tag -d v${version}`);
  git("checkout .");

  return process.exit(1);
}

async function verify(): Promise<void> {
  const { complete } = await prompts({
    type: "confirm",
    name: "complete",
    message: "Continue the release?",
    initial: false,
  });

  if (!complete) {
    await rollback();
  }

  log.info();
}

export async function release(
  type: ReleaseType = "",
  blog = !type.startsWith("pre"),
  autoYes = false
): Promise<void> {
  const yes = autoYes ? " --yes" : "";

  // first, update the version since I'll be ammending this commit and tag with
  // libsize changes, prettier changelogs, and adding the themes specifically
  // for the tag only
  run(`npx lerna version ${type} --no-push${yes}`);
  await changelogs();

  log.info("Cleaning all the old dists and `.tsbuildinfo` files...");
  await clean();

  log.info("Updating scssVariables files...");
  // ensure the latest `dist/scssVariables` have been created
  await variables();

  run("yarn build");
  await libsize({ umd: true, themes: true, stageChanges: true });

  // add the pre-compiled themes to git so they can be included in the tag, but
  // then remove them and ammend the commit with them removed so they aren't
  // added to the main branch.
  git("add -f themes");

  if (blog) {
    log.info("Update the blog...");
    await verify();
  }

  git("add -u");
  await replaceTag();

  let distTag = "";
  if (type.startsWith("pre")) {
    distTag = " --dist-tag next";
  }

  run(`npx lerna publish from-package${distTag}${yes}`);
  await verify();

  git("rm -rf themes");
  ammendCommit();

  git("push origin main");
  git("push --tags");
}
