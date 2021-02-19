import { createContext, useContext } from "react";

// interfaces that are "public" should be the full word `Configuration` while
// the private/internal should just be `Config`. "Great" naming convention!

export interface TableRowConfiguration {
  /**
   * Boolean if the rows should no longer applied a different background color
   * when hovered.
   */
  disableHover?: boolean;

  /**
   * Boolean if the table should no longer have a border-bottom applied to each
   * row within the `<tbody>`.
   */
  disableBorders?: boolean;
}

export type TableCellHorizontalAlignment = "left" | "center" | "right";
export type TableCellVerticalAlignment = "top" | "middle" | "bottom";

export interface TableCellConfiguration {
  /**
   * The horizontal alignment for the content within a cell.
   *
   * Note: Table default behavior is to align to the left.
   */
  hAlign?: TableCellHorizontalAlignment;

  /**
   * The vertical alignment for the content within a cell.
   *
   * Note: When this is set to `"top"` or `"bottom"`, `padding-top` or
   * `padding-bottom` will also be applied due to how styling tables work. This
   * padding can be configured with the `$rmd-table-cell-vertical-padding` or
   * `$rmd-table-cell-vertical-alignments` variables.
   */
  vAlign?: TableCellVerticalAlignment;

  /**
   * Boolean if the `<td>` and `<th>` cells should support line wrapping. This
   * is disabled by default since you _normally_ don't want line wrapping in
   * tables unless it provides additional descriptions or other content.
   *
   * If this is set to the string `"padded"`, line wrapping will be enabled
   * along with adding some additional vertical padding to each cell.
   */
  lineWrap?: boolean | "padded";
}

/**
 * This is the public table configuration that can be used.
 */
export interface TableConfiguration
  extends TableRowConfiguration,
    TableCellConfiguration {
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

export interface TableConfig extends TableRowConfiguration, TableCellConfig {}
export type TableConfigContext = Required<TableConfig>;

const context = createContext<TableConfigContext>({
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
  const header = options.header ?? inherited.header;
  const hAlign = options.hAlign ?? inherited.hAlign;
  const vAlign = options.vAlign ?? inherited.vAlign;
  const lineWrap = options.lineWrap ?? inherited.lineWrap;
  const disableHover = options.disableHover ?? inherited.disableHover;
  const disableBorders = options.disableBorders ?? inherited.disableBorders;

  return {
    header,
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
  };
}

/**
 * @internal
 */
export const { Provider: TableConfigProvider } = context;
