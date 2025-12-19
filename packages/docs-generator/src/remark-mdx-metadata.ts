// https://github.com/remcohaszing/remark-mdx-frontmatter/blob/ab7eb0b099d863e0a6d21368052c5f90c1ea8516/src/remark-mdx-frontmatter.ts
import { valueToEstree } from "estree-util-value-to-estree";
import { type Root } from "mdast";
import { type Metadata } from "next";
import { define } from "unist-util-mdx-define";
import { type VFile } from "vfile";
import { parse } from "yaml";

import { assertString, assertStringArray } from "./utils/assertions.js";

function addKeywords(
  metadata: Metadata,
  keywords: unknown,
  type: string
): void {
  if (!keywords) {
    return;
  }

  assertStringArray(keywords, `${type} must be a string array.`);
  metadata.keywords ??= [];
  if (typeof metadata.keywords === "string") {
    metadata.keywords = [metadata.keywords];
  }

  metadata.keywords.push(...keywords);
}

export function getFilePathname(file: VFile): string {
  const startIndex = file.path.lastIndexOf(")");
  return file.path.slice(startIndex + 1, file.path.lastIndexOf("/"));
}

export interface RemarkMdxMetadataOptions extends define.Options {
  name?: string;
  baseUrl?: string;
}

export function remarkMdxMetadata(options: RemarkMdxMetadataOptions = {}) {
  const {
    name = "metadata",
    baseUrl = "https://react-md.dev",
    ...defineOptions
  } = options;

  return function mdxMetadata(ast: Root, file: VFile) {
    const node = ast.children.find((child) => child.type === "yaml");
    if (!node) {
      throw new Error(
        "All markdown pages must have frontmatter for metadata generation."
      );
    }
    const pathname = getFilePathname(file);
    const data: Record<string, unknown> = parse(node.value);
    const {
      title: baseTitle,
      group,
      alias,
      hooks,
      docType,
      docGroup,
      components,
      description,
      ...remaining
    } = data;

    const metadata: Metadata = remaining;

    assertString(baseTitle, "A title must be provided");
    const title = `${baseTitle} - react-md`;
    metadata.title = title;

    assertString(description, "A description must be provided");
    metadata.description = description;

    if (group) {
      assertString(group);
    }

    addKeywords(metadata, components, "components");
    addKeywords(metadata, hooks, "hooks");
    addKeywords(metadata, alias, "alias");
    if (docType) {
      assertString(docType);
      addKeywords(metadata, [docType], "docType");
    }

    if (docGroup) {
      assertString(docGroup);
      addKeywords(metadata, [docGroup], "docGroup");
    }

    metadata.openGraph ??= {
      url: `${baseUrl}${pathname}`,
      type: "website",
      title,
      description,
    };
    metadata.twitter ??= {
      card: "summary_large_image",
      title,
      description,
    };

    define(
      ast,
      file,
      { [name]: valueToEstree(metadata, { preserveReferences: true }) },
      defineOptions
    );
  };
}
