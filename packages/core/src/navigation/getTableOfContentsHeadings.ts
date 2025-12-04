import {
  type TableOfContentsHeadingItem,
  type TableOfContentsHeadings,
  type TableOfContentsHeadingsOptions,
} from "./types.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface GetTableOfContentsHeadingsOptions extends Required<TableOfContentsHeadingsOptions> {
  ssr: boolean;
}

/**
 * This is used by the `useTableOfContentsHeadings` hook to find
 * the active heading element which is why it is marked as
 * internal.
 *
 * This will always return an empty list if `ssr` is `true` or
 * `typeof window === "undefined"`.
 *
 * @internal
 * @since 6.0.0
 */
export function getTableOfContentsHeadings(
  options: GetTableOfContentsHeadingsOptions
): TableOfContentsHeadings {
  const { ssr, selector, getDepth, getHeadingText } = options;

  if (ssr || typeof window === "undefined") {
    return [];
  }

  const root = {
    id: "",
    depth: 0,
    items: [],
    children: "",
  } satisfies TableOfContentsHeadingItem;
  let previous: TableOfContentsHeadingItem = root;
  const parents: TableOfContentsHeadingItem[] = [];
  const headings = document.querySelectorAll(selector);
  headings.forEach((heading) => {
    const depth = getDepth(heading);
    const item: TableOfContentsHeadingItem = {
      id: heading.id,
      depth,
      items: [],
      children: getHeadingText(heading),
    };
    if (depth > previous.depth) {
      if (!previous.items) {
        previous.items = [];
      }

      parents.push(previous);
    } else if (depth < previous.depth) {
      while (parents[parents.length - 1].depth >= depth) {
        parents.pop();
      }
    }
    const i = parents.length - 1;
    parents[i].items = [...(parents[i].items ?? []), item];
    previous = item;
  });

  return root.items;
}
