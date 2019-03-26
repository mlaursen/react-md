import cn from "classnames";
import * as marked from "marked";
import hljs from "highlight.js";

import "highlight.js/styles/solarized-dark.css";

import {
  GITHUB_URL,
  PACKAGE_NAMES,
  PACKAGES_RECORD,
  VERSION,
} from "constants/index";

function getLangauge(language: string) {
  switch (language) {
    case "":
      return "markdown";
    default:
      return language;
  }
}

export function highlightCode(code: string, lang: string = "") {
  return hljs.highlight(getLangauge(lang), code).value;
}

if (typeof document !== "undefined") {
  hljs.initHighlightingOnLoad();
}

/**
 * The custom markdown renderer. This just adds some additional styles to
 * existing elements, and does some fun stuff with code blocks.
 */
const renderer = new marked.Renderer();

renderer.code = (rawCode, language, escaped) => {
  const code = highlightCode(rawCode, language);
  const lines = (rawCode.match(/\r?\n/g) || []).length + 1;
  let lineNumbers = "";
  if (lines > 3 && !/markup/.test(language) && language) {
    lineNumbers = Array.from(new Array(lines))
      .map((_, i) => `<span class="code__line-number">${i + 1}</span>`)
      .join("");
    lineNumbers = `<span class="code__lines">${lineNumbers}</span>`;
  }

  const className = cn("code code--block", {
    "code--counted": lineNumbers,
  });
  return `<pre class="${className}">${lineNumbers}<code class="code">${code}</code></pre>`;
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
  // #package-name -> [package-name page](/packages/package-name/page)
  md =>
    md.replace(
      new RegExp(`#(${joinedNames})\/(demos|api|sassdoc)`, "g"),
      "[$1 $2](/packages/$1/$2)"
    ),
  // #including-styles -> [including styles](/getting-started/installation#including-styles)
  md =>
    md.replace(
      /#including-styles(?![)-])/g,
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
