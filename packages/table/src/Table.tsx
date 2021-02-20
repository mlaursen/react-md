import React, { forwardRef, TableHTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { TableConfigProvider, TableConfiguration } from "./config";

/**
 * All the available props for the `Table` component. This allows you to apply
 * the general table configuration for convenience.
 */
export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfiguration {}

const block = bem("rmd-table");

/**
 * Creates a `<table>` element with some default styles and a quick way to
 * configure the other styles within a table. That being said, styling tables is
 * awful if you are used to flexbox and this component will not be helping with
 * layout styles of tables.
 *
 * The table will not be responsive by default, but you can easily create a
 * responsive table with overflow by wrapping with the `TableContainer`
 * component or just adding `overflow: auto` to a parent element. Note that
 * horizontal scrolling is still not one of the best user interactions and it
 * might be better to render a table in a different manner for mobile devices to
 * help display all the required data.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    className,
    children,
    dense = false,
    hAlign = "left",
    vAlign = "middle",
    lineWrap = false,
    fullWidth = false,
    disableHover = false,
    disableBorders = false,
    ...props
  },
  ref
) {
  const configuration = useMemo(
    () => ({
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableHover,
      disableBorders,
    }),
    [hAlign, vAlign, lineWrap, disableHover, disableBorders]
  );

  return (
    <TableConfigProvider value={configuration}>
      <table
        {...props}
        ref={ref}
        className={cn(
          block({
            dense,
            "full-width": fullWidth,
          }),
          className
        )}
      >
        {children}
      </table>
    </TableConfigProvider>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Table.propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      dense: PropTypes.bool,
      fullWidth: PropTypes.bool,
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
    };
  } catch (e) {}
}
