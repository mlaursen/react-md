import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { TableHTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

import type {
  TableConfigContext,
  TableConfiguration,
} from "./TableConfigurationProvider";
import { TableConfigProvider } from "./TableConfigurationProvider";

const styles = bem("rmd-table");

export interface TableClassNameOptions {
  className?: string;
  dense?: boolean;
  fullWidth?: boolean;
}

export function table(options: TableClassNameOptions): string {
  const { dense, fullWidth, className } = options;

  return cnb(styles({ dense, "full-width": fullWidth }), className);
}

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfiguration {}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  props,
  ref
) {
  const {
    className,
    children,
    dense = false,
    hAlign = "left",
    vAlign = "middle",
    lineWrap = false,
    fullWidth = false,
    disableHover = false,
    disableBorders = false,
    ...remaining
  } = props;

  const configuration = useMemo<TableConfigContext>(
    () => ({
      dense,
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableHover,
      disableBorders,
    }),
    [dense, hAlign, vAlign, lineWrap, disableHover, disableBorders]
  );

  return (
    <TableConfigProvider value={configuration}>
      <table
        {...remaining}
        ref={ref}
        className={table({ dense, fullWidth, className })}
      >
        {children}
      </table>
    </TableConfigProvider>
  );
});
