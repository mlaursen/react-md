"use client";

import {
  type ReactNode,
  type Ref,
  type RefCallback,
  useCallback,
  useState,
} from "react";

import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIntersectionObserver } from "../useIntersectionObserver.js";
import { useTableContainer } from "./TableContainerProvider.js";
import {
  type IsStickyTableSectionActive,
  type TableStickySectionConfiguration,
} from "./types.js";

/**
 * @since 6.0.0
 */
export const isTableHeaderStickyActive: IsStickyTableSectionActive = (
  entry
) => {
  return (
    entry.intersectionRatio < 1 &&
    entry.boundingClientRect.bottom <= window.innerHeight
  );
};

/**
 * @since 6.0.0
 */
export const isTableFooterStickyActive: IsStickyTableSectionActive = (
  entry,
  isInTableContainer
) => {
  const { intersectionRatio, boundingClientRect, isIntersecting } = entry;
  if (isInTableContainer) {
    return !isIntersecting;
  }

  return intersectionRatio < 1 && boundingClientRect.top >= 0;
};

/** @since 6.0.0 */
export interface TableStickySectionOptions
  extends TableStickySectionConfiguration {
  ref?: Ref<HTMLTableSectionElement>;
  type: "header" | "footer";
}

/** @since 6.0.0 */
export interface TableStickySectionImplementation {
  tbody: ReactNode;
  targetRef: RefCallback<HTMLTableSectionElement>;
  sectionRef: RefCallback<HTMLTableSectionElement>;
  stickyActive: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export function useStickyTableSection(
  options: TableStickySectionOptions
): TableStickySectionImplementation {
  const { ref, type, disableStickyStyles, stickyOptions } = options;

  const isHeader = type === "header";
  const isStickyActive =
    options.isStickyActive ??
    (isHeader ? isTableHeaderStickyActive : isTableFooterStickyActive);

  const [sectionRef, sectionRefCallback] = useEnsuredRef(ref);
  const { exists, containerRef } = useTableContainer();
  const [stickyActive, setStickyActive] = useState(false);
  const targetRef = useIntersectionObserver({
    ref: exists ? undefined : sectionRefCallback,
    root: containerRef,
    disabled: disableStickyStyles,
    threshold: exists ? 0 : 1,
    getRootMargin: useCallback(() => {
      const section = sectionRef.current;
      if (!isHeader) {
        const topOffset = exists && section ? section.offsetHeight - 1 : 1;

        return `0px 0px -${topOffset}px 0px`;
      }

      if (!section) {
        return;
      }

      let topOffset: number;
      if (exists) {
        topOffset = section.offsetHeight - 1;
      } else {
        const top = parseFloat(window.getComputedStyle(section).top);
        topOffset = Number.isNaN(top) ? 1 : top + 1;
      }

      return `-${topOffset}px 0px 0px`;
    }, [exists, isHeader, sectionRef]),
    onUpdate: useCallback(
      ([entry]) => {
        setStickyActive(isStickyActive(entry, exists));
      },
      [exists, isStickyActive]
    ),
    // allow the user defined sticky options to override the default behavior
    ...stickyOptions,
  });

  let tbody: ReactNode;
  if (exists && !disableStickyStyles) {
    // rendering a `<tbody>` since it is valid to have 0-many in a table
    // https://html.spec.whatwg.org/multipage/tables.html#the-table-element
    tbody = <tbody aria-hidden ref={targetRef} />;
  }

  return {
    tbody,
    targetRef,
    sectionRef: exists ? sectionRefCallback : targetRef,
    stickyActive,
  };
}
