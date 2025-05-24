import GithubSlugger from "github-slugger";
import grayMatter from "gray-matter";
import { type Heading } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { toString } from "mdast-util-to-string";
import { mdxjs } from "micromark-extension-mdxjs";
import { readFile } from "node:fs/promises";
import { visit } from "unist-util-visit";

import { assertString, assertStringArray } from "../../utils/assertions.js";
import { type HeadingWithDescription, type IndexedPage } from "./types.js";

const SKIP_HEADING_REGEXP = /\r?\n/;
const SKIP_HEADINGS_REGEXP = /\/migration\//;
const API_DOCS_SKIPPED_HEADINGS = [
  "Example Usage",
  "Parameters",
  "Returns",
  "See Also",
];

const getFilePathname = (mdxFilePath: string): string => {
  const startIndex = mdxFilePath.lastIndexOf(")");
  return mdxFilePath.substring(startIndex + 1, mdxFilePath.lastIndexOf("/"));
};

interface IsHeadingSkippedOptions {
  node: Heading;
  title: string;
  heading: string;
  mdxFilePath: string;
}

const isHeadingSkipped = (options: IsHeadingSkippedOptions): boolean => {
  const { node, title, heading, mdxFilePath } = options;
  return (
    heading === title ||
    SKIP_HEADING_REGEXP.test(heading) ||
    (/\/(hooks|utils)\//.test(mdxFilePath) &&
      API_DOCS_SKIPPED_HEADINGS.includes(heading)) ||
    (/\/sassdoc\//.test(mdxFilePath) && node.depth > 2)
  );
};

export interface ParseMdxOptions {
  baseUrl?: string;
  mdxFilePath: string;
}

export async function parseMdx(options: ParseMdxOptions): Promise<IndexedPage> {
  const { baseUrl = "https://react-md.dev", mdxFilePath } = options;

  try {
    const slugger = new GithubSlugger();
    const mdxContent = await readFile(mdxFilePath, "utf8");
    const { data } = grayMatter(mdxContent);
    const {
      alias,
      title,
      hooks,
      components,
      description,
      docType,
      docGroup,
      group,
      keywords,
    } = data;
    const tree = fromMarkdown(mdxContent, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });

    const headings: HeadingWithDescription[] = [];
    let currentDepth: number | null = null;
    let currentHeading: string | null = null;
    let currentRawHeading: string | null = null;
    if (!SKIP_HEADINGS_REGEXP.test(mdxFilePath)) {
      visit(tree, (node) => {
        if (node.type === "heading" && node.depth) {
          const rawHeading = toString(node).trim();
          const heading = rawHeading.replace(/\$SOURCE/, "").trim();
          if (currentDepth && currentHeading && currentRawHeading) {
            headings.push({
              id: slugger.slug(currentRawHeading),
              depth: currentDepth,
              title: currentHeading,
              description: "",
            });
          }

          if (isHeadingSkipped({ node, title, heading, mdxFilePath })) {
            currentDepth = null;
            currentHeading = null;
            currentRawHeading = null;
            return;
          }

          currentDepth = node.depth;
          currentHeading = heading;
          currentRawHeading = rawHeading;
        } else if (
          currentDepth &&
          currentHeading &&
          currentRawHeading &&
          node.type === "paragraph"
        ) {
          const description = toString(node);
          headings.push({
            id: slugger.slug(currentRawHeading),
            depth: currentDepth,
            title: currentHeading,
            description,
          });
          currentDepth = null;
          currentHeading = null;
          currentRawHeading = null;
        }
      });
    }

    assertString(title);
    assertString(description);
    if (group) {
      assertString(group);
    }
    if (docType) {
      assertString(docType);
    }
    if (docGroup) {
      assertString(docGroup);
    }
    if (alias) {
      assertStringArray(alias);
    }
    if (hooks) {
      assertStringArray(hooks);
    }
    if (components) {
      assertStringArray(components);
    }
    if (keywords) {
      assertStringArray(keywords);
    }

    const pathname = getFilePathname(mdxFilePath);
    const url = new URL(pathname, baseUrl).toString();

    return {
      objectID: url,
      type: "page",
      url,
      pathname,
      title,
      description,
      headings,
      alias,
      hooks,
      components,
      docType,
      docGroup,
      group,
      keywords,
    };
  } catch (e) {
    console.error(`Unable to parse: "${mdxFilePath}"`);
    throw e;
  }
}
