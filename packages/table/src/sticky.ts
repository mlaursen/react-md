import { createContext, useContext } from "react";

const context = createContext(false);

/**
 * A quick way to conditionally inherit the sticky context within a table.  If
 * the sticky prop was defined and a boolean, it will be used. Otherwise the
 * inherited context value will be used.
 * @internal
 */
export function useSticky(sticky: boolean | string | undefined): boolean {
  const isSticky = useContext(context);

  return typeof sticky !== "undefined" ? !!sticky : isSticky;
}

/**
 * @internal
 */
export const { Provider: StickyTableProvider } = context;
