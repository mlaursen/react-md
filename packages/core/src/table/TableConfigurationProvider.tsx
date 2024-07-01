"use client";
import { createContext, useContext } from "react";
import { type TableConfig, type TableConfigContext } from "./types.js";

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
