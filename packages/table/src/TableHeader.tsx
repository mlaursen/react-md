import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { TableCellConfig, TableConfigProvider, useTableConfig } from "./config";
import { StickyTableProvider } from "./sticky";

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap"> {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * headers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table headers, but it is not really recommended.
   */
  hoverable?: boolean;

  /**
   * Boolean if the header should be rendered as a sticky header that will cover
   * the table contents as the page or `TableContainer` is scrolled.
   */
  sticky?: boolean;
}

const block = bem("rmd-thead");

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
>(function TableHeader(
  {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    ...props
  },
  ref
) {
  // update the table configuration with the custom overrides for the `<thead>`
  const { hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  const configuration = useMemo(
    () => ({
      header: true,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  return (
    <TableConfigProvider value={configuration}>
      <thead {...props} ref={ref} className={cn(block(), className)}>
        <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
      </thead>
    </TableConfigProvider>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableHeader.propTypes = {
      className: PropTypes.string,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hoverable: PropTypes.bool,
      sticky: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
