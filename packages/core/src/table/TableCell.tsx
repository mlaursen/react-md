"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cssUtils } from "../cssUtils.js";
import { getIcon } from "../icon/iconConfig.js";
import { type PropsWithRef } from "../types.js";
import { TableCellContent, type SortOrder } from "./TableCellContent.js";
import {
  useTableConfig,
  type TableCellConfig,
  type TableCellHorizontalAlignment,
  type TableCellVerticalAlignment,
} from "./TableConfigurationProvider.js";

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
   *
   * @see {@link beforeChildren}
   * @see {@link afterChildren}
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
   * @defaultValue `"horizontal"`
   */
  padding?: "horizontal" | "vertical" | "none";

  /**
   * This can be used to apply styling or any other props to the
   * `UnstyledButton` that surrounds the `children` when the `"aria-sort"` prop
   * has been provided.
   *
   * @remarks \@since 6.0.0
   */
  contentProps?: PropsWithRef<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

  /**
   * Since providing an `aria-sort` prop will wrap the `children` in an
   * `UnstyledButton`, you can use this prop to render another button within the
   * table cell before the main `children`.
   *
   * @see {@link afterChildren} for an example.
   * @remarks \@since 6.0.0
   */
  beforeChildren?: ReactNode;

  /**
   * Since providing an `aria-sort` prop will wrap the `children` in an
   * `UnstyledButton`, you can use this prop to render another button within the
   * table cell before the main `children`.
   *
   * @example
   * ```tsx
   * import type { SortOrder } from "@react-md/core";
   * import { Button, Dialog, TableCell } from "@react-md/core";
   * import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
   * import type { ReactElement } from "react";
   * import { useState } from "react";
   *
   * interface Props {
   *   setSort(sort: string): void;
   *   sortKey: string;
   *   sortOrder: SortOrder;
   * }
   *
   * function Example({ sortKey, sortOrder, setSort }: Props): ReactElement {
   *   const [visible, setVisible] = useState(false);
   *
   *   return (
   *     <>
   *       <TableCell
   *         aria-sort={sortKey === "example" ? sortOrder : "none"}
   *         onClick={() => setSort("example")}
   *         afterChildren={
   *           <Button
   *             aria-label="Options"
   *             buttonType="icon"
   *             onClick={() => {
   *               setVisible(true)
   *             }}
   *           >
   *             <MoreVertIcon />
   *           </Button>
   *         }
   *       >
   *         Example content
   *       </TableCell>
   *       <Dialog
   *         aria-label="Options"
   *         visible={visible}
   *         onRequestClose={() => setVisible(false)}
   *       >
   *         Pretend Content...
   *       </Dialog>
   *     </>
   *   );
   * }
   * ```
   *
   * @remarks \@since 6.0.0
   */
  afterChildren?: ReactNode;
}

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
  lineWrap?: boolean;

  /**
   * @defaultValue `"horizontal"`
   */
  padding?: "horizontal" | "vertical" | "none";
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
    hAlign,
    vAlign,
    lineWrap = true,
    padding = "horizontal",
    isInTableHeader,
    className,
  } = options;

  // using `&&` instead of `bem` since the latest version of typescript does not
  // support setting the same object key (empty string)
  const p = "rmd-table-cell--";
  return cnb(
    "rmd-table-cell",
    grow && `${p}grow`,
    header && `${p}header`,
    sticky && `${p}sticky`,
    checkbox && `${p}checkbox`,
    sticky && (!isInTableHeader || checkbox) && `${p}sticky-cell`,
    sticky && isInTableHeader && `${p}sticky-header`,
    sticky && isInTableHeader && checkbox && `${p}header-cell`,
    vAlign && vAlign !== "middle" && `${p}${vAlign}`,
    !lineWrap && `${p}no-wrap`,
    padding === "vertical" && `${p}v-padding`,
    padding === "none" && `${p}no-padding`,
    cssUtils({
      textAlign: hAlign,
    }),
    className
  );
}

/**
 * **Client Component**
 *
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
      beforeChildren,
      afterChildren,
      sticky,
      sortIcon: propSortIcon,
      sortIconAfter = false,
      sortIconRotated,
      padding = "horizontal",
      contentProps,
      ...remaining
    } = props;

    const sortIcon = getIcon("sort", propSortIcon);

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
          padding: sortIcon && sortOrder ? "none" : padding,
          isInTableHeader: inheritedHeader,
        })}
        scope={scope}
      >
        {beforeChildren}
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
        {afterChildren}
      </Component>
    );
  }
);
