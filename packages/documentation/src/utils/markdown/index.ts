import * as marked from "marked";
import * as Prism from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-git";

export function getLanguage(s: string) {
  if (!s) {
    return "markup";
  } else if (s === "tsx") {
    return "typescript";
  } else if (s === "sh") {
    return "bash";
  } else if (s === "diff") {
    return "git";
  }

  return s;
}

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => Prism.highlight(code, Prism.languages[getLanguage(lang)]),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export interface IMarkdownOptions {
  showToolbar?: boolean;
  showLineNumbers?: boolean;
}

export type MarkdownTransformation = (markdown: string, options?: IMarkdownOptions) => string;
export type MarkdownTransformationList = MarkdownTransformation[];

const preTransforms: MarkdownTransformationList = [];
const postTransforms: MarkdownTransformationList = [
  markdown => markdown.replace(/<a href/g, '<a class="rmd-link" href'),
  markdown =>
    markdown.replace(
      /(<h2 id="table-of-contents")(>Table of Contents<\/h2>\r?\n<ul)/,
      (_, s1, s2) => `${s1} class="markdown-toc"${s2} class="markdown-toc__list"`
    ),
];

export function transform(markdown: string, transforms: MarkdownTransformation[], options?: IMarkdownOptions) {
  return transforms.reduce((s, t) => t(s, options), markdown);
}

export function markdownToHTML(markdown: string, options?: IMarkdownOptions) {
  return transform(marked.parse(transform(markdown, preTransforms, options)), postTransforms, options);
}
