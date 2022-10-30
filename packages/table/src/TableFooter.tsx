import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

import { StickyTableProvider } from "./StickyTableProvider";
import type {
  TableCellConfig,
  TableConfigContext,
} from "./TableConfigurationProvider";
import {
  TableConfigProvider,
  useTableConfig,
} from "./TableConfigurationProvider";
import { TableFooterProvider } from "./TableFooterProvider";

export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap"> {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * footers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table footers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;

  /**
   * Boolean if the footer should be rendered as a sticky footer that will cover
   * the table contents as the page or `TableContainer` is scrolled.
   *
   * @defaultValue `false`
   */
  sticky?: boolean;
}

/**
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(props, ref) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
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

  return (
    <TableConfigProvider value={configuration}>
      <TableFooterProvider value>
        <tfoot {...remaining} ref={ref} className={cnb("rmd-tfoot", className)}>
          <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
        </tfoot>
      </TableFooterProvider>
    </TableConfigProvider>
  );
});
