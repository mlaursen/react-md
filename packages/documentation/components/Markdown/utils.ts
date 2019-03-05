import cn from "classnames";
import * as marked from "marked";
import * as Prism from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-git";

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

  return `<h${level} id="${id}" class="rmd-typography rmd-typography--headline-${level} heading">
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

export function markdownToHTML(markdown: string) {
  return marked.parse(
    markdown.replace(/{{CURRENT_VERSION}}/g, "2.0.0-alpha.0"),
    { renderer }
  );
}
