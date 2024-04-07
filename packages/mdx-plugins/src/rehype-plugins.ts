import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";
import { type PluggableList } from "unified";
import { rehypeColorPreview } from "./rehype-color-preview.js";
import { rehypeKeyboardCode } from "./rehype-keyboard-code.js";
import { rehypeToc } from "./rehype-toc.js";

export const rehypePlugins: PluggableList = [
  rehypeSlug,
  rehypeToc,
  rehypeKeyboardCode,
  rehypeColorPreview,
  rehypeMdxCodeProps,
];
