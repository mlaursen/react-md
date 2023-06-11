import { createContext, useContext } from "react";

const noop = (): void => {
  // do nothing
};

const context = createContext(noop);
context.displayName = "RemoveToast";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const { Provider: RemoveToastProvider } = context;

/**
 * This is only required if you have multiple `Snackbar` implementations in your
 * app.
 *
 * @remarks \@since 6.0.0
 */
export function useRemoveToast(): () => void {
  return useContext(context);
}
