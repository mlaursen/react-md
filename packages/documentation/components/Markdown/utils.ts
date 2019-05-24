import cn from "classnames";
import * as marked from "marked";
import Prism from "prismjs";

import {
  GITHUB_URL,
  PACKAGE_NAMES,
  PACKAGES_RECORD,
  VERSION,
} from "constants/index";

export function getLanguage(language: string) {
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

export function highlightCode(code: string, lang: string = "") {
  const language = getLanguage(lang);
  try {
    return Prism.highlight(code, Prism.languages[language], language);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Error trying to parse code with the following language: '${lang}' as '${language}'`
      );
      console.error(e);
    }

    return "";
  }
}

/**
 * The custom markdown renderer. This just adds some additional styles to
 * existing elements, and does some fun stuff with code blocks.
 */
const renderer = new marked.Renderer();

renderer.code = (rawCode, language) => {
  language = getLanguage(language);
  const code = highlightCode(rawCode, language);
  const lines = (rawCode.match(/\r?\n/g) || []).length + 1;
  let lineNumbers = "";
  if (lines > 3 && !/markup|shell/.test(language) && language) {
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
    `language-${language}`
  );
  return `<pre class="${className}">${lineNumbers}<code class="code">${code}</code></pre>`;
};

renderer.codespan = code => `<code class="code code--inline">${code}</code>`;

renderer.heading = (text, level, _raw, slugger) => {
  // if it is over 60 characters, it is probably not really a title
  const isValidHeading = text.length <= 60;
  const id = slugger.slug(text);
  const className = cn(`rmd-typography rmd-typography--headline-${level}`, {
    heading: isValidHeading,
    heading__toc: text.includes("Table of Contents"),
    "rmd-typography--no-margin": text.includes("<!-- no-margin -->"),
  });

  return `<h${level} id="${id}" class="${className}">
  ${isValidHeading ? `<a href="#${id}" class="heading__link">#</a>` : ""}
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
const whitespace = "(?=\r?\n| |.)";

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
  // #defining-a-theme -> [defining a theme](/packages/theme/installation#defining-a-theme)
  md =>
    md.replace(
      /#defining-a-theme/g,
      "[defining a theme](/packages/theme/installation#defining-a-theme)"
    ),
  // create links to github issues/PRs with #ISSUE_NUMBER
  // the regex below tries to make sure that hex codes aren't switched to links
  md =>
    md.replace(/(#)(\d+)(?=\r?\n| (?!!))/g, `[$1$2](${GITHUB_URL}/issues/$2)`),
  // create github commit links for git sha's of length 7 (should be first 7 of sha)
  md => md.replace(/(\b[0-9a-f]{7}\b)/g, `[$1](${GITHUB_URL}/commit/$1)`),
];

const transform = (markdown: string) =>
  transforms.reduce((updated, fn) => fn(updated), markdown);

export function markdownToHTML(markdown: string) {
  return marked.parse(transform(markdown), { renderer });
}
