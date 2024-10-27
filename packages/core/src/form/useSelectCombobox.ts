"use client";
import {
  useCombobox,
  type ComboboxImplementation,
  type ConfigurableComboboxOptions,
} from "./useCombobox.js";

/**
 * @since 6.0.0
 */
export interface SelectComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ConfigurableComboboxOptions<ComboboxEl, PopupEl> {
  value: string;
  values: readonly string[];
}

/**
 * @since 6.0.0
 */
export type SelectComboboxImplementation<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> = ComboboxImplementation<ComboboxEl, PopupEl>;

/**
 * @since 6.0.0
 */
export function useSelectCombobox<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: SelectComboboxOptions<ComboboxEl, PopupEl>
): SelectComboboxImplementation<ComboboxEl, PopupEl> {
  const { value, values, ...comboboxOptions } = options;

  return useCombobox({
    ...comboboxOptions,
    searchable: true,
    extendKeyDown(movementData) {
      const { event, show, focusLast, visible } = movementData;
      if (visible) {
        return;
      }

      switch (event.key) {
        case " ":
        case "Home":
        case "End":
          event.preventDefault();
          event.stopPropagation();
          focusLast.current = event.key === "End";
          show();
          break;
      }
    },
    getEnterDefaultFocusedIndex(options) {
      const { focusLast } = options;
      if (focusLast && !value) {
        return values.length - 1;
      }

      return Math.max(
        0,
        values.findIndex((option) => option === value)
      );
    },
  });
}
