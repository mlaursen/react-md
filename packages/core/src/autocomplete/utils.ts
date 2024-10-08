import { type UseStateInitializer } from "../types.js";
import { noopAutocompleteFilter } from "./defaults.js";
import {
  type AutocompleteFilterOptions,
  type AutocompleteOption,
} from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface GetDefaultValueOptions<Option extends AutocompleteOption> {
  query: string | undefined;
  multiselect?: boolean;
  defaultQuery: UseStateInitializer<string> | undefined;
  defaultValue:
    | UseStateInitializer<Option | null | readonly Option[]>
    | undefined;
  options: readonly Option[];
  getOptionLabel(value: Option): string;
  filter(options: AutocompleteFilterOptions<Option>): readonly Option[];
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

  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  // do not support determining the default value for a multiselect
  // autocomplete if only a query was provided.
  if (multiselect) {
    return [];
  }

  return () => {
    let q = "";
    if (query) {
      q = query;
    } else if (defaultQuery) {
      q = defaultQuery instanceof Function ? defaultQuery() : defaultQuery;
    }

    if (!q) {
      return null;
    }

    if (filter === noopAutocompleteFilter) {
      return values[0] ?? null;
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
interface GetDefaultQueryOptions<Option extends AutocompleteOption> {
  value: Option | null | readonly Option[];
  getOptionLabel(option: Option): string;
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
