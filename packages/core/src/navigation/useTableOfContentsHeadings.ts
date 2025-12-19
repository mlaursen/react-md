"use client";

import { useEffect, useState } from "react";

import { useSsr } from "../SsrProvider.js";
import { getTableOfContentsHeadings } from "./getTableOfContentsHeadings.js";
import {
  type TableOfContentsHeadings,
  type TableOfContentsHeadingsOptions,
} from "./types.js";

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
  const depth = Number.parseInt(element.tagName.slice(1));
  return Number.isNaN(depth) ? 0 : depth;
};

/**
 * @since 6.0.0
 */
export const DEFAULT_GET_HEADING_TEXT = (element: Element): string =>
  element.textContent || "";

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
 * @see {@link https://react-md.dev/hooks/use-table-of-contents-headings | useTableOfContentsHeadings Demos}
 * @since 6.0.0
 */
export function useTableOfContentsHeadings(
  options: TableOfContentsHeadingsOptions = {}
): TableOfContentsHeadings {
  const {
    selector = DEFAULT_HEADING_SELECTOR,
    getDepth = DEFAULT_GET_HEADING_DEPTH,
    getHeadingText = DEFAULT_GET_HEADING_TEXT,
  } = options;
  const ssr = useSsr();
  const [headings, setHeadings] = useState(() =>
    getTableOfContentsHeadings({
      ssr,
      selector,
      getDepth,
      getHeadingText,
    })
  );
  useEffect(() => {
    setHeadings(
      getTableOfContentsHeadings({ ssr, selector, getDepth, getHeadingText })
    );
  }, [getDepth, getHeadingText, selector, ssr]);

  return headings;
}
