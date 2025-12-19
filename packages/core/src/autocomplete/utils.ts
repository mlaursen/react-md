import { type RefObject } from "react";

import {
  type EditableHTMLElement,
  triggerManualChangeEvent,
} from "../form/utils.js";
import { type NonNullMutableRef, type UseStateInitializer } from "../types.js";
import { noopAutocompleteFilter } from "./defaults.js";
import {
  type AutocompleteFilterOptions,
  type AutocompleteGetOptionLabel,
  type AutocompleteOption,
} from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface GetDefaultValueOptions<
  Option extends AutocompleteOption,
> extends Required<AutocompleteGetOptionLabel<Option>> {
  query: string | undefined;
  multiselect?: boolean;
  defaultQuery: UseStateInitializer<string> | undefined;
  defaultValue:
    | UseStateInitializer<Option | null | readonly Option[]>
    | undefined;
  options: readonly Option[];
  filter: (options: AutocompleteFilterOptions<Option>) => readonly Option[];
}

/**
 * @since 6.0.0
 * @internal
 */
export function getDefaultValue<Option extends AutocompleteOption>(
  options: GetDefaultValueOptions<Option>
): UseStateInitializer<Option | null | readonly Option[]> {
  const {
    query,
    filter,
    multiselect,
    defaultQuery,
    defaultValue,
    options: values,
    getOptionLabel,
  } = options;

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  // do not support determining the default value for a multiselect
  // autocomplete if only a query was provided.
  if (multiselect) {
    return [];
  }

  // do not support a default value out of the box for this case
  if (filter === noopAutocompleteFilter) {
    return null;
  }

  return () => {
    let q = "";
    if (query) {
      q = query;
    } else if (defaultQuery) {
      q = typeof defaultQuery === "function" ? defaultQuery() : defaultQuery;
    }

    if (!q) {
      return null;
    }

    const filtered = filter({
      list: values,
      query: q,
      extractor: getOptionLabel,
    });

    return filtered[0] ?? null;
  };
}

/**
 * @since 6.0.0
 * @internal
 */
interface GetDefaultQueryOptions<
  Option extends AutocompleteOption,
> extends Required<AutocompleteGetOptionLabel<Option>> {
  value: Option | null | readonly Option[];
  defaultQuery?: UseStateInitializer<string>;
}

/**
 * @since 6.0.0
 * @internal
 */
export function getDefaultQuery<Option extends AutocompleteOption>(
  options: GetDefaultQueryOptions<Option>
): UseStateInitializer<string> {
  const { value, getOptionLabel, defaultQuery } = options;

  if (defaultQuery) {
    return defaultQuery;
  }

  return () => {
    if (typeof value === "string") {
      return value;
    }

    if (value && typeof value === "object" && !("length" in value)) {
      return getOptionLabel(value);
    }

    return "";
  };
}

/**
 * @since 6.0.0
 * @internal
 */
export interface EnforceSelectedValueOptions<
  Option extends AutocompleteOption,
> extends Required<AutocompleteGetOptionLabel<Option>> {
  value: Option | readonly Option[] | null;
  visible: boolean;
  container: HTMLElement | null;
  popupRef: RefObject<HTMLElement>;
  comboboxRef: RefObject<EditableHTMLElement>;
  availableOptions: readonly Option[];
  prevAvailableOptions: NonNullMutableRef<readonly Option[] | null>;
}

/**
 * This enforces that if the user clicks away, touches somewhere else on the
 * page, tabs to the next element, or focuses another element programmatically
 * the autocomplete will set the `value` back to the previous selected value if
 * there was one. i.e.
 *
 * Case 1:
 * - User selects "Apple"
 * - User hits backspace twice. Input displays "App"
 * - User clicks somewhere else on the page
 * - Input now displays "Apple" again
 *
 * Case 2:
 * - User selects "Apple"
 * - User clears the input
 * - User types "app"
 * - User clicks somewhere else on the page
 * - Input now displays "" and the value is set to `null`
 *
 * NOTE: This mutates the {@link EnforceSelectedValueOptions.prevAvailableOptions}
 *
 * @since 6.0.0
 * @internal
 */
export function enforceSelectedValue<Option extends AutocompleteOption>(
  options: EnforceSelectedValueOptions<Option>
): void {
  const {
    value,
    visible,
    container,
    popupRef,
    comboboxRef,
    getOptionLabel,
    availableOptions,
    prevAvailableOptions,
  } = options;

  if (!container) {
    return;
  }

  globalThis.requestAnimationFrame(() => {
    if (
      container.contains(document.activeElement) ||
      popupRef.current?.contains(document.activeElement)
    ) {
      return;
    }

    if (visible) {
      // this makes it so that the options are not filtered again while closing
      prevAvailableOptions.current = availableOptions;
    }

    let label = "";
    if (typeof value === "string") {
      label = value;
    } else if (typeof value === "object" && value && !("length" in value)) {
      label = getOptionLabel(value);
    }

    triggerManualChangeEvent(comboboxRef.current, label);
  });
}

/**
 * @since 6.0.0
 * @internal
 */
export function isMultipleValues<Option extends AutocompleteOption>(
  value: Option | null | readonly Option[]
): value is readonly Option[] {
  return !!value && typeof value === "object" && "length" in value;
}
