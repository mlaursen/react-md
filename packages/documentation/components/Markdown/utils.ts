import cn from "classnames";
import * as marked from "marked";
import * as Prism from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-git";

import {
  GITHUB_URL,
  PACKAGE_NAMES,
  PACKAGES_RECORD,
  VERSION,
} from "constants/index";

/**
 * Gets one of the prismjs languages from a markdown language.
 */
export function getPrismLanguage(language: string) {
  switch (language) {
    case "tsx":
      return "typescript";
    case "sh":
      return "bash";
    case "diff":
      return "git";
    default:
      return language || "markup";
  }
}

export function highlightCode(code: string, language: string) {
  return Prism.highlight(code, Prism.languages[getPrismLanguage(language)]);
}

/**
 * The custom markdown renderer. This just adds some additional styles to
 * existing elements, and does some fun stuff with code blocks.
 */
const renderer = new marked.Renderer();

renderer.code = (rawCode, language, escaped) => {
  const lang = `language-${language}`;
  const code = highlightCode(rawCode, language);
  const lines = (rawCode.match(/\r?\n/g) || []).length + 1;
  let lineNumbers = "";
  if (lines > 3) {
    lineNumbers = Array.from(new Array(lines))
      .map((_, i) => `<span class="code__line-number">${i + 1}</span>`)
      .join("");
    lineNumbers = `<span class="code__lines">${lineNumbers}</span>`;
  }

  const className = cn(
    "code code--block",
    {
      "code--counted": lineNumbers,
    },
    lang
  );
  return `<pre class="${className}">${lineNumbers}<code class="code ${lang}">${code}</code></pre>`;
};

renderer.codespan = code => `<code class="code code--inline">${code}</code>`;

renderer.heading = (text, level, raw, slugger) => {
  const id = slugger.slug(text);
  const className = cn(
    `rmd-typography rmd-typography--headline-${level} heading`,
    {
      heading__toc: text.includes("Table of Contents"),
    }
  );

  return `<h${level} id="${id}" class="${className}">
  <a href="#${id}" class="heading__link">#</a>
  ${text}
</h${level}>`;
};

renderer.blockquote = quote =>
  `<blockquote class="blockquote">${quote}</blockquote>`;

renderer.link = (href, title, text) => {
  title = title ? ` title="${title}"` : "";

  return `<a class="rmd-link" href="${href}"${title}>${text}</a>`;
};

renderer.paragraph = (text: string) => `<p class="markdown__p">${text}</p>`;

// ///////////////////////////////////////////////////
// MARKDOWN TRANSFORMATIONS

type Transform = (markdown: string) => string;
const joinedNames = PACKAGE_NAMES.join("|");
const allNames = `${joinedNames}|react-md`;
const whitespace = "(?=\r?\n| )";

const getVersion = (name: string) => {
  let version = VERSION;
  if (name !== "react-md") {
    const lookup = `@react-md/${name}`;
    version = PACKAGES_RECORD[lookup] || VERSION;
  }
  return version;
};

const transforms: Transform[] = [
  // package-name@ -> package-name@version
  md =>
    md.replace(
      new RegExp(`(${allNames})@`, "g"),
      (_, lookup) => `${lookup}@${getVersion(lookup)}`
    ),
  // @package-name -> version
  md =>
    md.replace(new RegExp(`@(${allNames})${whitespace}`, "g"), (_, lookup) =>
      getVersion(lookup)
    ),
  // #package-name -> [@react-md/package-name](/packages/package-name)
  md =>
    md.replace(
      new RegExp(`#(${joinedNames})${whitespace}`, "g"),
      "[@react-md/$1](/packages/$1)"
    ),
  // #including-styles -> [including styles](/getting-started/installation#including-styles)
  md =>
    md.replace(
      /(!=\()#including-styles/g,
      "[including styles](/getting-started/installation#including-styles)"
    ),
  md => md.replace(/(#)(\d+)/g, `[$1$2](${GITHUB_URL}/issues/$2)`),
  md => md.replace(/(\b[0-9a-f]{7}\b)/g, `[$1](${GITHUB_URL}/commit/$1)`),
];

const transform = (markdown: string) =>
  transforms.reduce((updated, fn) => fn(updated), markdown);

export function markdownToHTML(markdown: string) {
  return marked.parse(transform(markdown), { renderer });
}
