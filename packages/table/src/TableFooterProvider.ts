import { createContext, useContext } from "react";

const context = createContext(false);
context.displayName = "TableFooter";

/**
 * @internal
 */
export function useTableFooter(): boolean {
  return useContext(context);
}

/**
 * @internal
 */
export const { Provider: TableFooterProvider } = context;
