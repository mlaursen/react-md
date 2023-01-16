import type { RefObject } from "react";
import { createContext, useContext } from "react";

/**
 * @internal
 * \@remarks \@since 6.0.0
 */
export interface ListboxContext {
  /**
   * This ref is used to trigger the change event when an option is clicked.
   */
  inputRef: RefObject<HTMLInputElement>;

  /**
   * This is used within the `Option` component to determine if it is currently
   * selected or not.
   */
  currentValue: string | number | null;
}

const context = createContext<ListboxContext>({
  inputRef: { current: null },
  currentValue: null,
});

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export const { Provider: ListboxProvider } = context;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useListboxContext(): ListboxContext {
  return useContext(context);
}
