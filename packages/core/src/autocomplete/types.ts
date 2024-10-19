import {
  type AriaAttributes,
  type ChangeEventHandler,
  type Dispatch,
  type FocusEventHandler,
} from "react";
import { type ListboxSelectIconProps } from "../form/Listbox.js";
import { type OptionProps } from "../form/Option.js";
import {
  type ComboboxMenuProps,
  type ConfigurableComboboxMenuProps,
} from "../form/useCombobox.js";
import {
  type EditableComboboxImplementation,
  type EditableComboboxOptions,
  type EditableComboboxWidgetProps,
} from "../form/useEditableCombobox.js";
import { type EditableHTMLElement } from "../form/utils.js";
import { type BaseSearchOptions } from "../searching/types.js";
import { type UseStateInitializer } from "../types.js";
import {
  type AutocompleteClearButtonProps,
  type ConfigurableAutocompleteClearButtonProps,
} from "./AutocompleteClearButton.js";
import {
  type AutocompleteDropdownButtonProps,
  type ConfigurableAutocompleteDropdownButtonProps,
} from "./AutocompleteDropdownButton.js";

/**
 * If a autocomplete value is one of these types, no additional code is required
 * to display a label in the input/chip for the autocomplete once the value has
 * been selected.
 *
 * - `"some value"` -&gt; `"some value"`
 * - `{ label: "Hello, world", value: 300 }` -&gt; `"Hello, world!"`
 *
 * @since 6.0.0
 */
export type AutocompleteLabeledOption = string | { label: string };

/**
 * @since 6.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AutocompleteOption = AutocompleteLabeledOption | {};

/**
 * @since 6.0.0
 */
export type AutocompleteFilterOptions<Option extends AutocompleteOption> = Pick<
  Required<BaseSearchOptions<Option>>,
  "list" | "query" | "extractor"
>;

/**
 * @since 6.0.0
 */
export type AutocompleteFilterFunction<Option extends AutocompleteOption> = (
  options: AutocompleteFilterOptions<Option>
) => readonly Option[];

/**
 * @since 6.0.0
 */
export interface AutocompleteGetOptionPropsOptions<
  Option extends AutocompleteOption,
> {
  index: number;
  option: Option;
}

/**
 * @since 6.0.0
 */
export type ConfigurableAutocompleteOptionProps = Partial<
  Omit<OptionProps, "role" | "value">
>;

/**
 * @since 6.0.0
 */
export interface AutocompleteControlledValue<T> {
  value: T;
  setValue: Dispatch<T>;
  defaultValue?: never;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteUncontrolledValue<T> {
  value?: never;
  setValue?: never;
  defaultValue?: UseStateInitializer<T>;
}

/**
 * @since 6.0.0
 */
export type AutocompleteValue<T> =
  | AutocompleteControlledValue<T>
  | AutocompleteUncontrolledValue<T>;

/**
 * @since 6.0.0
 */
export interface AutocompleteControlledQuery {
  query: string;
  setQuery: Dispatch<string>;
  defaultQuery?: never;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteUncontrolledQuery {
  query?: never;
  setQuery?: never;
  defaultQuery?: UseStateInitializer<string>;
}

/**
 * @since 6.0.0
 */
export type AutocompleteQuery =
  | AutocompleteControlledQuery
  | AutocompleteUncontrolledQuery;

/**
 * @since 6.0.0
 */
export interface AutocompleteUnknownQueryAndValueOptions<
  Option extends AutocompleteOption,
> {
  query?: string;
  setQuery?: Dispatch<string>;
  defaultQuery?: UseStateInitializer<string>;
  value?: Option | null | readonly Option[];
  setValue?: Dispatch<Option | null | readonly Option[]>;
  defaultValue?: UseStateInitializer<Option | null | readonly Option[]>;
}

/**
 * A utility type that makes the `getOptionLabel` required when an option is not
 * a {@link AutocompleteLabeledOption}.
 *
 * @since 6.0.0
 */
export type AutocompleteOptionLabelExtractor<
  Option extends AutocompleteOption,
> = Option extends AutocompleteLabeledOption
  ? { getOptionLabel?: (option: Option) => string }
  : { getOptionLabel: (option: Option) => string };

/**
 * @since 6.0.0
 */
export interface AutocompleteFilteringOptions<
  Option extends AutocompleteOption,
> {
  /**
   * The list of options that can be shown within the autocomplete and filtered
   * based on the current query.
   */
  options: readonly Option[];

  /**
   * If the list of options contain an object that doesn't have a
   * `label: string`, this prop must be provided to extract a string to display
   * in the text field once selected.
   *
   * @example No Getter Required
   * ```tsx
   * const options1 = ['a', 'b', 'c', 'd'];
   * const options2 = [{ label: 'a' }, { label: 'b' }, { label: 'c' }, { label: 'd' }];
   *
   * <Autocomplete options={options1} />
   * <Autocomplete options={options2} />
   * ```
   *
   * @example Getter Required
   * ```tsx
   * const options = [
   *   {
   *     name: "Alaska",
   *     abbr: "AK",
   *   },
   *   {
   *     name: "Arizona",
   *     abbr: "AZ",
   *   }
   * ];
   *
   * <Autocomplete options={options} getOptionLabel={(state) => state.name} />
   * ```
   *
   * @defaultValue `defaultAutocompleteExtractor`
   */
  getOptionLabel?: (option: Option) => string;

  /**
   * The function that filters the {@link options} based on the current query
   * and defaults to a case insensitive search that starts with the query.
   *
   * @example Case Insensitive Anywhere
   * ```tsx
   * import { caseInsensitiveSearch } from "@react-md/core/searching/caseInsensitive";
   *
   * <Autocomplete {...props} filter={caseInsensitiveSearch} />
   * ```
   *
   * @example Fuzzy Filtering
   * ```tsx
   * import { fuzzySearch } from "@react-md/core/searching/fuzzy";
   *
   * <Autocomplete {...props} filter={fuzzySearch} />
   * ```
   *
   * @example Async Searching
   * ```tsx
   * import { useDebouncedFunction } from "@react-md/core/useDebouncedFunction";
   * import { useState } from "react";
   *
   * interface State {
   *   loading: boolean;
   *   options: readonly string[];
   * }
   *
   * function Example() {
   *   const [state, setState] = useState<State>({
   *     loading: false,
   *     options: [],
   *   });
   *
   *   const search = useDebouncedFunction(async (query: string) => {
   *     setState(prev => ({ ...prev, loading: true }));
   *
   *     const options = await someAsyncTask(query);
   *     setState({ loading: false, options })
   *   });
   *
   *   return (
   *     <Autocomplete
   *       {...props}
   *       // Setting `type="search"` automatically updates the `filter` prop to
   *       // be `noopAutocompleteFilter`
   *       type="search"
   *       options={options}
   *       onChange={(event) => search(event.currentTarget.value)}
   *     />
   *   );
   * }
   * ```
   *
   * @defaultValue `defaultAutocompleteFilter`
   */
  filter?: AutocompleteFilterFunction<Option>;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteEditableComboboxOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends EditableComboboxOptions<ComboboxEl, PopupEl>,
    AutocompleteFilteringOptions<Option>,
    ListboxSelectIconProps {
  onBlur?: FocusEventHandler<ComboboxEl>;
  onChange?: ChangeEventHandler<ComboboxEl>;

  /**
   * This is a convenience prop for the `onEntering`/`onEntered` transition
   * callbacks that will ensure it is only called once even if the transitions
   * are disabled. A great use-case for this function is to fetch data once the
   * menu is opened.
   */
  onOpen?: () => void;
}

/**
 * @since 6.0.0
 */
export type AutocompleteQueryAndExtractorOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> = AutocompleteEditableComboboxOptions<Option, ComboboxEl, PopupEl> &
  AutocompleteOptionLabelExtractor<Option> &
  AutocompleteQuery;

/**
 * @since 6.0.0
 */
export type AutocompleteSingleSelectOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> = AutocompleteQueryAndExtractorOptions<Option, ComboboxEl, PopupEl> &
  AutocompleteValue<Option | null>;

/**
 * @since 6.0.0
 */
export type AutocompleteMultiSelectOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> = AutocompleteQueryAndExtractorOptions<Option, ComboboxEl, PopupEl> &
  AutocompleteValue<readonly Option[]>;

/**
 * @since 6.0.0
 */
export interface AutocompleteOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends AutocompleteEditableComboboxOptions<Option, ComboboxEl, PopupEl>,
    AutocompleteUnknownQueryAndValueOptions<Option> {}

/**
 * @since 6.0.0
 */
export interface AutocompleteComboboxProps<
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
> extends EditableComboboxWidgetProps<ComboboxEl> {
  "aria-autocomplete": NonNullable<AriaAttributes["aria-autocomplete"]>;
  value: string;
  onBlur: FocusEventHandler<ComboboxEl>;
  onChange: ChangeEventHandler<ComboboxEl>;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteListboxProps<
  T extends AutocompleteOption = AutocompleteOption,
  PopupEl extends HTMLElement = HTMLElement,
> extends Omit<ComboboxMenuProps<PopupEl>, "ref">,
    ListboxSelectIconProps {
  value: T | null | readonly T[];
  setValue: Dispatch<T>;
  onEnter: (appearing: boolean) => void;
}

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteListboxProps
  extends ConfigurableComboboxMenuProps,
    ListboxSelectIconProps {
  id?: string;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteWithQueryImplementation<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends EditableComboboxImplementation<ComboboxEl, PopupEl> {
  query: string;
  setQuery: Dispatch<string>;
  comboboxProps: AutocompleteComboboxProps<ComboboxEl>;

  /**
   * This is the current list of options that will be filtered based on the
   * current `query`. This should normally be rendered in the
   * `AutocompleteListboxChildren` component
   */
  availableOptions: readonly Option[];

  /**
   * Generates the props required for the `Listbox` component and should
   * normally be provided any menu props that might override the default display
   * settings.
   */
  getListboxProps: (
    overrides?: ConfigurableAutocompleteListboxProps
  ) => AutocompleteListboxProps<Option, PopupEl>;

  /**
   * Generates the props required for the `AutocompleteClearButton`.
   */
  getClearButtonProps: (
    overrides?: ConfigurableAutocompleteClearButtonProps
  ) => AutocompleteClearButtonProps;

  /**
   * Generates the props required for the `AutocompleteDropdownButton`.
   */
  getDropdownButtonProps: (
    overrides?: ConfigurableAutocompleteDropdownButtonProps
  ) => AutocompleteDropdownButtonProps;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteSingleSelectImplementation<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends AutocompleteWithQueryImplementation<Option, ComboboxEl, PopupEl> {
  value: Option | null;
  setValue: Dispatch<Option | null>;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteMultiSelectImplementation<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends AutocompleteWithQueryImplementation<Option, ComboboxEl, PopupEl> {
  value: readonly Option[];
  setValue: Dispatch<readonly Option[]>;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteImplementation<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends AutocompleteWithQueryImplementation<Option, ComboboxEl, PopupEl> {
  value: Option | null | readonly Option[];
  setValue: Dispatch<Option | null | readonly Option[]>;
}
