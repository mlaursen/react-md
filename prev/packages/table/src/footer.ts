import { createContext, useContext } from "react";

const context = createContext(false);
if (process.env.NODE_ENV !== "production") {
  context.displayName = "TableFooterContext";
}

/**
 * @internal
 */
export const { Provider: TableFooterProvider } = context;

/**
 * @internal
 */
export function useTableFooter(): boolean {
  return useContext(context);
}
