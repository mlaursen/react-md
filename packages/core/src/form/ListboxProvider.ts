"use client";
import { createContext, useContext } from "react";

/**
 * @internal
 * @since 6.0.0
 */
export interface ListboxContext {
  selectOption(option: unknown): void;
  isOptionSelected(option: unknown): boolean;

  /** Convenience pass-through value */
  selectedIconAfter?: boolean;
  /** Convenience pass-through value */
  disableSelectedIcon?: boolean;
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
