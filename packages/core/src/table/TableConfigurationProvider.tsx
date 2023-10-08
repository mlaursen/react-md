"use client";
import { createContext, useContext } from "react";

// interfaces that are "public" should be the full word `Configuration` while
// the private/internal should just be `Config`. "Great" naming convention!

export interface TableRowConfiguration {
  /**
   * Set to `true` if rows should no longer change background color while
   * hovered.
   *
   * @defaultValue `false`
   */
  disableHover?: boolean;

  /**
   * Set to `true` if the rows in the `TableBody` should no longer have borders
   * applied.
   *
   * @defaultValue `false`
   */
  disableBorders?: boolean;
}

/**
 * The horizontal alignment for the content within a cell.
 *
 * Note: Table default behavior is to align to the left.
 */
export type TableCellHorizontalAlignment = "left" | "center" | "right";

/**
 * The vertical alignment for the content within a cell.
 *
 * Note: When this is set to `"top"` or `"bottom"`, `padding-top` or
 * `padding-bottom` will also be applied due to how styling tables work.
 */
export type TableCellVerticalAlignment = "top" | "middle" | "bottom";

export interface TableCellConfiguration {
  hAlign?: TableCellHorizontalAlignment;
  vAlign?: TableCellVerticalAlignment;

  /**
   * Set this to `true` to allow `TableCell` content to line wrap.
   *
   * @defaultValue `false`
   */
  lineWrap?: boolean;
}

/**
 * @internal
 */
export interface TableCellConfig extends TableCellConfiguration {
  /**
   * Boolean if all the `TableCell` components should be rendered as a `<th>`
   * instead of a `<td>`. This is really just a convenience prop for the
   * `TableHeader` component so the user of `react-md` doesn't need to keep
   * setting the `type="th"` fot the `TableCell` if using the low-level
   * components.
   *
   * @internal
   */
  header?: boolean;
}

export interface TableConfig extends TableRowConfiguration, TableCellConfig {
  /**
   * Set this to `true` to decrease the height of all cells within the table.
   *
   * @defaultValue `false`
   */
  dense?: boolean;
}

export interface TableConfiguration extends TableConfig {
  /**
   * Set this to `true` to allow the table to span the full width of the
   * container element instead of having the width be determined by the content
   * within the table.
   *
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

export type TableConfigContext = Required<TableConfig>;

const context = createContext<TableConfigContext>({
  dense: false,
  header: false,
  hAlign: "left",
  vAlign: "middle",
  lineWrap: false,
  disableHover: false,
  disableBorders: false,
});

/**
 * An internal hook for getting the current table configuration in child
 * components for the table. This will use the inherited table configuration
 * context if the prop value is `undefined`.
 *
 * @internal
 */
export function useTableConfig(options: TableConfig): TableConfigContext {
  const inherited = useContext(context);
  const dense = options.dense ?? inherited.dense;
  const header = options.header ?? inherited.header;
  const hAlign = options.hAlign ?? inherited.hAlign;
  const vAlign = options.vAlign ?? inherited.vAlign;
  const lineWrap = options.lineWrap ?? inherited.lineWrap;
  const disableHover = options.disableHover ?? inherited.disableHover;
  const disableBorders = options.disableBorders ?? inherited.disableBorders;

  return {
    dense,
    header,
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
  };
}

/**
 * **Client Component**
 *
 * @internal
 */
export const { Provider: TableConfigProvider } = context;
