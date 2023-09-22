"use client";
import { createContext, useContext, type RefObject } from "react";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface TableContainerContext {
  exists: boolean;
  containerRef: RefObject<HTMLDivElement>;
}

const context = createContext<Readonly<TableContainerContext>>({
  exists: false,
  containerRef: { current: null },
});
context.displayName = "TableContainer";

/**
 * **Client Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export const { Provider: TableContainerProvider } = context;

/**
 * This is used to implement the sticky header and footer intersection observer
 * behavior.
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function useTableContainer(): Readonly<TableContainerContext> {
  return useContext(context);
}
