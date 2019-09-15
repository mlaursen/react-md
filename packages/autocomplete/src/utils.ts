import { ListboxOptionProps } from "@react-md/form";
import { ReactNode } from "react";
import {
  SearchOptions,
  fuzzyFilter,
  caseInsensitiveFilter,
} from "@react-md/utils";

/**
 * The supported autocompletion types.
 *
 * - "none" - The autocomplete will not filter any results and will just show a dropdown list of
 *   suggestions instead.
 * - "inline" - The first match will appear inline as the user types by using a selection range to
 *   highlight the remaining match characters.
 * - "list" - The autocomplete will filter the results and show a dropdown list of matches based
 *   on the current text field's value.
 * - "both" - A combination of both the `"inline"` and `"list"` autocomplete behaviors
 */
export type AutoCompletion = "none" | "inline" | "list" | "both";

/**
 * The supported data that can be filtered and autocompleted. When the data is an object, the searchable
 * value and display label can be extracted with the provided getter functions and `labelKey`/`valueKey`
 * props.
 */
export type AutoCompleteData = string | ListboxOptionProps;

/**
 * The autocomplete supports a fuzzy filter and a case insensitive filter function out of the box. If
 * you don't want any filtering to happen because the filtering is done through an API call or somewhere
 * else, you can use the `"none"` value instead.
 */
export type PreconfiguredFilterFunction = "fuzzy" | "case-insensitive" | "none";

/**
 * The filter options provided to the filter function.
 */
export type FilterFunctionOptions<O extends {} = {}> = O &
  SearchOptions<AutoCompleteData>;

/**
 * The autocomplete works with a filter function that takes in the current search query, the list of data,
 * and search options to return a new filtered list. If the default fuzzy filter and case insensitive filters
 * don't match your usecases, you can also provide your own function that matches this api instead.
 */
export type FilterFunction<O extends {} = {}> = (
  query: string,
  data: AutoCompleteData[],
  options: FilterFunctionOptions<O>
) => AutoCompleteData[];

/**
 * Either a preconfigured/provided filter function of the autocomplete or a custom function to use.
 */
export type AutoCompleteFilterFunction<O extends {} = {}> =
  | PreconfiguredFilterFunction
  | FilterFunction<O>;

/**
 * The function to call whenever the value is auto completed by:
 * - clicking an item with the mouse or touch
 * - keyboard focusing a result and pressing enter
 *
 * This callback is useful when additional autocomplete behavior needs to be added. Examples:
 * - creating chips with the autocomplete result
 * - resetting the text field's value
 */
export type AutoCompleteHandler = (
  value: string,
  result: AutoCompleteData,
  setValue: (value: string) => void
) => void;

/**
 * Generates an id for each result in the autocomplete's listbox.
 *
 * @param id The listbox's id
 * @param index The index of the result in the list
 * @return an id string
 */
export function getResultId(id: string, index: number): string {
  return `${id}-result-${index + 1}`;
}

/**
 * Gets a renderable label for each result in the autocomplete's listbox.
 * This will be applied as the `children` for the `Option` element.
 *
 * @param datum The current result datum to get a label for
 * @param labelKey The key to extract a label from if the datum is an object
 * @return a renderable node to display
 */
export function getResultLabel(
  datum: AutoCompleteData,
  labelKey: string
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
 * @param datum The current result datum that should have a string extracted
 * @param valueKey The key to use to extract a string value from if the datum
 * is an object
 * @return a searchable string.
 */
export function getResultValue(
  datum: AutoCompleteData,
  valueKey: string
): string {
  if (typeof datum === "string") {
    return datum;
  }

  return `${datum[valueKey]}`;
}

/**
 * This is used to disable filtering and just return the data list immediately. Useful
 * when the filtering is done somewhere else like a server/API
 * @private
 */
const noFilter: FilterFunction<{}> = (_, data) => data;

/**
 * Gets the filter function to use within the Autocomplete based on the provided filter prop
 *
 * @private
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
        throw new Error("Invalid filter function.");
      }

      return noFilter;
  }
}
