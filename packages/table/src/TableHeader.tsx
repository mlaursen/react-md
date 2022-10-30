import { bem } from "@react-md/core";
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

const styles = bem("rmd-thead");

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap"> {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * headers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table headers, but it is not really recommended.
   *
   * @defaultValue `false`
   */
  hoverable?: boolean;

  /**
   * Boolean if the header should be rendered as a sticky header that will cover
   * the table contents as the page or `TableContainer` is scrolled.
   *
   * @defaultValue `false`
   */
  sticky?: boolean;
}

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
>(function TableHeader(props, ref) {
  const {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
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

  return (
    <TableConfigProvider value={configuration}>
      <thead
        {...remaining}
        ref={ref}
        className={cnb(styles({ dense }), className)}
      >
        <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
      </thead>
    </TableConfigProvider>
  );
});
