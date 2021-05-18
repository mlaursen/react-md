import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import cn from "classnames";

import { TableConfig, TableConfigProvider, useTableConfig } from "./config";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Omit<TableConfig, "header"> {}

/**
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(
    {
      className,
      children,
      hAlign: propHAlign,
      vAlign: propVAlign,
      lineWrap: propLineWrap,
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
      ...props
    },
    ref
  ) {
    // update the table configuration with the custom overrides for the `<thead>`
    const { hAlign, vAlign, lineWrap, disableHover, disableBorders } =
      useTableConfig({
        hAlign: propHAlign,
        vAlign: propVAlign,
        lineWrap: propLineWrap,
        disableHover: propDisableHover,
        disableBorders: propDisableBorders,
      });

    const configuration = useMemo(
      () => ({
        header: false,
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
        <tbody {...props} ref={ref} className={cn("rmd-tbody", className)}>
          {children}
        </tbody>
      </TableConfigProvider>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableBody.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
    };
  } catch (e) {}
}
