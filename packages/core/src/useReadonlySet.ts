"use client";
import { useCallback, useState } from "react";
import { type UseStateSetter, type UseStateInitializer } from "./types.js";

/**
 * @since 6.0.0
 */
export interface ReadonlySetOptions<T> {
  /**
   * Sets the behavior for when the
   * {@link ReadonlySetImplementation.toggleValue} is triggered and mostly for
   * internal usage. The default behavior (`"multiple"`) is to work how most
   * would expect:
   * - If the item does not exist in the set, add it.
   * - If the item exists in the set, remove it.
   *
   * Setting this to `"single"` makes it so that only a single item can be in
   * the set at once and will toggle like normal:
   * - If the item does not exist in the set, return a new set only including
   *   the item.
   * - If the item exists in the set, return an empty set.
   * An example usage is the `useExpansionPanels` to allow only a single panel
   * to be expanded at a time.
   *
   * Setting this to `"single-select"` makes it so that only a single item can
   * be in the set at once but will not toggle:
   * - If the item does not exist in the set, return a new set only including
   *   the item.
   * - If the item exists in the set, do nothing
   * An example usage is the `useTreeSelection` to always require at least one
   * tree item to be selected. It is impossible to deselect an item.
   *
   * @defaultValue `"multiple"`
   */
  toggleType?: "single" | "multiple" | "single-select";
  defaultValue?: UseStateInitializer<ReadonlySet<T> | readonly T[]>;
}

/**
 * @since 6.0.0
 */
export interface ReadonlySetImplementation<T> {
  value: ReadonlySet<T>;
  setValue: UseStateSetter<ReadonlySet<T>>;
  toggleValue: (item: T) => void;
}

/**
 * This is most likely an internal only hook to manage state for a
 * `ReadonlySet`. You most likely want to use one of the other hooks that
 * leverage this instead:
 *
 * - `useCheckboxGroup`
 * - `useExpansionPanels`
 * - `useTreeSelection`
 * - `useTreeExpansion`
 * - etc
 *
 * @example Simple Example
 * ```tsx
 * import { cnb } from "cnbuilder";
 * import { useReadonlySet } from "@react-md/core/useReadonlySet";
 *
 * function Example() {
 *   const { value, toggleValue } = useReadonlySet();
 *
 *   return (
 *     <>
 *       {someList.map((item) => (
 *         <div key={item.id} className={cnb(value.has(item.id) && styles.selected)}>
 *           {item.name}
 *           <Button onClick={() => toggleValue(item.id)}>Button</Button>
 *         </div>
 *       ))}
 *     </>
 *   );
 * }
 * ```
 * @since 6.0.0
 */
export function useReadonlySet<T>(
  options: ReadonlySetOptions<T> = {}
): ReadonlySetImplementation<T> {
  const { defaultValue, toggleType = "multiple" } = options;
  const [value, setValue] = useState<ReadonlySet<T>>(() => {
    const initial =
      defaultValue instanceof Function ? defaultValue() : (defaultValue ?? []);

    return new Set(initial);
  });

  const toggleValue = useCallback(
    (item: T) => {
      setValue((prevValue) => {
        const exists = prevValue.has(item);
        if (toggleType === "single") {
          return new Set(exists ? [] : [item]);
        }

        if (toggleType === "single-select") {
          return exists ? prevValue : new Set([item]);
        }

        const nextValue = new Set(prevValue);
        if (exists) {
          nextValue.delete(item);
        } else {
          nextValue.add(item);
        }

        return nextValue;
      });
    },
    [toggleType]
  );

  return {
    value,
    setValue,
    toggleValue,
  };
}
