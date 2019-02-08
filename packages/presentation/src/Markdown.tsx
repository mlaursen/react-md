import React, { FunctionComponent, useState, useRef } from "react";
import marked from "marked";
import Prism from "prismjs";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-git";

import "./markdown.scss";

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
  highlight: (code, lang) =>
    Prism.highlight(code, Prism.languages[getLanguage(lang)]),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  headerIds: true,
});

export interface IMarkdownOptions {
  showToolbar?: boolean;
  showLineNumbers?: boolean;
}

export type MarkdownTransformation = (
  markdown: string,
  options?: IMarkdownOptions
) => string;
export type MarkdownTransformationList = MarkdownTransformation[];

const preTransforms: MarkdownTransformationList = [];
const postTransforms: MarkdownTransformationList = [
  markdown => markdown.replace(/<a href/g, '<a class="rmd-link" href'),
  markdown =>
    markdown.replace(
      /(<h2 id="table-of-contents")(>Table of Contents<\/h2>\r?\n<ul)/,
      (_, s1, s2) =>
        `${s1} class="markdown-toc"${s2} class="markdown-toc__list"`
    ),
  markdown =>
    markdown.replace(
      /yarn add/g,
      '<span class="token function">yarn</span> <span class="token function">add</span>'
    ),
];

function transform(
  markdown: string,
  transforms: MarkdownTransformation[],
  options?: IMarkdownOptions
) {
  return transforms.reduce((s, t) => t(s, options), markdown);
}

function markdownToHTML(markdown: string, options?: IMarkdownOptions) {
  return transform(
    marked.parse(transform(markdown, preTransforms, options)),
    postTransforms,
    options
  );
}

export interface IMarkdownProps {
  markdown: string;
}

const Markdown: FunctionComponent<IMarkdownProps> = ({ markdown }) => {
  const [html, setHtml] = useState(() => markdownToHTML(markdown));
  const prevMarkdown = useRef(markdown);
  if (prevMarkdown.current !== markdown) {
    prevMarkdown.current = markdown;
    setHtml(markdownToHTML(markdown));
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="markdown-container"
    />
  );
};

export default Markdown;
