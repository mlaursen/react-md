import { bem, useEnsuredRef, useIntersectionObserver } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";

import type {
  TableCellConfig,
  TableConfigContext,
} from "./TableConfigurationProvider";
import {
  TableConfigProvider,
  useTableConfig,
} from "./TableConfigurationProvider";
import { useTableContainer } from "./TableContainer";
import type { TableStickySectionProps } from "./types";

const styles = bem("rmd-thead");

/** @remarks \@since 6.0.0 */
export interface TableHeaderClassNameOptions {
  className?: string;
  dense?: boolean;
  sticky?: boolean;
  stickyActive?: boolean;
}

/** @remarks \@since 6.0.0 */
export function tableHeader(options: TableHeaderClassNameOptions = {}): string {
  const { dense, sticky, stickyActive, className } = options;

  return cnb(
    styles({
      dense,
      sticky,
      "sticky-active": stickyActive,
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0 Added support for "sticky-active" state.
 */
export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap">,
    TableStickySectionProps {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * headers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table headers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export const isTableHeaderStickyActive = (
  entry: IntersectionObserverEntry
): boolean => {
  return (
    entry.intersectionRatio < 1 &&
    entry.boundingClientRect.bottom <= window.innerHeight
  );
};

/**
 * Creates a `<thead>` element with some basic styles. This component will also
 * update the table configuration so that all the `TableCell` children will
 * automatically become `<th>` elements instead of the normal `<td>` as well as
 * disabling the hover effect and line wrapping. The hover effect and
 * line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader(props, propRef) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    stickyOptions,
    isStickyActive = isTableHeaderStickyActive,
    disableStickyStyles = false,
    ...remaining
  } = props;

  // update the table configuration with the custom overrides for the `<thead>`
  const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  const configuration = useMemo<TableConfigContext>(
    () => ({
      dense,
      header: true,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [dense, hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  const [theadRef, theadRefCallback] = useEnsuredRef(propRef);
  const { exists, containerRef } = useTableContainer();
  const [stickyActive, setStickyActive] = useState(false);
  const targetRef = useIntersectionObserver({
    ref: exists ? undefined : theadRefCallback,
    root: containerRef,
    disabled: !sticky || disableStickyStyles,
    threshold: exists ? 0 : 1,
    getRootMargin: useCallback(() => {
      const thead = theadRef.current;
      if (!thead) {
        return;
      }

      let topOffset: number;
      if (exists) {
        topOffset = thead.offsetHeight - 1;
      } else {
        const top = parseFloat(window.getComputedStyle(thead).top);
        topOffset = Number.isNaN(top) ? 1 : top + 1;
      }

      return `-${topOffset}px 0px 0px`;
    }, [exists, theadRef]),
    onUpdate: useCallback(
      (entry) => {
        setStickyActive(isStickyActive(entry));
      },
      [isStickyActive]
    ),
    // allow the user defined sticky options to override the default behavior
    ...stickyOptions,
  });

  return (
    <TableConfigProvider value={configuration}>
      <thead
        {...remaining}
        ref={exists ? theadRefCallback : targetRef}
        className={tableHeader({
          dense,
          sticky,
          stickyActive,
          className,
        })}
      >
        {children}
      </thead>
      {exists && sticky && !disableStickyStyles && (
        // rendering a `<tbody>` since it is valid to have 0-many in a table
        // https://html.spec.whatwg.org/multipage/tables.html#the-table-element
        <tbody aria-hidden ref={targetRef} />
      )}
    </TableConfigProvider>
  );
});
