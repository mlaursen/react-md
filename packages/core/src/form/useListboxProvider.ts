"use client";
import { createContext, useContext, type RefObject } from "react";
import { type ChangeableHTMLElement } from "./utils.js";

/**
 * @internal
 * \@remarks \@since 6.0.0
 */
export interface ListboxContext {
  /**
   * This ref is used to trigger the change event when an option is clicked.
   */
  inputRef: RefObject<ChangeableHTMLElement>;

  /**
   * This is used within the `Option` component to determine if it is currently
   * selected or not.
   */
  currentValue: string | number | null;

  selectedIconAfter: boolean;
  disableSelectedIcon: boolean;
}

const context = createContext<ListboxContext | null>(null);

/**
 * **Client Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export const { Provider: ListboxProvider } = context;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useListboxContext(): ListboxContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("The `ListboxProvider` must be a parent component");
  }
  return value;
}
