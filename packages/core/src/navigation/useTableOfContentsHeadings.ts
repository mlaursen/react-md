"use client";

import { useMemo } from "react";

import { useSsr } from "../SsrProvider.js";
import {
  type HeadingReference,
  type HeadingReferenceWithChildren,
} from "./useActiveHeadingId.js";

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

/**
 * @since 6.0.0
 */
export const DEFAULT_GET_HEADING_TEXT = (element: Element): string =>
  element.textContent || "";

/** @since 6.0.0 */
export interface TableOfContentsHeadingsOptions {
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

  /**
   * This is used to get the text to display in a table of contents from each
   * heading element.
   *
   * @see {@link DEFAULT_GET_HEADING_TEXT}
   * @defaultValue `(element) => element.textContent || ""`
   */
  getHeadingText?: (element: Element) => string;
}

/** @since 6.0.0 */
export interface TableOfContentsHeading extends HeadingReference {
  depth: number;
  children: string;
}

/** @since 6.0.0 */
export interface TableOfContentsHeadingItem
  extends TableOfContentsHeading,
    HeadingReferenceWithChildren {
  items?: TableOfContentsHeadingItem[];
}

/** @since 6.0.0 */
export type TableOfContentsHeadings = TableOfContentsHeadingItem[];

/**
 * The `useTableOfContentsHeadings` should normally be used with the
 * `useActiveHeadingId` hook to generate a table of contents for the current
 * page.
 *
 * @example Example Usage
 * ```tsx
 * import { useActiveHeadingId } from "@react-md/core/navigation/useActiveHeadingId";
 * import { useTableOfContentsHeadings } from "@react-md/core/navigation/useTableOfContentsHeadings";
 *
 * function Example() {
 *   const headings = useTableOfContentsHeadings();
 *   const activeHeadingId = useActiveHeadingId({ headings });
 *
 *   return <TableOfContents headings={headings} activeHeadingId={activeHeadingId} />;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useTableOfContentsHeadings(
  options: TableOfContentsHeadingsOptions = {}
): readonly HeadingReferenceWithChildren[] {
  const {
    selector = DEFAULT_HEADING_SELECTOR,
    getDepth = DEFAULT_GET_HEADING_DEPTH,
    getHeadingText = DEFAULT_GET_HEADING_TEXT,
  } = options;
  const ssr = useSsr();

  return useMemo(() => {
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
  }, [getDepth, getHeadingText, selector, ssr]);
}
