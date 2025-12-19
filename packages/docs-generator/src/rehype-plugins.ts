import { type Root } from "hast";
import rehypeSlug, { type Options as RehypeSlugOptions } from "rehype-slug";
import { type TransformCallback } from "unified";
import { type VFile } from "vfile";

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

export default function createRehypePlugins(
  options: CreateRehypePluginsOptions = {}
) {
  const { tocOptions, slugOptions, codeBlockOptions, keyboardCodeOptions } =
    options;

  const slug = rehypeSlug(slugOptions);
  const toc = rehypeToc(tocOptions);
  const keyboardCode = rehypeKeyboardCode(keyboardCodeOptions);
  const colorPreview = rehypeColorPreview();
  const codeBlocks = rehypeCodeBlocks(codeBlockOptions);

  return async function docsRehypePlugins(
    tree: Root,
    file: VFile,
    callback: TransformCallback
  ): Promise<void> {
    slug(tree);
    toc(tree, file);
    keyboardCode(tree);
    colorPreview(tree);

    await codeBlocks(tree, file);
    callback(undefined, tree, file);
  };
}
