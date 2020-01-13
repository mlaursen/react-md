import React, { FC, forwardRef, TableHTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableConfigProvider, TableConfig, TableConfigContext } from "./config";

/**
 * All the available props for the `Table` component. This allows you to apply
 * the general table configuration for convenience.
 */
export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfig {
  /**
   * Boolean if the table should use the dense spec to reduce the height of each
   * cell.
   */
  dense?: boolean;

  /**
   * Boolean if the `<table>` element should span the entire width of the
   * container `<div>` element instead of having its width be determined by the
   * table's contents.
   *
   * Note: There will always be horizontal overflow if the table is too wide.
   */
  fullWidth?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableElement>;
type DefaultProps = Omit<TableConfigContext, "header"> &
  Required<Pick<TableProps, "dense" | "fullWidth">>;
type WithDefaultProps = TableProps & DefaultProps & WithRef;

const block = bem("rmd-table");

/**
 * Creates a `<table>` element with some default styles and a quick way to
 * configure the other styles within a table. That being said, styling tables
 * is awful if you are used to flexbox and this component will not be helping
 * with layout styles of tables.
 *
 * The table will not be responsive by default, but you can easily create a
 * responsive table with overflow by wrapping with the `TableContainer` component
 * or just adding `overflow: auto` to a parent element. Note that horizontal
 * scrolling is still not one of the best user interactions and it might be better
 * to render a table in a different manner for mobile devices to help display
 * all the required data.
 */
const Table: FC<TableProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    dense,
    fullWidth,
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
    children,
    ...props
  } = providedProps as WithDefaultProps;

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
        ref={forwardedRef}
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
};

const defaultProps: DefaultProps = {
  dense: false,
  hAlign: "left",
  vAlign: "middle",
  lineWrap: false,
  fullWidth: false,
  disableHover: false,
  disableBorders: false,
};

Table.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Table.displayName = "Table";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Table.propTypes = {
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
  }
}

export default forwardRef<HTMLTableElement, TableProps>((props, ref) => (
  <Table {...props} forwardedRef={ref} />
));
