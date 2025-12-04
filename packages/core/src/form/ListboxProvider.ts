"use client";

import { type Dispatch, createContext, useContext, useMemo } from "react";

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

/**
 * @since 6.0.0
 * @internal
 */
export type ListboxValue = string | number | null | object;

/**
 * @since 6.3.0
 */
export interface ListboxProviderOptions<
  Value extends ListboxValue,
> extends OptionSelectedIconProps {
  value: ListboxValue | readonly NonNullable<ListboxValue>[];
  setValue: Dispatch<NonNullable<Value>>;
}

/**
 * @since 6.3.0
 */
export function useListboxProvider<Value extends ListboxValue>(
  options: ListboxProviderOptions<Value>
): ListboxContext {
  const {
    value,
    setValue,
    selectedIconAfter,
    selectedIcon,
    unselectedIcon,
    disableSelectedIcon,
  } = options;

  const values = useMemo(() => {
    if (Array.isArray(value)) {
      return new Set(value);
    }

    return new Set([value]);
  }, [value]);

  return useMemo(
    () => ({
      selectOption: setValue,
      isOptionSelected(option) {
        return values.has(option);
      },
      selectedIcon,
      unselectedIcon,
      selectedIconAfter,
      disableSelectedIcon,
    }),
    [
      disableSelectedIcon,
      selectedIcon,
      selectedIconAfter,
      setValue,
      unselectedIcon,
      values,
    ]
  );
}
