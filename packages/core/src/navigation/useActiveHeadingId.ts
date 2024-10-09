"use client";
import { useCallback, useRef, useState } from "react";
import { type UseStateInitializer } from "../types.js";
import {
  useIntersectionObserver,
  type IntersectionObserverRootMargin,
  type IntersectionObserverThreshold,
} from "../useIntersectionObserver.js";
import { parseCssLengthUnit } from "../utils/parseCssLengthUnit.js";

/**
 * @since 6.0.0
 */
export interface HeadingReference {
  id: string;
}

/**
 * @since 6.0.0
 */
export interface HeadingReferenceWithChildren extends HeadingReference {
  children?: readonly HeadingReferenceWithChildren[];
}

/**
 * @defaultValue `[0.0, 1.0]`
 * @since 6.0.0
 */
export const DEFAULT_ACTIVE_HEADING_THRESHOLD: IntersectionObserverThreshold = [
  0.0, 1.0,
];

/**
 * ```tsx
 * const headerHeightVar = window
 *   .getComputedStyle(document.documentElement)
 *   .getPropertyValue("--rmd-layout-header-height");
 * const headerHeight = parseCssLengthUnit({
 *   value: headerHeightVar || "3.5rem",
 * });

 * return `-${headerHeight}px 0px 0px 0px`;
 * ```
 * @since 6.0.0
 */
export const DEFAULT_ACTIVE_HEADING_GET_ROOT_MARGIN = (): string => {
  const headerHeightVar = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--rmd-layout-header-height");
  const headerHeight = parseCssLengthUnit({
    value: headerHeightVar || "3.5rem",
  });

  return `-${headerHeight}px 0px 0px 0px`;
};

/**
 * @internal
 * @since 6.0.0
 */
function getHeadingElements(
  items: readonly HeadingReferenceWithChildren[]
): HTMLElement[] {
  const headings: HTMLElement[] = [];
  items.forEach((item) => {
    const heading = document.getElementById(item.id);
    if (heading) {
      headings.push(heading);
    }

    if (item.children) {
      headings.push(...getHeadingElements(item.children));
    }
  });

  return headings;
}

/**
 * @internal
 * @since 6.0.0
 */
function getLastHeadingId(
  items: readonly HeadingReferenceWithChildren[]
): string {
  const last = items.at(-1);
  if (!last) {
    return "";
  }

  if (last.children) {
    return getLastHeadingId(last.children);
  }

  return last.id;
}

/**
 * @internal
 * @since 6.0.0
 */
const isScrolledNearPageBottom = (threshold: number): boolean =>
  window.scrollY >= document.documentElement.scrollHeight * threshold;

/**
 * @since 6.0.0
 */
export interface ActiveHeadingIdOptions {
  headings: readonly HeadingReferenceWithChildren[];

  /** @see {@link DEFAULT_ACTIVE_HEADING_THRESHOLD} */
  threshold?: IntersectionObserverThreshold;

  /** @see {@link DEFAULT_ACTIVE_HEADING_GET_ROOT_MARGIN} */
  getRootMargin?: () => IntersectionObserverRootMargin;

  /** @defaultValue `headings[0]?.id ?? ""` */
  defaultActiveId?: UseStateInitializer<string>;

  /** @defaultValue `0.8` */
  scrollBottomThreshold?: number;
}

/**
 * This is heavily inspired by:
 * @see https://github.com/mdn/yari/blob/231d6aab8f1c8efe159d268c261446c5b7ae12d9/client/src/document/hooks.ts#L171
 *
 * @since 6.0.0
 */
export function useActiveHeadingId(options: ActiveHeadingIdOptions): string {
  const {
    headings,
    threshold = DEFAULT_ACTIVE_HEADING_THRESHOLD,
    getRootMargin = DEFAULT_ACTIVE_HEADING_GET_ROOT_MARGIN,
    defaultActiveId = headings[0]?.id ?? "",
    scrollBottomThreshold = 0.8,
  } = options;
  const elements = useRef<Map<string, boolean>>();
  const isFirstRender = useRef(true);
  const [activeHeadingId, setActiveHeadingId] = useState(defaultActiveId);
  useIntersectionObserver({
    threshold,
    getRootMargin,
    getTargets: useCallback(() => {
      const headingElements = getHeadingElements(headings);
      const lookup = new Map<string, boolean>();
      headingElements.forEach((heading) => {
        lookup.set(heading.id, false);
      });
      elements.current = lookup;

      return headingElements;
    }, [headings]),
    onUpdate: useCallback(
      (entries) => {
        const lookup = elements.current;
        if (!lookup) {
          return;
        }

        entries.forEach((entry) => {
          lookup.set(entry.target.id, entry.isIntersecting);
        });

        // get the first visible/intersecting item and set it
        let foundId = [...lookup.entries()].find(
          ([_id, isIntersecting]) => isIntersecting
        )?.[0];
        if (
          !foundId &&
          isFirstRender.current &&
          isScrolledNearPageBottom(scrollBottomThreshold)
        ) {
          foundId = getLastHeadingId(headings);
        }

        isFirstRender.current = false;

        // if there isn't a found id, it might be a really large section where
        // another heading isn't visible, so maintain the previous one
        if (foundId) {
          setActiveHeadingId(foundId);
        }
      },
      [headings, scrollBottomThreshold]
    ),
  });

  return activeHeadingId;
}
