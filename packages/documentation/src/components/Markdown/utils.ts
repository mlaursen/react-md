import Prism from "prismjs";
import marked from "marked";
import cn from "classnames";

import {
  RMD_VERSION,
  GITHUB_URL,
  COMMIT_SHA,
  GITHUB_FILE_URL,
} from "constants/github";
import { PACKAGE_NAMES, SCSS_PACKAGES } from "constants/packages";

import styles from "./Markdown.module.scss";

export function getLanguage(language: string): string {
  switch (language) {
    case "":
    case "markdown":
      return "markup";
    case "sh":
      return "shell";
    default:
      return language;
  }
}

export function highlightCode(code: string, lang: string = ""): string {
  const language = getLanguage(lang);
  try {
    return Prism.highlight(code, Prism.languages[language], language);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      /* eslint-disable no-console */
      console.error(
        `Error trying to parse code with the following language: '${lang}' as '${language}'`
      );
      console.error(e);
    }

    return "";
  }
}

const NO_MARGIN_COMMENT = "<!-- no-margin -->";
const NO_MARGIN_BOTTOM_COMMENT = "<!-- no-margin-bottom -->";
const FORCE_HEADING_COMMENT = "<!-- force-heading -->";
const removeComments = (text: string): string =>
  text.replace(/<!-- ([A-z]+(-[A-z]+)*) -->/g, "");

/**
 * The custom markdown renderer. This just adds some additional styles to
 * existing elements, and does some fun stuff with code blocks.
 */
const renderer = new marked.Renderer();

renderer.code = (rawCode, language) => {
  language = getLanguage(language || "");
  const code = highlightCode(rawCode, language);
  const lines = (rawCode.match(/\r?\n/g) || []).length + 1;
  let lineNumbers = "";
  if (lines > 3 && !/markup|shell/.test(language) && language) {
    lineNumbers = Array.from({ length: lines })
      .map((_, i) => `<span class="code__line-number">${i + 1}</span>`)
      .join("");
    lineNumbers = `<span class="code__lines">${lineNumbers}</span>`;
  }

  const className = cn(
    "code code--block",
    {
      "code--counted": lineNumbers,
    },
    `language-${language}`
  );
  return `<pre class="${className}">${lineNumbers}<code class="code">${code}</code></pre>`;
};

renderer.codespan = (code) => `<code class="code code--inline">${code}</code>`;

renderer.heading = (text, level, _raw, slugger) => {
  // if it is over 60 characters, it is probably not really a title
  const isNoMargin = text.includes(NO_MARGIN_COMMENT);
  const isNoMarginBottom = text.includes(NO_MARGIN_BOTTOM_COMMENT);
  const isForcedHeading = text.includes(FORCE_HEADING_COMMENT);
  // replace comments since they will be slugged :/
  text = removeComments(text);

  const isValidHeading = isForcedHeading || (text.length <= 60 && !isNoMargin);
  // `'t` gets slugged as 39t
  const id = slugger.slug(text.replace("🎉", "")).replace(/39t/g, "t");
  const className = cn(`rmd-typography rmd-typography--headline-${level}`, {
    heading: isValidHeading,
    heading__toc: text.includes("Table of Contents"),
    "rmd-typography--no-margin": isNoMargin,
    "rmd-typography--no-margin-bottom": isNoMarginBottom,
  });

  return `<h${level} id="${id}" class="${className}">
  ${isValidHeading ? `<a href="#${id}" class="heading__link">#</a>` : ""}
  ${text}
</h${level}>`;
};

renderer.blockquote = (quote) =>
  `<blockquote class="blockquote">${quote}</blockquote>`;

renderer.link = (href, title, text) => {
  title = title ? ` title="${title}"` : "";

  return `<a class="rmd-link" href="${href}"${title}>${text}</a>`;
};

renderer.paragraph = (text: string) =>
  `<p class="${styles.p}">${removeComments(text)}</p>`;

renderer.image = (href, title, alt) => {
  let content = `<img src="${href}" alt="${alt}" title="${title || alt}" />`;
  if (href?.endsWith(".mp4")) {
    content =
      "<video autoplay loop muted>" +
      `<source src="${href}" type="video/mp4">${title || alt}` +
      "</video>";
  }

  return (
    `<a href="${href}">` +
    '<div class="rmd-media-container rmd-media-container--auto">' +
    `${content}</div>` +
    "</a>"
  );
};

renderer.list = (body, ordered) => {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="${styles.list}">${body}</${tag}>`;
};

renderer.hr = () => '<hr class="rmd-divider">';

// ///////////////////////////////////////////////////
// MARKDOWN TRANSFORMATIONS

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
 * Example:
 * #package-name -> [@react-md/package-name](/packages/package-name/demos|installation)
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
 * Example:
 * #package-name -> [package-name page](/packages/package-name/page)
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
 * Example:
 * #packages -> markdown list for all react-md packages
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
 * Examples:
 * #1 > [#1](https://github.com/mlaursen/react-md/issues/1)
 * #713 -> [#713](https://github.com/mlaursen/react-md/issues/713)
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
 * Example:
 * 034c7de -> [034c7de](https://github.com/mlaursen/react-md/commit/034c7de)
 */
export const linkToGithubCommit: Transformer = (md) =>
  md.replace(/(\b[0-9a-f]{7}\b)/g, `[$1](${GITHUB_URL}/commit/$1)`);

/**
 * A _super_ important transformer that replaces emojis in the markdown if the
 * markdown did not use the emoji character.
 *
 * Currently only supports:
 * :tada: -> 🎉
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

export function markdownToHTML(markdown: string): string {
  return marked.parse(transform(markdown), { renderer });
}
