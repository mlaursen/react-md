import type { PropsWithRef } from "@react-md/core";
import { bem, useIcon } from "@react-md/core";
import { cnb } from "cnbuilder";
import type {
  ButtonHTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { forwardRef } from "react";

import type { SortOrder } from "./TableCellContent";
import { TableCellContent } from "./TableCellContent";
import type {
  TableCellConfig,
  TableCellHorizontalAlignment,
  TableCellVerticalAlignment,
} from "./TableConfigurationProvider";
import { useTableConfig } from "./TableConfigurationProvider";

export type TableCellAttributes = Omit<
  | TdHTMLAttributes<HTMLTableCellElement>
  | ThHTMLAttributes<HTMLTableCellElement>,
  "scope"
>;

/**
 * @remarks \@since 6.0.0
 */
export interface TableCellOptions extends TableCellConfig {
  /**
   * This is a bit of a "weird" prop since all it does is apply `width: 100%` to
   * this cell. This will make this specific cell fill the remaining width of
   * the table (if there is any). If no cells have this prop enabled and the
   * `fullWidth` table configuration is enabled, all cells will have an
   * equal-sized width.
   *
   * @defaultValue `false`
   */
  grow?: boolean;

  /**
   * This prop is only valid when the `header` prop is enabled or the
   * `TableCell` is a child of the `TableHeader` component. This will generally
   * be used with a value of `"row"` if you have table headers that are at the
   * start of each row instead of at the top of the table.
   *
   * @defaultValue `"col"`
   */
  scope?: "row" | "col" | "rowgroup" | "colgroup";

  /**
   *
   * @defaultValue `false`
   * @remarks \@since 6.0.0 This prop is only a boolean.
   */
  sticky?: boolean;

  /**
   * @internal
   * @defaultValue `false`
   */
  checkbox?: boolean;
}

/**
 * @remarks \@since 6.0.0 Removed the `colSpan="100%"` support since `colSpan`
 * really only supports numbers.
 */
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
   * icon from the `@react-md/core` package. If you do not want the default
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

  contentProps?: PropsWithRef<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

const styles = bem("rmd-table-cell");

/** @remarks \@since 6.0.0 */
export interface TableCellClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the cell is rendered as a `<th>` so that the correct
   * sticky styles can be applied.
   */
  header: boolean;

  /**
   * Set this to true if the cell is rendered in a `<thead>` so that the correct
   * sticky styles can be applied.
   */
  isInTableHeader: boolean;

  /** @defaultValue `false` */
  grow?: boolean;

  /** @defaultValue `false` */
  sticky?: boolean;

  /** @defaultValue `false` */
  checkbox?: boolean;

  hAlign?: TableCellHorizontalAlignment;
  vAlign?: TableCellVerticalAlignment;

  /** @defaultValue `true` */
  lineWrap?: boolean | "padded";

  /** @defaultValue `false` */
  disablePadding?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tableCell(options: TableCellClassNameOptions): string {
  const {
    grow,
    sticky,
    header,
    checkbox,
    hAlign = "",
    vAlign = "",
    lineWrap = true,
    disablePadding,
    isInTableHeader,
    className,
  } = options;

  return cnb(
    styles({
      grow,
      header,
      sticky,
      checkbox,
      "sticky-cell": sticky && (!isInTableHeader || checkbox),
      "sticky-header": sticky && isInTableHeader,
      "sticky-header-cell": sticky && isInTableHeader && checkbox,
      [hAlign]: hAlign !== "left",
      [vAlign]: vAlign !== "middle",
      vertical: vAlign !== "middle",
      "no-wrap": !lineWrap,
      padded: !disablePadding && lineWrap === "padded",
      "no-padding": disablePadding,
    }),
    className
  );
}

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
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    const {
      "aria-sort": sortOrder,
      className,
      grow = false,
      scope: propScope,
      hAlign: propHAlign,
      vAlign: propVAlign,
      header: propHeader,
      lineWrap: propDisableLineWrap,
      checkbox,
      children,
      sticky,
      sortIcon: propSortIcon,
      sortIconAfter = false,
      sortIconRotated,
      disablePadding,
      contentProps,
      ...remaining
    } = props;

    const sortIcon = useIcon("sort", propSortIcon);
    const isNoPadding = disablePadding ?? !!(sortIcon && sortOrder);

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

    let scope = propScope;
    if (!scope && header) {
      scope = !inheritedHeader && propHeader ? "row" : "col";
    }

    const Component = header ? "th" : "td";
    return (
      <Component
        {...remaining}
        ref={ref}
        aria-sort={sortOrder === "none" ? undefined : sortOrder}
        className={tableCell({
          className,
          grow,
          header,
          sticky,
          checkbox,
          hAlign,
          vAlign,
          lineWrap: !sortOrder && lineWrap,
          disablePadding: isNoPadding,
          isInTableHeader: inheritedHeader,
        })}
        scope={scope}
      >
        <TableCellContent
          {...contentProps}
          icon={sortIcon}
          iconAfter={sortIconAfter}
          sortOrder={sortOrder}
          hAlign={hAlign}
          rotated={sortIconRotated}
        >
          {children}
        </TableCellContent>
      </Component>
    );
  }
);
