import rehypeSlug from "rehype-slug";
import { type PluggableList } from "unified";

import { rehypeCodeBlocks } from "./rehype-code-blocks.js";
import { rehypeColorPreview } from "./rehype-color-preview.js";
import { rehypeKeyboardCode } from "./rehype-keyboard-code.js";
import { rehypeToc } from "./rehype-toc.js";

export const rehypePlugins: PluggableList = [
  rehypeSlug,
  rehypeToc,
  rehypeKeyboardCode,
  rehypeColorPreview,
  rehypeCodeBlocks,
];
