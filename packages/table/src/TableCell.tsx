import React, {
  forwardRef,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { TableCellConfig, useTableConfig } from "./config";
import { useTableFooter } from "./footer";
import { useSticky } from "./sticky";
import { SortOrder, TableCellContent } from "./TableCellContent";

export type TableCellElement =
  | HTMLTableDataCellElement
  | HTMLTableHeaderCellElement;

export type TableCellAttributes = Omit<
  | TdHTMLAttributes<HTMLTableDataCellElement>
  | ThHTMLAttributes<HTMLTableHeaderCellElement>,
  "colSpan" | "scope"
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
   * The number of columns that the cell should span. If you would like a cell
   * to span an entire row ignoring the other rows and cells, you can set this
   * value to the number of columns within your table or `"100%"`.
   */
  colSpan?: number | "100%";

  /**
   * If this is a trueish value, the cell will become a sticky cell that will be
   * fixed while the user scrolls the table. When this is a `boolean` (or
   * inherited from a `TableHeader`) or set to `"header"`, the cell will act as
   * a sticky header that will be visible for vertical scrolling.
   *
   * When this is set to `"cell"`, the cell will be fixed to the left or right
   * for horizontal scrolling.
   *
   * Finally, if this is set to `"header-cell"`, it will be a combination of
   * both vertical and horizontal scrolling. This means that other sticky header
   * cells will scroll beneath this cell.
   */
  sticky?: boolean | "header" | "cell" | "header-cell";
}

export interface TableCellProps extends TableCellAttributes, TableCellOptions {
  /**
   * If you want to apply a sort icon for a header cell, set this prop to either
   * `"ascending"` or `"descending"`. When you change the sort order, this prop
   * should change as well which will cause the sort icon to rotate. The default
   * behavior is to have the icon facing upwards and not-rotated when
   * `"ascending"`, otherwise it will rotate downwards when `"descending"`.
   *
   * If this prop is set to `"none"`, the cell will render the clickable button
   * in the children, just without the sort icon. This is so that the sort
   * behavior can still be toggled for keyboard users and will be tab-focusable.
   */
  "aria-sort"?: SortOrder;

  /**
   * An optional sort icon to use. This will be defaulted to the configured sort
   * icon from the `@react-md/icon` package. If you do not want the default
   * implementation for the sort icon behavior from `react-md`, you can set this
   * prop to `null`.
   */
  sortIcon?: ReactNode;

  /**
   * Boolean if the sort icon should appear after the children in the cell
   * instead of before.
   */
  sortIconAfter?: boolean;

  /**
   * Boolean if the sort icon should be rotated instead of the default
   * direction. When this is `undefined`, it will only be `true` when the
   * `"aria-sort"` prop is set to `"descending"`. If this is not `undefined`,
   * its boolean value will always be used.
   */
  sortIconRotated?: boolean;

  /**
   * Boolean if cell should no longer have any padding since you want a child
   * element to span the entire size of the cell instead. This is helpful when
   * rendering clickable and focusable elements within a cell.
   *
   * This will be defaulted to `true` if the `"aria-sort"` prop has been
   * provided and the `sortIcon` is not resoled as `null`. You can override this
   * default behavior by manually setting this to `true` or `false`.
   */
  disablePadding?: boolean;
}

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
export const TableCell = forwardRef<TableCellElement, TableCellProps>(
  function TableCell(
    {
      "aria-sort": sortOrder,
      id,
      className,
      grow = false,
      scope: propScope,
      hAlign: propHAlign,
      vAlign: propVAlign,
      header: propHeader,
      lineWrap: propDisableLineWrap,
      children,
      sticky: propSticky,
      sortIcon: propSortIcon,
      sortIconAfter = false,
      sortIconRotated,
      disablePadding,
      colSpan: propColSpan,
      ...props
    },
    ref
  ) {
    // have to double cast to get the `100%` value to work.
    const colSpan = propColSpan as unknown as number;
    const sortIcon = useIcon("sort", propSortIcon);
    const isNoPadding = disablePadding ?? (sortIcon && sortOrder);

    // Note: unlike the other usages of `useTableConfig`, the `propHeader`
    // is not provided. This is so that `TableCheckbox` components can still
    // be a sticky header without being rendered as a `<th>`. This also makes
    // it so the scope can be defaulted to `col` or `row` automatically.
    const {
      header: inheritedHeader,
      hAlign,
      vAlign,
      lineWrap,
    } = useTableConfig({
      hAlign: propHAlign,
      vAlign: propVAlign,
      lineWrap: propDisableLineWrap,
    });
    const header = propHeader ?? inheritedHeader;
    const footer = useTableFooter();
    const sticky = useSticky(propSticky);
    const isStickyCell = propSticky === "cell" || (!header && sticky);
    const isStickyHeader = propSticky === "header";
    const isStickyFooter = sticky && footer;
    const isStickyFooterCell =
      isStickyFooter && (propColSpan === "100%" || propColSpan === 0);
    const isStickyAbove = propSticky === "header-cell" || isStickyFooterCell;

    let scope = propScope;
    if (!scope && header) {
      scope = !inheritedHeader && propHeader ? "row" : "col";
    }

    const Component = header ? "th" : "td";
    return (
      <Component
        {...props}
        ref={ref}
        id={id}
        aria-sort={sortOrder === "none" ? undefined : sortOrder}
        colSpan={colSpan}
        className={cn(
          block({
            grow,
            header,
            sticky,
            "sticky-header":
              (header && sticky && propSticky !== "cell") ||
              isStickyHeader ||
              isStickyAbove,
            "sticky-cell": isStickyCell || isStickyAbove || isStickyFooterCell,
            "sticky-footer": isStickyFooter,
            "sticky-above": isStickyAbove,
            [hAlign]: hAlign !== "left",
            [vAlign]: vAlign !== "middle",
            vertical: vAlign !== "middle",
            "no-wrap": !lineWrap,
            padded: !isNoPadding && lineWrap === "padded",
            "no-padding": isNoPadding,
          }),
          className
        )}
        scope={scope}
      >
        <TableCellContent
          id={id ? `${id}-sort` : undefined}
          icon={sortIcon}
          iconAfter={sortIconAfter}
          sortOrder={sortOrder}
          rotated={sortIconRotated}
        >
          {children}
        </TableCellContent>
      </Component>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableCell.propTypes = {
      "aria-sort": PropTypes.oneOf([
        "ascending",
        "descending",
        "none",
        "other",
      ]),
      id: PropTypes.string,
      colSpan: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["100%"]),
      ]),
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
      sortIcon: PropTypes.node,
      sortIconAfter: PropTypes.bool,
      sortIconRotated: PropTypes.bool,
      disablePadding: PropTypes.bool,
      children: PropTypes.node,
      sticky: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["header", "cell", "header-cell"]),
      ]),
    };
  } catch (e) {}
}
