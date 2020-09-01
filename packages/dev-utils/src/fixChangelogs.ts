import { readFile, writeFile } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { projectRoot } from "./constants";
import indexer from "./indexer";
import getPackages from "./utils/getPackages";
import git from "./utils/git";
import glob from "./utils/glob";

type Transformer = (changelog: string, isRoot: boolean) => string;

const BANNER = `# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

`;

const removeDuplicatedBanners: Transformer = (changelog) =>
  `${BANNER}${changelog.split(BANNER).join("")}`;

const linkToPackages: Transformer = (contents, isRoot) =>
  contents.replace(
    /(@react-md\/\w+(-\w+)*)(\s)/g,
    (match, pkg, _repeating, trailingCharacter) => {
      if (trailingCharacter === "]") {
        return match;
      }

      const pkgName = pkg.replace("@react-md/", "");
      const relativePath = isRoot ? "./packages/" : "../";
      return `[${pkg}](${relativePath}${pkgName})${trailingCharacter}`;
    }
  );

let SCOPED_PACKAGE_REGEX: RegExp;
const scopedLinkToPackages: Transformer = (contents, isRoot) => {
  if (!SCOPED_PACKAGE_REGEX) {
    const packageNames = getPackages();
    SCOPED_PACKAGE_REGEX = new RegExp(
      `[*]{2}(${packageNames.join("|")}):[*]{2}`,
      "g"
    );
  }
  return contents.replace(SCOPED_PACKAGE_REGEX, (_, packageName) => {
    const relativePath = isRoot ? "./packages/" : "../";
    return `[@react-md/${packageName}](${relativePath}${packageName}):`;
  });
};

// TODO: Look into a way to programmatically determine all the react-md exports
// so they can be tokenized
const TOKENS = [
  "Checkbox",
  "Radio",
  "ListItem",
  "Tree",
  "AutoComplete",
  "Select",
  "TextField",
  "TextArea",
  "Layout",
  "sideEffects",
  "useCSSTransition",
  "dist/scssVariables",
  "README",
  "package.json",
];
const CODE_TOKENS_REGEXP = new RegExp(`(${TOKENS.join("|")})(?=\\s)`, "g");
const codeTokens: Transformer = (changelog) =>
  changelog.replace(CODE_TOKENS_REGEXP, "`$1`");

const transforms: readonly Transformer[] = [
  removeDuplicatedBanners,
  linkToPackages,
  scopedLinkToPackages,
  codeTokens,
];

const transform = (changelog: string, isRoot: boolean): string =>
  transforms.reduce((updated, fn) => fn(updated, isRoot), changelog);

const CHANGELOG_FILES =
  "CHANGELOG.md packages/*/CHANGELOG.md packages/documentation/src/constants/meta";

export default async function fixChangelogs(amend: boolean): Promise<void> {
  log.info("Finding and formatting changelogs...");
  const packagesChangelogs = await glob("packages/*/CHANGELOG.md");
  const changelogPaths = ["CHANGELOG.md", ...packagesChangelogs];

  await Promise.all(
    changelogPaths.map(async (pathname) => {
      const contents = await readFile(pathname, "utf8");
      const isRoot = pathname === "CHANGELOG.md";

      return writeFile(pathname, transform(contents, isRoot));
    })
  );

  await indexer();

  if (amend && git(`diff ${CHANGELOG_FILES}`)) {
    git(`add ${CHANGELOG_FILES}`);
    git("commit --amend --no-edit");

    const { version } = await import(join(projectRoot, "lerna.json"));
    const isTagged = !!git(`tag --list 'v${version}'`);
    if (isTagged) {
      git(`tag -d v${version}`);
      git(`tag v${version} -a "v${version}"`);
    }
  }
}
