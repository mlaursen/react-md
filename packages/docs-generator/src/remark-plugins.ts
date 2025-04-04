import remarkFrontmatter, {
  type Options as RemarkFrontmatterOptions,
} from "remark-frontmatter";
import remarkGfm, { type Options as RemarkGFMOptions } from "remark-gfm";
import { type PluggableList } from "unified";

import {
  type RemarkMdxMetadataOptions,
  remarkMdxMetadata,
} from "./remark-mdx-metadata.js";

export interface CreateRemarkPluginsOptions {
  gfmOptions?: RemarkGFMOptions;
  frontmatterOptions?: RemarkFrontmatterOptions;
  mdxFrontmatterOptions?: RemarkMdxMetadataOptions;
}

export function createRemarkPlugins(
  options: CreateRemarkPluginsOptions = {}
): PluggableList {
  const { gfmOptions, frontmatterOptions, mdxFrontmatterOptions } = options;
  return [
    [remarkFrontmatter, frontmatterOptions],
    [remarkMdxMetadata, mdxFrontmatterOptions],
    [remarkGfm, gfmOptions],
  ];
}

export const remarkPlugins = createRemarkPlugins();
