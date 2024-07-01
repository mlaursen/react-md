"use client";
import { useMemo } from "react";
import { useTableConfig } from "./TableConfigurationProvider.js";
import {
  type TableConfigContext,
  type TableSectionConfiguration,
} from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface TableSectionConfigOptions extends TableSectionConfiguration {
  type: "header" | "footer";
}

/**
 * @since 6.0.0
 * @internal
 */
export function useTableSectionConfig(
  options: TableSectionConfigOptions
): Readonly<TableConfigContext> {
  const { type, lineWrap: propLineWrap, hoverable } = options;

  // update the table configuration with the custom overrides for the `<thead>/<tfoot>`
  const { dense, hAlign, vAlign, lineWrap, disableHover, disableBorders } =
    useTableConfig({
      lineWrap: propLineWrap,
      disableHover: !hoverable,
    });

  return useMemo<TableConfigContext>(
    () => ({
      dense,
      header: type === "header",
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [dense, type, hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );
}
