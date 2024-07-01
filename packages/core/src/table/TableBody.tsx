"use client";
import { cnb } from "cnbuilder";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import {
  TableConfigProvider,
  useTableConfig,
} from "./TableConfigurationProvider.js";
import { type TableConfig, type TableConfigContext } from "./types.js";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Omit<TableConfig, "header"> {}

/**
 * **Client Component**
 *
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    const {
      className,
      children,
      hAlign: propHAlign,
      vAlign: propVAlign,
      lineWrap: propLineWrap,
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
      ...remaining
    } = props;

    // update the table configuration with the custom overrides for the `<thead>`
    const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
      useTableConfig({
        hAlign: propHAlign,
        vAlign: propVAlign,
        lineWrap: propLineWrap,
        disableHover: propDisableHover,
        disableBorders: propDisableBorders,
      });

    const configuration = useMemo<TableConfigContext>(
      () => ({
        header: false,
        dense,
        hAlign,
        vAlign,
        lineWrap,
        disableBorders,
        disableHover,
      }),
      [dense, hAlign, vAlign, lineWrap, disableBorders, disableHover]
    );

    return (
      <TableConfigProvider value={configuration}>
        <tbody {...remaining} ref={ref} className={cnb("rmd-tbody", className)}>
          {children}
        </tbody>
      </TableConfigProvider>
    );
  }
);
