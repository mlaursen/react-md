import { ReactNode } from "react";
import { caseInsensitiveFilter, fuzzyFilter } from "@react-md/utils";

import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  FilterFunction,
} from "./types";

/**
 * Generates an id for each result in the autocomplete's listbox.
 *
 * @param id - The listbox's id
 * @param index - The index of the result in the list
 * @returns an id string
 */
export function getResultId(id: string, index: number): string {
  return `${id}-result-${index + 1}`;
}

/**
 * Gets a renderable label for each result in the autocomplete's listbox. This
 * will be applied as the `children` for the `Option` element.
 *
 * @param datum - The current result datum to get a label for
 * @param labelKey - The key to extract a label from if the datum is an object
 * @param query - The current search query. This is useful if you want to
 * implement text "highlighting" (bold) of all the letters that match in the
 * item.
 * @returns a renderable node to display
 */
export function getResultLabel(
  datum: Readonly<AutoCompleteData>,
  labelKey: string,
  _query: string
): ReactNode {
  if (typeof datum === "string") {
    return datum;
  }

  const label = datum[labelKey];
  return datum.children || (typeof label === "undefined" ? null : label);
}

/**
 * Gets a value string from each result that can be searched.
 *
 * @param datum - The current result datum that should have a string extracted
 * @param valueKey - The key to use to extract a string value from if the datum
 * is an object
 * @returns a searchable string.
 */
export function getResultValue(
  datum: Readonly<AutoCompleteData>,
  valueKey: string
): string {
  if (typeof datum === "string") {
    return datum;
  }

  const value = datum[valueKey];
  if (
    process.env.NODE_ENV !== "production" &&
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    throw new Error("Unable to extract a result value string");
  }

  return `${value}`;
}

/**
 * This is used to disable filtering and just return the data list immediately.
 * Useful when the filtering is done somewhere else like a server/API
 * @internal
 */
export const noFilter: FilterFunction = (_, data) => data;

/**
 * Gets the filter function to use within the Autocomplete based on the provided
 * filter prop
 *
 * @internal
 */
export function getFilterFunction<O extends {} = {}>(
  filter: AutoCompleteFilterFunction<O>
): FilterFunction<O> {
  if (typeof filter === "function") {
    return filter;
  }

  switch (filter) {
    case "fuzzy":
      return fuzzyFilter;
    case "case-insensitive":
      return caseInsensitiveFilter;
    case "none":
      return noFilter;
    default:
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          `Invalid filter function: "${filter}". Supported values are: "fuzzy", "case-insenitive", "none", or a custom function.`
        );
      }

      return noFilter;
  }
}

/**
 * This is an extremely simple type guard that is useful when using the
 * `onAutoComplete` handler since I'm terrible at typescript types. This will
 * ensure that if the result is an object, it will match the provided data type
 * of your data list.
 *
 * Example:
 *
 * ```ts
 * interface Example {
 *   name: string;
 *   value: string;
 * }
 *
 *
 * const [example, setExample] = useState<Example | null>(null);
 * const onAutoComplete = useCallback<AuoCompleteHandler>((_name, example) => {
 *   if (isResultOf<Example>(example)) {
 *     setExample(example);
 *   }
 * }, [])
 * ```
 *
 * @param datum - The result data to type guard against.
 */
export function isResultOf<T extends {}>(
  datum: Readonly<AutoCompleteData>
): datum is T {
  return !!datum && typeof datum === "object";
}
