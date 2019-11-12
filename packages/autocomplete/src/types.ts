import { ListboxOptionProps } from "@react-md/form";
import { SearchOptions } from "@react-md/utils";

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
 *
 * Note: "inline" versions still aren't actually supported...
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
 * The shape of the autocomplete result.
 */
export interface AutoCompleteResult {
  /**
   * The stringified value of the autocomplete data by using `getResultValue` on the `result`. This
   * is really just used for the default behavior of autocompleting the text field's value to
   * this value.
   */
  value: string;

  /**
   * The index of the result in the **filtered data list**.
   */
  index: number;

  /**
   * The current autocomplete result.
   */
  result: AutoCompleteData;

  /**
   * The index of the result in the **original data list**.
   */
  dataIndex: number;

  /**
   * The list of data that has been filtered based on the current value.
   */
  filteredData: AutoCompleteData[];
}

/**
 * The function to call whenever the value is auto completed by:
 * - clicking an item with the mouse or touch
 * - keyboard focusing a result and pressing enter
 */
export type AutoCompleteHandler = (result: AutoCompleteResult) => void;
