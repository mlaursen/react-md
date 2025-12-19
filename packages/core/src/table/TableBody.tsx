"use client";

import { cnb } from "cnbuilder";
import {
  type HTMLAttributes,
  type ReactElement,
  type Ref,
  useMemo,
} from "react";

import {
  TableConfigProvider,
  useTableConfig,
} from "./TableConfigurationProvider.js";
import { type TableConfig, type TableConfigContext } from "./types.js";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>, Omit<TableConfig, "header"> {
  ref?: Ref<HTMLTableSectionElement>;
}

/**
 * **Client Component**
 *
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 */
export function TableBody(props: TableBodyProps): ReactElement {
  const {
    ref,
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
