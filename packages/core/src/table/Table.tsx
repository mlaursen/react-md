import { cnb } from "cnbuilder";
import type { TableHTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";
import { bem } from "../utils";
import type {
  TableConfigContext,
  TableConfiguration,
} from "./TableConfigurationProvider";
import { TableConfigProvider } from "./TableConfigurationProvider";

const styles = bem("rmd-table");

/** @remarks \@since 6.0.0 */
export interface TableClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  fullWidth?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function table(options: TableClassNameOptions = {}): string {
  const { dense = false, fullWidth = false, className } = options;

  return cnb(styles({ dense, "full-width": fullWidth }), className);
}

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfiguration {}

/**
 * @example
 * Responsive Example
 * ```tsx
 * import {
 *   Table,
 *   TableBody,
 *   TableCell,
 *   TableContainer,
 *   TableHeader,
 *   TableRow,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TableContainer>
 *       <Table>
 *         <TableHeader>
 *           <TableRow>
 *             <TableCell>Header 1</TableCell>
 *             <TableCell>Header 2</TableCell>
 *             <TableCell>Header 3</TableCell>
 *           </TableRow>
 *         </TableHeader>
 *         <TableBody>
 *           <TableRow>
 *             <TableCell>Row 1 Cell 1</TableCell>
 *             <TableCell>Row 1 Cell 2</TableCell>
 *             <TableCell>Row 1 Cell 3</TableCell>
 *           </TableRow>
 *           <TableRow>
 *             <TableCell>Row 2 Cell 1</TableCell>
 *             <TableCell>Row 2 Cell 2</TableCell>
 *             <TableCell>Row 2 Cell 3</TableCell>
 *           </TableRow>
 *           <TableRow>
 *             <TableCell>Row 3 Cell 1</TableCell>
 *             <TableCell>Row 3 Cell 2</TableCell>
 *             <TableCell>Row 3 Cell 3</TableCell>
 *           </TableRow>
 *         </TableBody>
 *       </Table>
 *     </TableContainer>
 *   );
 * }
 * ```
 */
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
