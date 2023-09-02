"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIntersectionObserver } from "../useIntersectionObserver.js";
import { bem } from "../utils/bem.js";
import type {
  TableCellConfig,
  TableConfigContext,
} from "./TableConfigurationProvider.js";
import {
  TableConfigProvider,
  useTableConfig,
} from "./TableConfigurationProvider.js";
import { useTableContainer } from "./TableContainerProvider.js";
import type { TableStickySectionProps } from "./types.js";

const styles = bem("rmd-tfoot");

/**
 * @remarks \@since 6.0.0 Added support for "sticky-active" state.
 */
export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap">,
    TableStickySectionProps {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * footers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table footers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;
}

/**
 * **Client Component**
 * TODO: Create separate useStickyTableFooter + StickyTableFooter component
 *
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(props, propRef) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    stickyOptions,
    isStickyActive,
    disableStickyStyles = false,
    ...remaining
  } = props;

  // update the table configuration with the custom overrides for the `<tfoot>`
  const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  const configuration = useMemo<TableConfigContext>(
    () => ({
      dense,
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [dense, hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  const [tfootRef, tfootRefCallback] = useEnsuredRef(propRef);
  const { exists, containerRef } = useTableContainer();
  const [stickyActive, setStickyActive] = useState(false);
  const targetRef = useIntersectionObserver<
    HTMLTableSectionElement | HTMLElement
  >({
    ref: exists ? undefined : tfootRefCallback,
    root: containerRef,
    disabled: !sticky || disableStickyStyles,
    threshold: exists ? 0 : 1,
    getRootMargin: useCallback(() => {
      const topOffset =
        exists && tfootRef.current ? tfootRef.current.offsetHeight - 1 : 1;

      return `0px 0px -${topOffset}px 0px`;
    }, [exists, tfootRef]),
    onUpdate: useCallback(
      ([entry]) => {
        if (typeof isStickyActive === "function") {
          return isStickyActive(entry);
        }

        const { intersectionRatio, boundingClientRect, isIntersecting } = entry;
        if (exists) {
          setStickyActive(!isIntersecting);
          return;
        }

        setStickyActive(intersectionRatio < 1 && boundingClientRect.top >= 0);
      },
      [exists, isStickyActive]
    ),
    // allow the user defined sticky options to override the default behavior
    ...stickyOptions,
  });

  return (
    <TableConfigProvider value={configuration}>
      {exists && sticky && !disableStickyStyles && (
        // rendering a `<tbody>` since it is valid to have 0-many in a table
        // https://html.spec.whatwg.org/multipage/tables.html#the-table-element
        <tbody aria-hidden ref={targetRef} />
      )}
      <tfoot
        {...remaining}
        ref={exists ? tfootRefCallback : targetRef}
        className={cnb(
          styles({
            sticky,
            "sticky-active": stickyActive,
          }),
          className
        )}
      >
        {children}
      </tfoot>
    </TableConfigProvider>
  );
});
