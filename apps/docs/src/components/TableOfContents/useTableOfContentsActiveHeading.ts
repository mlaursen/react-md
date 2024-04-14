"use client";
import { useIntersectionObserver } from "@react-md/core/useIntersectionObserver";
import { parseCssLengthUnit } from "@react-md/core/utils/parseCssLengthUnit";
import { type TOCItem } from "docs-generator/rehype-toc";
import { useCallback, useRef, useState } from "react";

function getHeadings(items: readonly TOCItem[]): HTMLElement[] {
  const headings: HTMLElement[] = [];
  items.forEach((item) => {
    const heading = document.getElementById(item.id);
    if (heading) {
      headings.push(heading);
    }

    if (item.children) {
      headings.push(...getHeadings(item.children));
    }
  });

  return headings;
}

function getLastHeadingId(items: readonly TOCItem[]): string {
  const last = items.at(-1);
  if (!last) {
    return "";
  }

  if (last.children) {
    return getLastHeadingId(last.children);
  }

  return last.id;
}

const isScrolledNearPageBottom = (): boolean =>
  window.scrollY >= document.documentElement.scrollHeight * 0.8;

const threshold = [0.0, 1.0];

const getRootMargin = (): string => {
  const headerHeightVar = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--rmd-layout-header-height");
  const headerHeight = parseCssLengthUnit({
    value: headerHeightVar || "3.5rem",
  });

  return `-${headerHeight}px 0px 0px 0px`;
};

/**
 * Heavily inspired by
 * https://github.com/mdn/yari/blob/231d6aab8f1c8efe159d268c261446c5b7ae12d9/client/src/document/hooks.ts#L171
 */
export function useTableOfContentsActiveHeading(
  toc: readonly TOCItem[]
): string {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const elements = useRef<Map<string, boolean>>();
  const isFirstRender = useRef(true);
  useIntersectionObserver({
    threshold,
    getRootMargin,
    getTargets: useCallback(() => {
      const headings = getHeadings(toc);
      const lookup = new Map<string, boolean>();
      headings.forEach((heading) => {
        lookup.set(heading.id, false);
      });
      elements.current = lookup;

      return headings;
    }, [toc]),
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
        if (!foundId && isFirstRender.current && isScrolledNearPageBottom()) {
          foundId = getLastHeadingId(toc);
        }

        isFirstRender.current = false;

        // if there isn't a found id, it might be a really large section where
        // another heading isn't visible, so maintain the previous one
        if (foundId) {
          setActiveId(foundId);
        }
      },
      [toc]
    ),
  });

  return activeId;
}
