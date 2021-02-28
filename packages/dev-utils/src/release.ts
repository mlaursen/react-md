import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import log from "loglevel";
import { join } from "path";
import prompts from "prompts";

import { changelogData } from "./changelogData";
import { clean } from "./clean";
import { projectRoot } from "./constants";
import { libsize } from "./libsize";
import {
  getLernaVersion,
  git,
  replaceTag,
  run,
  uncommittedFiles,
} from "./utils";
import { initBlog } from "./utils/initBlog";
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

interface Options {
  clean: boolean;
  type: ReleaseType;
  blog: boolean;
  autoYes: boolean;
}

export async function release({
  autoYes,
  blog,
  clean: enableClean,
  type,
}: Options): Promise<void> {
  const localDotEnv = join(projectRoot, ".env.local");
  dotenv.config({ path: localDotEnv });
  const { GITHUB_TOKEN } = process.env;
  if (!GITHUB_TOKEN) {
    log.error(
      `Missing a \`GITHUB_TOKEN\` environment variable. This should be located at:
- ${localDotEnv}

A token can be created at:
- https://github.com/settings/tokens/new?scopes=repo
`
    );

    process.exit(1);
  }
  const yes = autoYes ? " --yes" : "";

  if (enableClean) {
    log.info("Cleaning all the old dists and `.tsbuildinfo` files...");
    await clean();
  }

  log.info("Updating scssVariables files...");
  // ensure the latest `dist/scssVariables` have been created
  await variables();

  // have to run the build before updating the changelog data since it pulls
  // the variables from the react-md package
  run("yarn build");

  const updatedVariables = uncommittedFiles();
  if (updatedVariables) {
    git("stash");
  }

  await changelogData();
  run(`npx lerna version ${type} --no-push${yes}`);
  const changelog = await initBlog();

  const percentChanged = await libsize({
    umd: true,
    themes: true,
    // have to force the themes to be updated since they are always stored in
    // git now
    forceThemes: true,
    stageChanges: true,
  });

  git("add themes");
  if (updatedVariables) {
    git("stash pop");
  }

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

  git("push origin main");
  git("push --tags");

  log.info("Creating github release");
  const body = `${changelog}

### Library Size Changes

\`\`\`sh
${percentChanged}
\`\`\`
`;
  const version = await getLernaVersion();
  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const response = await octokit.request(
    "POST /repos/{owner}/{repo}/releases",
    {
      owner: "mlaursen",
      repo: "react-md",
      tag_name: `v${version}`,
      body,
      prerelease: type.startsWith("pre"),
    }
  );

  log.info(`Created release: ${response.data.html_url}`);
}
