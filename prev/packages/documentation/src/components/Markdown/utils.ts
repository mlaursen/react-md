import {
  RMD_VERSION,
  GITHUB_URL,
  COMMIT_SHA,
  GITHUB_FILE_URL,
} from "constants/github";
import { PACKAGE_NAMES, SCSS_PACKAGES } from "constants/packages";

type Transformer = (markdown: string) => string;
const joinedNames = PACKAGE_NAMES.join("|");
const packagesList = `
${PACKAGE_NAMES.map(
  (name) => `- [@react-md/${name}](/packages/${name}/installation)`
).join("\n")}
`;
const sassdocPackageList = `
${SCSS_PACKAGES.map(
  (name) => `- [@react-md/${name} SassDoc](/packages/${name}/sassdoc)`
).join("\n")}
`;
const whitespace = "(?=\r?\n| |[^/])";

/**
 * Updates the markdown to quickly link to a specific package's demo or
 * installation page. The installation page will only be used if the package is
 * not demoable.
 *
 * @example
 *
 * ```
 * #package-name -> [@react-md/package-name](/packages/package-name/demos|installation)
 * ```
 */
export const packageQuickLink: Transformer = (md) =>
  md.replace(
    new RegExp(`(\\s|\\()#(${joinedNames})${whitespace}`, "g"),
    (_, char, pkg) => `${char}[@react-md/${pkg}](/packages/${pkg}/demos)`
  );

/**
 * Updates the markdown to quickly link to a specific package's documentation
 * page.
 *
 * @example
 *
 * ```
 * #package-name -> [package-name page](/packages/package-name/page)
 * ```
 */
export const packagePageQuickLink: Transformer = (md) =>
  md.replace(
    new RegExp(`#(${joinedNames})/(demos|api|sassdoc)`, "g"),
    "[$1 $2](/packages/$1/$2)"
  );

/**
 * Updates the markdown to list all the available packages by creating links to
 * all the demo or installation pages.
 *
 * @example
 *
 * ```
 * #packages -> markdown list for all react-md packages
 * ```
 */
export const listAllPackages: Transformer = (md) =>
  md.replace(/#packages(\/(demos|sassdoc))?/g, (_, subpath) => {
    if (subpath === "/demos") {
      return packagesList.replace(/\/installation/g, "/demos");
    }
    if (subpath === "/sassdoc") {
      return sassdocPackageList;
    }

    return packagesList;
  });

/**
 * Creates a quick link to customizing your theme. Not used too much.
 */
export const linkToCustomizingTheme: Transformer = (md) =>
  md.replace(
    /#customizing-your-theme/g,
    "[customizing your theme](/guides/customizing-your-theme)"
  );

/**
 * Updates the markdown to link to specific issues and pull requests within
 * GitHub. This will also try to make sure that hex color codes aren't updated
 * to GitHub links as well.
 *
 * @example
 *
 * ```
 * #1 > [#1](https://github.com/mlaursen/react-md/issues/1)
 * #713 -> [#713](https://github.com/mlaursen/react-md/issues/713)
 * ```
 */
export const linkToGithubIssues: Transformer = (md) =>
  md.replace(
    /(: )?(#)(\d+)(?=\r?\n| (?!!)|$)/g,
    (match, invalid, _hash, ticket) => {
      if (invalid) {
        return match;
      }

      return `[#${ticket}](${GITHUB_URL}/issues/${ticket})`;
    }
  );

/**
 * Updates the markdown to link to specific github commits if there is a 7 digit
 * sha in the markdown.
 *
 * @example
 *
 * ```
 * 034c7de -> [034c7de](https://github.com/mlaursen/react-md/commit/034c7de)
 * ```
 */
export const linkToGithubCommit: Transformer = (md) =>
  md.replace(/([^[])(\b[0-9a-f]{7}\b)/g, `$1[$2](${GITHUB_URL}/commit/$2)`);

/**
 * A _super_ important transformer that replaces emojis in the markdown if the
 * markdown did not use the emoji character.
 *
 * Currently only supports:
 *
 * ```
 * :tada: -> 🎉
 * ```
 */
export const replaceEmojis: Transformer = (md) => md.replace(/(:tada:)/g, "🎉");

export const replaceGeneratedConstants: Transformer = (md) =>
  md.replace(
    /{{(COMMIT_SHA|GITHUB_URL|GITHUB_FILE_URL|RMD_VERSION)}}/g,
    (_, type) => {
      switch (type) {
        case "COMMIT_SHA":
          return COMMIT_SHA;
        case "GITHUB_URL":
          return GITHUB_URL;
        case "GITHUB_FILE_URL":
          return GITHUB_FILE_URL;
        case "RMD_VERSION":
          return RMD_VERSION;
        default:
          throw new Error(`Unknown git replacement: ${type}`);
      }
    }
  );

const transforms: Transformer[] = [
  packageQuickLink,
  packagePageQuickLink,
  listAllPackages,
  linkToCustomizingTheme,
  linkToGithubIssues,
  linkToGithubCommit,
  replaceEmojis,
  replaceGeneratedConstants,
];

const transform = (markdown: string): string =>
  transforms.reduce((updated, fn) => fn(updated), markdown);

export function transformMarkdown(markdown: string): string {
  return transform(markdown);
}
