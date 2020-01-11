import React, {
  FC,
  forwardRef,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableCellConfig, useTableConfig } from "./config";

export type TableCellElement =
  | HTMLTableDataCellElement
  | HTMLTableHeaderCellElement;

export type TableCellAttributes =
  | TdHTMLAttributes<HTMLTableDataCellElement>
  | ThHTMLAttributes<HTMLTableHeaderCellElement>;

export interface TableCellOptions extends TableCellConfig {
  /**
   * This is a bit of a "weird" prop since all it does is apply `width: 100%` to
   * this cell. This will make this specific cell fill the remaining width of
   * the table (if there is any). If no cells have this prop enabled and the
   * `fullWidth` table configuration is enabled, all cells will have an
   * equal-sized width.
   */
  grow?: boolean;

  /**
   * This prop is only valid when the `header` prop is enabled or the
   * `TableCell` is a child of the `TableHeader` component. This will generally
   * be used with a value of `"row"` if you have table headers that are at the
   * start of each row instead of at the top of the table.
   */
  scope?: "row" | "col" | "rowgroup" | "colgroup";
}

export type TableCellProps = TableCellAttributes & TableCellOptions;

type WithRef = WithForwardedRef<TableCellElement>;
type DefaultProps = Required<Pick<TableCellOptions, "grow">>;
type WithDefaultProps = TableCellProps & DefaultProps & WithRef;

const block = bem("rmd-table-cell");

/**
 * Creates a `<th>` or `<td>` cell with sensible styled defaults. You can create
 * a `<th>` element by enabling the `header` prop OR having a `TableCell` as a
 * child of the `TableHeader` component.
 *
 * Note: If you have a checkbox column in the `TableHeader` without any labels,
 * you will need to manually set the `header={false}` prop for that cell since
 * it is invalid to have a `<th>` without any readable content for screen
 * readers.
 */
const TableCell: FC<TableCellProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    scope,
    grow,
    hAlign: propHAlign,
    vAlign: propVAlign,
    header: propHeader,
    lineWrap: propDisableLineWrap,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  const { header, hAlign, vAlign, lineWrap } = useTableConfig({
    header: propHeader,
    hAlign: propHAlign,
    vAlign: propVAlign,
    lineWrap: propDisableLineWrap,
  });

  const Component = header ? "th" : "td";
  return (
    <Component
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          grow,
          header,
          [hAlign]: hAlign !== "left",
          [vAlign]: vAlign !== "middle",
          vertical: vAlign !== "middle",
          "no-wrap": !lineWrap,
        }),
        className
      )}
      scope={header ? scope : undefined}
    >
      {children}
    </Component>
  );
};

const defaultProps: DefaultProps = {
  grow: false,
};

TableCell.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TableCell.displayName = "TableCell";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableCell.propTypes = {
      className: PropTypes.string,
      scope: PropTypes.oneOf(["row", "col", "rowgroup", "colgroup"]),
      grow: PropTypes.bool,
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      header: PropTypes.bool,
      lineWrap: PropTypes.bool,
    };
  }
}

export default forwardRef<TableCellElement, TableCellProps>((props, ref) => (
  <TableCell {...props} forwardedRef={ref} />
));
