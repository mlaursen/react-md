"use client";

import { createContext, useContext } from "react";

import { type OptionSelectedIconProps } from "./Option.js";

/**
 * @internal
 * @since 6.0.0
 */
export interface ListboxContext extends OptionSelectedIconProps {
  // NOTE: These are not converted to arrow functions so the option can be
  // inferred correctly
  selectOption(option: unknown): void;
  isOptionSelected(option: unknown): boolean;
}

const context = createContext<ListboxContext | null>(null);

/**
 * **Client Component**
 *
 * @internal
 * @since 6.0.0
 */
export const { Provider: ListboxProvider } = context;

/**
 * @internal
 * @since 6.0.0
 */
export function useListboxContext(): ListboxContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("The `ListboxProvider` must be a parent component");
  }

  return value;
}
