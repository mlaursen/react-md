"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils/bem.js";
import type { TableRowConfiguration } from "./TableConfigurationProvider.js";
import { useTableConfig } from "./TableConfigurationProvider.js";

const styles = bem("rmd-tr");

/** @remarks \@since 6.0.0 */
export interface TableRowClassNameOptions {
  className?: string;
  disableHover?: boolean;
  disableBorders?: boolean;
  selected?: boolean;
  clickable?: boolean;
}

/** @remarks \@since 6.0.0 */
export function tableRow(options: TableRowClassNameOptions = {}): string {
  const { disableHover, disableBorders, selected, clickable, className } =
    options;
  return cnb(
    styles({
      bordered: !disableBorders,
      hoverable: !disableHover,
      clickable,
      selected,
    }),
    className
  );
}

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowConfiguration {
  /**
   * Boolean if the current row has been selected and should apply the selected
   * background-color.
   *
   * @defaultValue `false`
   */
  selected?: boolean;

  /**
   * Boolean if the row should be clickable and update the cursor while hovered
   * to be a pointer.
   *
   * @defaultValue `false`
   */
  clickable?: boolean;
}

/**
 * **Client Component**
 *
 * Creates a `<tr>` element with some general styles that are inherited from the
 * base table configuration.
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const {
      className,
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
      children,
      selected = false,
      clickable = false,
      ...remaining
    } = props;

    const { disableHover, disableBorders } = useTableConfig({
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
    });

    return (
      <tr
        {...remaining}
        ref={ref}
        className={tableRow({
          selected,
          clickable,
          disableHover,
          disableBorders,
          className,
        })}
      >
        {children}
      </tr>
    );
  }
);
