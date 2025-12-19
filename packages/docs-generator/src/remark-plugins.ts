import { type Root } from "mdast";
import remarkFrontmatter, {
  type Options as RemarkFrontmatterOptions,
} from "remark-frontmatter";
import remarkGfm, { type Options as RemarkGFMOptions } from "remark-gfm";
import { type Processor } from "unified";
import { type VFile } from "vfile";

import {
  type RemarkMdxMetadataOptions,
  remarkMdxMetadata,
} from "./remark-mdx-metadata.js";

export interface CreateRemarkPluginsOptions {
  gfmOptions?: RemarkGFMOptions;
  frontmatterOptions?: RemarkFrontmatterOptions;
  mdxFrontmatterOptions?: RemarkMdxMetadataOptions;
}

export default function createRemarkPlugins(
  this: Processor,
  options: CreateRemarkPluginsOptions = {}
) {
  const { gfmOptions, frontmatterOptions, mdxFrontmatterOptions } = options;

  remarkFrontmatter.call(this, frontmatterOptions);
  remarkGfm.call(this, gfmOptions);
  const mdxMetadata = remarkMdxMetadata(mdxFrontmatterOptions);

  return function remarkPlugins(tree: Root, file: VFile) {
    mdxMetadata(tree, file);
  };
}
