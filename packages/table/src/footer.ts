import { createContext, useContext } from "react";

const context = createContext(false);
if (process.env.NODE_ENV !== "production") {
  context.displayName = "TableFooterContext";
}

/**
 * @private
 */
export const { Provider: TableFooterProvider } = context;

/**
 * @private
 */
export function useTableFooter(): boolean {
  return useContext(context);
}
