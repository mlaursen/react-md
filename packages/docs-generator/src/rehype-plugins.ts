import rehypeSlug, { type Options as RehypeSlugOptions } from "rehype-slug";
import { type PluggableList } from "unified";

import {
  type RehypeCodeBlocksOptions,
  rehypeCodeBlocks,
} from "./rehype-code-blocks.js";
import { rehypeColorPreview } from "./rehype-color-preview.js";
import {
  type RehypeKeyboardCodeOptions,
  rehypeKeyboardCode,
} from "./rehype-keyboard-code.js";
import { type RehypeTocOptions, rehypeToc } from "./rehype-toc.js";

export interface CreateRehypePluginsOptions {
  tocOptions?: RehypeTocOptions;
  slugOptions?: RehypeSlugOptions;
  codeBlockOptions?: RehypeCodeBlocksOptions;
  keyboardCodeOptions?: RehypeKeyboardCodeOptions;
}

export function createRehypePlugins(
  options: CreateRehypePluginsOptions = {}
): PluggableList {
  const { tocOptions, slugOptions, codeBlockOptions, keyboardCodeOptions } =
    options;
  return [
    [rehypeSlug, slugOptions],
    [rehypeToc, tocOptions],
    [rehypeKeyboardCode, keyboardCodeOptions],
    rehypeColorPreview,
    [rehypeCodeBlocks, codeBlockOptions],
  ];
}

export const rehypePlugins = createRehypePlugins();
