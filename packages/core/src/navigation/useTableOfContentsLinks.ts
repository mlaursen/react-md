"use client";

import { useMemo } from "react";

import { useSsr } from "../SsrProvider.js";
import { type HeadingReferenceWithChildren } from "./useActiveHeadingId.js";

/**
 * This will find all headings that have an `id` that are not part of a `<nav>`
 * element since that should normally be a table of contents component.
 *
 * @since 6.0.0
 */
export const DEFAULT_HEADING_SELECTOR =
  "main :where(:not(nav *)):where(h1[id],h2[id],h3[id],h4[id],h5[id],h6[id])";

/**
 * This only works for heading elements since it is pretty much:
 * `return parseInt(element.tagName.substring(1))`
 *
 * @since 6.0.0
 */
export const DEFAULT_GET_HEADING_DEPTH = (element: Element): number => {
  const depth = parseInt(element.tagName.substring(1));
  return Number.isNaN(depth) ? 0 : depth;
};

/** @since 6.0.0 */
export interface TableOfContentsLinksOptions {
  /**
   * This should be a `document.querySelectorAll` query that returns elements
   * to display in a table of contents component that have a valid id.
   *
   * @see {@link DEFAULT_HEADING_SELECTOR}
   * @defaultValue `main :where(:not(nav *)):where(h1[id],h2[id],h3[id],h4[id],h5[id],h6[id])`
   */
  selector?: string;

  /**
   * @see {@link DEFAULT_GET_HEADING_DEPTH}
   * @defaultValue `(element) => parseInt(element.tagName.substring(1))`
   */
  getDepth?: (element: Element) => number;
}

/** @since 6.0.0 */
export interface TableOfContentsLink {
  id: string;
  depth: number;
  value: string;
}

/** @since 6.0.0 */
export interface TableOfContentsItem extends TableOfContentsLink {
  children?: TableOfContentsLink[];
}

/** @since 6.0.0 */
export type TableOfContentsItems = TableOfContentsItem[];

/**
 * The `useTableOfContentsLinks` should normally be used with the
 * `useActiveHeadingId` hook to generate a table of contents for the current
 * page.
 *
 * @example Example Usage
 * ```tsx
 * import { useActiveHeadingId } from "@react-md/core/navigation/useActiveHeadingId";
 * import { useTableOfContentsLinks } from "@react-md/core/navigation/useTableOfContentsLinks";
 *
 * function Example() {
 *   const headings = useTableOfContentsLinks();
 *   const activeHeadingId = useActiveHeadingId({ headings });
 *
 *   return <TableOfContents headings={headings} activeHeadingId={activeHeadingId} />;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useTableOfContentsLinks(
  options: TableOfContentsLinksOptions = {}
): readonly HeadingReferenceWithChildren[] {
  const {
    selector = DEFAULT_HEADING_SELECTOR,
    getDepth = DEFAULT_GET_HEADING_DEPTH,
  } = options;
  const ssr = useSsr();

  return useMemo(() => {
    if (ssr || typeof window === "undefined") {
      return [];
    }

    const root = {
      id: "",
      value: "",
      depth: 0,
      children: [],
    } satisfies TableOfContentsItem;

    const parents: TableOfContentsItem[] = [];
    let previous: TableOfContentsItem = root;

    const links = document.querySelectorAll(selector);
    links.forEach((link) => {
      const depth = getDepth(link);
      const item: TableOfContentsItem = {
        id: link.id,
        depth,
        value: link.textContent || "",
        children: [],
      };
      if (depth > previous.depth) {
        if (!previous.children) {
          previous.children = [];
        }

        parents.push(previous);
      } else if (depth < previous.depth) {
        while (parents[parents.length - 1].depth >= depth) {
          parents.pop();
        }
      }
      const i = parents.length - 1;
      parents[i].children = [...(parents[i].children ?? []), item];
      previous = item;
    });
    return root.children;
  }, [getDepth, selector, ssr]);
}
