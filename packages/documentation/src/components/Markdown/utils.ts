import Prism from "prismjs";
import * as marked from "marked";
import cn from "classnames";

import { GITHUB_URL, PACKAGE_NAMES } from "constants/index";

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
  const isNoMargin = text.includes("<!-- no-margin -->");
  const isForcedHeading = text.includes("<!-- force-heading -->");
  // replace comments since they will be slugged :/
  text = text.replace(/<!-- ([A-z]+(-[A-z]+)*) -->/g, "");

  const isValidHeading = isForcedHeading || (text.length <= 60 && !isNoMargin);
  // `'t` gets slugged as 39t
  const id = slugger.slug(text).replace(/39t/g, "t");
  const className = cn(`rmd-typography rmd-typography--headline-${level}`, {
    heading: isValidHeading,
    // eslint-disable-next-line @typescript-eslint/camelcase
    heading__toc: text.includes("Table of Contents"),
    "rmd-typography--no-margin": isNoMargin,
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
const packagesList = `
${PACKAGE_NAMES.map(
  name => `- [@react-md/${name}](/packages/${name}/installation)`
).join("\n")}
`;
const whitespace = "(?=\r?\n| |[^/])";

const transforms: Transform[] = [
  // #package-name -> [@react-md/package-name](/packages/package-name)
  md =>
    md.replace(
      new RegExp(`#(${joinedNames})${whitespace}`, "g"),
      "[@react-md/$1](/packages/$1)"
    ),
  // #package-name -> [package-name page](/packages/package-name/page)
  md =>
    md.replace(
      new RegExp(`#(${joinedNames})/(demos|api|sassdoc)`, "g"),
      "[$1 $2](/packages/$1/$2)"
    ),
  // #packages -> markdown list for all react-md packages
  md =>
    md.replace(/#packages(\/demos)?/g, (_, demos) => {
      if (demos) {
        return packagesList.replace(/installation/g, "demos");
      }

      return packagesList;
    }),
  // create links to github issues/PRs with #ISSUE_NUMBER
  // the regex below tries to make sure that hex codes aren't switched to links
  md =>
    md.replace(
      /(: )?(#)(\d+)(?=\r?\n| (?!!))/g,
      (match, invalid, _hash, ticket) => {
        if (invalid) {
          return match;
        }

        return `[#${ticket}](${GITHUB_URL}/issues/${ticket})`;
      }
    ),
  // create github commit links for git sha's of length 7 (should be first 7 of sha)
  md => md.replace(/(\b[0-9a-f]{7}\b)/g, `[$1](${GITHUB_URL}/commit/$1)`),
  md => md.replace(/(:tada:)/g, "🎉"),
];

renderer.image = (href, title, alt) => {
  return (
    `<a href="${href}">` +
    '<div class="rmd-media-container rmd-media-container--auto">' +
    `<img src="${href}" alt="${alt}" title="${title || alt}" />` +
    "</div>" +
    "</a>"
  );
};

renderer.list = (body, ordered) => {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="markdown__list">${body}</${tag}>`;
};

const transform = (markdown: string): string =>
  transforms.reduce((updated, fn) => fn(updated), markdown);

export function markdownToHTML(markdown: string): string {
  return marked.parse(transform(markdown), { renderer });
}
