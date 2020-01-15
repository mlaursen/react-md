import React, {
  FC,
  forwardRef,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableCellConfig, useTableConfig } from "./config";
import { useSticky } from "./sticky";

export type TableCellElement =
  | HTMLTableDataCellElement
  | HTMLTableHeaderCellElement;

export type TableCellAttributes = Omit<
  | TdHTMLAttributes<HTMLTableDataCellElement>
  | ThHTMLAttributes<HTMLTableHeaderCellElement>,
  "colSpan"
>;

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

  /**
   * The number of columns that the cell should span. For some reason the default
   * `colSpan` does not support a string value in typescript and only numbers, but
   * it **is** valid (or works...) to set it to `100%` if you want a cell to span
   * the entire table's width ignoring the number of columns.
   */
  colSpan?: number | "100%";

  /**
   * If this is a trueish value, the cell will become a sticky cell that will be
   * fixed while the user scrolls the table. When this is a `boolean` (or inherited
   * from a `TableHeader`) or set to `"header"`, the cell will act as a sticky header
   * that will be visible for vertical scrolling.
   *
   * When this is set to `"cell"`, the cell will be fixed to the left or right
   * for horizontal scrolling.
   *
   * Finally, if this is set to `"header-cell"`, it will be a combination of both
   * vertical and horizontal scrolling. This means that other sticky header
   * cells will scroll beneath this cell.
   */
  sticky?: boolean | "header" | "cell" | "header-cell";
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
    grow,
    scope: propScope,
    hAlign: propHAlign,
    vAlign: propVAlign,
    header: propHeader,
    lineWrap: propDisableLineWrap,
    children,
    colSpan,
    sticky: propSticky,
    ...props
  } = providedProps as WithDefaultProps;

  // Note: unlike the other usages of `useTableConfig`, the `propHeader`
  // is not provided. This is so that `TableCheckbox` components can still
  // be a sticky header without being rendered as a `<th>`. This also makes
  // it so the scope can be defaulted to `col` or `row` automatically.
  const { header: inheritedHeader, hAlign, vAlign, lineWrap } = useTableConfig({
    hAlign: propHAlign,
    vAlign: propVAlign,
    lineWrap: propDisableLineWrap,
  });
  const sticky = useSticky(propSticky);
  const isStickyCell = propSticky === "cell";
  const isStickyHeader = propSticky === "header";
  const isStickyHeaderCell = propSticky === "header-cell";
  const header = propHeader ?? inheritedHeader;
  let scope = propScope;
  if (!scope && header) {
    scope = !inheritedHeader && propHeader ? "row" : "col";
  }

  const Component = header ? "th" : "td";
  return (
    <Component
      {...props}
      colSpan={colSpan as number | undefined}
      ref={forwardedRef}
      className={cn(
        block({
          grow,
          header,
          sticky,
          "sticky-header":
            (header && sticky) || isStickyHeader || isStickyHeaderCell,
          "sticky-cell": isStickyCell || isStickyHeaderCell,
          "sticky-header-cell": isStickyHeaderCell,
          [hAlign]: hAlign !== "left",
          [vAlign]: vAlign !== "middle",
          vertical: vAlign !== "middle",
          "no-wrap": !lineWrap,
          padded: lineWrap === "padded",
        }),
        className
      )}
      scope={scope}
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
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
    };
  }
}

export default forwardRef<TableCellElement, TableCellProps>((props, ref) => (
  <TableCell {...props} forwardedRef={ref} />
));
