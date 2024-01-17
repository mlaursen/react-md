import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import rawlist from "@inquirer/rawlist";
import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import { execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const isContinue1 = process.argv.includes("--c1");
const isPreRelease = process.argv.includes("--pre");
const isSkipBuild = isContinue1 || process.argv.includes("--skip-build");

const exec = (command: string): void => {
  console.log(command);
  execSync(command);
};

interface CreateReleaseOptions {
  body: string;
  version: string;
  prerelease: boolean;
}

async function createRelease(options: CreateReleaseOptions): Promise<void> {
  const { version, body, prerelease } = options;

  dotenv.config({ path: ".env.local" });
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/releases",
      {
        owner: "mlaursen",
        repo: "react-md",
        tag_name: `v${version}`,
        body,
        prerelease,
      }
    );

    console.log(`Created release: ${response.data.html_url}`);
  } catch (e) {
    console.error(e);

    console.log();
    console.log(
      "The npm token is most likely expired or never created. Update the `.env.local` to include the latest GITHUB_TOKEN"
    );
    console.log(
      "Regenerate the token: https://github.com/settings/tokens?type=beta"
    );
    if (
      !(await confirm({ message: "Try creating the Github release again?" }))
    ) {
      process.exit(1);
    }

    return createRelease(options);
  }
}

async function getCurrentChangeset(disableAuto?: boolean): Promise<string> {
  let changesetName = "";
  if (!disableAuto) {
    changesetName = execSync("git diff --name-only @{upstream} .changeset")
      .toString()
      .trim();
  }

  if (
    !changesetName ||
    !(await confirm({
      message: `Is "${changesetName}" the correct changeset path?`,
    }))
  ) {
    const changesetNames = await readdir(".changeset");
    changesetName = await rawlist({
      message: "Select the changeset path",
      choices: changesetNames.map((changeset) => ({
        value: changeset,
      })),
    });
  }

  return await readFile(changesetName, "utf8");
}

async function getReleaseVersion(): Promise<string> {
  const version = JSON.parse(
    await readFile(join("packages", "core", "package.json"), "utf8")
  ).version;

  if (
    await confirm({
      message: `Is "${version}" the current github release version?`,
    })
  ) {
    return version;
  }

  return await input({
    message: "Input the current release version for Github",
  });
}

if (!isSkipBuild) {
  exec("pnpm clean-dist");
  exec("pnpm build-packages");
}

if (isPreRelease) {
  exec("pnpm changeset pre enter next");
}

if (!isContinue1) {
  exec("pnpm changeset");
  exec("pnpm changeset version");
}

if (!(await confirm({ message: "Continue the release?" }))) {
  process.exit(1);
}

exec("git add -u");
exec("git add .changeset");

const changeset = await getCurrentChangeset();
const version = await getReleaseVersion();

exec('git commit -m "build(version): version packages"');
exec("pnpm changeset publish");
exec("git push --follow-tags");

await createRelease({
  body: changeset,
  version,
  prerelease: isPreRelease,
});
