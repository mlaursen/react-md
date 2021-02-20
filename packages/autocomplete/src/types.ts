import { CSSProperties, ReactNode } from "react";
import { ListboxOptionProps, TextFieldProps } from "@react-md/form";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { OptionalFixedPositionOptions } from "@react-md/transition";
import { CaseInsensitiveOptions, PositionWidth } from "@react-md/utils";

/**
 * The supported autocompletion types.
 *
 * - "none" - The autocomplete will not filter any results and will just show a
 *   dropdown list of suggestions instead.
 * - "inline" - The first match will appear inline as the user types by using a
 *   selection range to highlight the remaining match characters.
 * - "list" - The autocomplete will filter the results and show a dropdown list
 *   of matches based on the current text field's value.
 * - "both" - A combination of both the `"inline"` and `"list"` autocomplete
 *   behaviors
 *
 * Note: "inline" versions still aren't actually supported...
 */
export type AutoCompletion = "none" | "inline" | "list" | "both";

/**
 * The supported data that can be filtered and autocompleted. When the data is
 * an object, the searchable value and display label can be extracted with the
 * provided getter functions and `labelKey`/`valueKey` props.
 */
export type AutoCompleteData = string | ListboxOptionProps;

/**
 * The autocomplete supports a fuzzy filter and a case insensitive filter
 * function out of the box. If you don't want any filtering to happen because
 * the filtering is done through an API call or somewhere else, you can use the
 * `"none"` value instead.
 */
export type PreconfiguredFilterFunction = "fuzzy" | "case-insensitive" | "none";

/**
 * The filter options provided to the filter function.
 */
export type FilterFunctionOptions<O extends {} = {}> = O &
  CaseInsensitiveOptions<AutoCompleteData>;

/**
 * The autocomplete works with a filter function that takes in the current
 * search query, the list of data, and search options to return a new filtered
 * list. If the default fuzzy filter and case insensitive filters don't match
 * your use cases, you can also provide your own function that matches this api
 * instead.
 */
export type FilterFunction<O extends {} = {}> = (
  query: string,
  data: readonly AutoCompleteData[],
  options: FilterFunctionOptions<O>
) => readonly AutoCompleteData[];

/**
 * Either a preconfigured/provided filter function of the autocomplete or a
 * custom function to use.
 */
export type AutoCompleteFilterFunction<O extends {} = {}> =
  | PreconfiguredFilterFunction
  | FilterFunction<O>;

/**
 * The shape of the autocomplete result.
 */
export interface AutoCompleteResult {
  /**
   * The stringified value of the autocomplete data by using `getResultValue` on
   * the `result`. This is really just used for the default behavior of
   * autocompleting the text field's value to this value.
   */
  readonly value: string;

  /**
   * The index of the result in the **filtered data list**.
   */
  readonly index: number;

  /**
   * The current autocomplete result.
   */
  readonly result: Readonly<AutoCompleteData>;

  /**
   * The index of the result in the **original data list**.
   */
  readonly dataIndex: number;

  /**
   * The list of data that has been filtered based on the current value.
   */
  readonly filteredData: readonly AutoCompleteData[];
}

/**
 * The function to call whenever the value is auto completed by:
 * - clicking an item with the mouse or touch
 * - keyboard focusing a result and pressing enter
 */
export type AutoCompleteHandler = (result: AutoCompleteResult) => void;

export interface AutoCompleteListboxPositionOptions
  extends Omit<OptionalFixedPositionOptions, "width"> {
  /**
   * The sizing behavior for the listbox. It will default to have the same width
   * as the select button, but it is also possible to either have the
   * `min-width` be the width of the select button or just automatically
   * determine the width.
   *
   * The sizing behavior will always ensure that the left and right bounds of
   * the listbox appear within the viewport.
   */
  listboxWidth?: PositionWidth;

  /**
   * An optional style to also apply to the listbox element showing all the
   * matches.
   */
  listboxStyle?: CSSProperties;

  /**
   * Boolean if the select's listbox should not hide if the user resizes the
   * browser while it is visible.
   */
  closeOnResize?: boolean;

  /**
   * Boolean if the select's listbox should not hide if the user scrolls the
   * page while it is visible.
   */
  closeOnScroll?: boolean;
}

export interface AutoCompleteProps
  extends Omit<TextFieldProps, "type">,
    RenderConditionalPortalProps,
    AutoCompleteListboxPositionOptions {
  /**
   * The id to use for the AutoComplete and is required for a11y to fulfill the
   * `combobox` role. This id will be passed directly to the `<input>` element
   * and prefixed for all the other id-required elements.
   */
  id: string;

  /**
   * @see AutoCompletion
   */
  autoComplete?: AutoCompletion;

  /**
   * Boolean if the text field's value should be cleared when the value is
   * autocompleted. This is useful when also adding custom `onAutoComplete`
   * behavior.
   */
  clearOnAutoComplete?: boolean;

  /**
   * Boolean if the list of suggestions should no longer appear immediately once
   * the text field is focused and there is at least one item in the `data`
   * list. If this is set to `false`, the menu will only be shown when:
   *
   * - a letter is added or removed from the text field
   * - the user clicks it again
   * - using the alt+arrow-down keyboard shortcut
   *
   * If this prop is omitted, the show on focus behavior will be disabled on
   * touch devices since touch device's soft keyboards do a lot of funky things
   * with the viewport and scroll behavior. This makes it so the native viewport
   * and scroll behavior actions are normally finished before the suggestions
   * appear.
   */
  disableShowOnFocus?: boolean;

  /**
   * The list of data that should be autocompleted based on the provided filter.
   */
  data: readonly AutoCompleteData[];

  /**
   * @see AutoCompleteFilterFunction
   */
  filter?: AutoCompleteFilterFunction;

  /**
   * An optional object of options to provide to the filter function. This will
   * be defaulted to work with the fuzzy filter and case-insensitive filter
   * functions to trim whitespace before doing the comparisons.
   */
  filterOptions?: FilterFunctionOptions;

  /**
   * Boolean if the filter function should still be called when there is no
   * value in the text field. This normally defaults to `false` so that the
   * `data` is just returned, but it can be useful with a custom filter function
   * that returns different data while there is no value.
   */
  filterOnNoValue?: boolean;

  /**
   * An optional className to also apply to the listbox element showing all the
   * matches.
   */
  listboxClassName?: string;

  /**
   * Boolean if the result list labels should be updated so that each matching
   * letter is bolded. This only works when the data list is a list of strings,
   * or the `label` is a string and when the letters appear in order. This will
   * always be `false` if the `filter` prop is set to `"fuzzy"`.
   */
  highlight?: boolean;

  /**
   * Boolean if the highlight functionality should no longer stop after the
   * first match and instead highlight all matches of the search string within
   * the label for an item.
   */
  highlightReapeating?: boolean;

  /**
   * An optional style to apply to the `<span>` surrounding the matched text
   * when the `highlight` prop is enabled.
   */
  highlightStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<span>` surrounding the matched text
   * when the `highlight` prop is enabled.
   */
  highlightClassName?: string;

  /**
   * The key to use to extract a label from a result when the provided data list
   * is a list of objects.
   */
  labelKey?: string;

  /**
   * The key to use to extract a searchable value string from a result when the
   * provided data list is a list of objects.
   */
  valueKey?: string;

  /**
   * A function to call that will generate an id for each result in the
   * autocomplete's listbox. These ids are required for a11y as it'll be used
   * with the `aria-activedescendant` movement within the autocomplete.
   */
  getResultId?(id: string, index: number): string;

  /**
   * A function to call that will get a renderable label or children to display
   * for a result in the autocomplete's list of results. The default behavior
   * will be to return the result itself if it is a string, otherwise try to
   * return the `children` or `labelKey` attribute if it is an object.
   */
  getResultLabel?(
    data: Readonly<AutoCompleteData>,
    labelKey: string,
    query: string
  ): ReactNode;

  /**
   * A function to call that will extract a searchable value string from each
   * result. This **must** return a string and will prevent the autocomplete
   * from filtering data with the built in filter functions.
   */
  getResultValue?(datum: Readonly<AutoCompleteData>, valueKey: string): string;

  /**
   * @see AutoCompleteHandler
   */
  onAutoComplete?: AutoCompleteHandler;

  /**
   * An optional list of keys that should be omitted from your `data` item
   * before passing it to the suggestion `Option`. This is useful if you have
   * additional metadata in your data objects that should not be passed as DOM
   * attributes.
   *
   *
   * ```ts
   * const item = { __id: 9432432, name: "Item", value: "guid" }
   *
   * // don't want to pass `__id` to the Option
   * const omitKeys = ["__id"];
   *```
   */
  omitKeys?: readonly string[];

  /**
   * Any optional children to display before the matched results in the
   * autocomplete's menu. This should normally be for any presentational data or
   * things that should not be searchable.
   *
   * @remarks \@since 2.1.0
   */
  beforeResultsChildren?: ReactNode;

  /**
   * Any optional children to display after the matched results in the
   * autocomplete's menu. This should normally be for any presentational data or
   * things that should not be searchable.
   *
   * @remarks \@since 2.1.0
   */
  afterResultsChildren?: ReactNode;
}
