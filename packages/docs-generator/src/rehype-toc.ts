import {
  type TableOfContentsHeading,
  type TableOfContentsHeadingItem,
  type TableOfContentsHeadings,
} from "@react-md/core/navigation/useTableOfContentsHeadings";
import { type Root } from "hast";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "mdast-util-to-string";
import { type Plugin } from "unified";
import { visit } from "unist-util-visit";

import { createJsxNode } from "./utils/createJsxNode.js";

function getHeadings(ast: Root): TableOfContentsHeadings {
  const headings: TableOfContentsHeadings = [];

  visit(ast, "element", (node) => {
    const level = headingRank(node);
    if (level !== undefined) {
      const { id } = node.properties;
      const heading: TableOfContentsHeading = {
        id: typeof id === "string" ? id : "",
        depth: level,
        // remove any [$SOURCE](path/to/file) from headings
        children: toString(node)
          .replace(/\$SOURCE/, "")
          .trim(),
      };
      if (!heading.id) {
        throw new Error(
          "The rehype-slug plugin must be included before the rehype-toc plugin"
        );
      }

      headings.push(heading);
    }
  });

  return headings;
}

function createToc(headings: TableOfContentsHeadings): TableOfContentsHeadings {
  const root = {
    id: "",
    children: "",
    depth: 0,
    items: [],
  } satisfies TableOfContentsHeadingItem;

  const parents: TableOfContentsHeadingItem[] = [];
  let previous: TableOfContentsHeadingItem = root;

  headings.forEach((heading) => {
    if (heading.depth > previous.depth) {
      if (!previous.items) {
        previous.items = [];
      }
      parents.push(previous);
    } else if (heading.depth < previous.depth) {
      while (parents[parents.length - 1].depth >= heading.depth) {
        parents.pop();
      }
    }

    const i = parents.length - 1;
    parents[i].items = [...(parents[i].items ?? []), heading];
    previous = heading;
  });

  return root.items || [];
}

export interface RehypeTocOptions {
  /** @defaultValue `"TableOfContents"` */
  as?: string | null;

  /** @defaultValue `"toc"` */
  propName?: string;

  /**
   * @defaultValue `0`
   */
  threshold?: number;
}

/**
 * This plugin extracts all the markdown headings to create a table of contents
 * by inserting a `<TableOfContents toc={toc} />` as the first child. The
 * `rehype-slug` plugin **must** be used before this plugin is run.
 *
 * The `vfile` will also include the `toc` as `file.data.toc`, but I don't
 * really know how to access that with nextjs/mdx.
 */
export const rehypeToc: Plugin<[options?: RehypeTocOptions], Root> = (
  options = {}
) => {
  const { as = "TableOfContents", propName = "toc", threshold = 0 } = options;
  return (root, file) => {
    const headings = getHeadings(root);
    const toc = createToc(headings);
    if (toc.length < threshold) {
      return;
    }

    if (as !== null) {
      root.children.unshift(
        createJsxNode({
          as,
          props: { [propName]: toc },
        })
      );
    }

    file.data.toc = toc;
  };
};

declare module "vfile" {
  interface DataMap {
    toc?: Readonly<TableOfContentsHeadings>;
  }
}
