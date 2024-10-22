import {
  type AriaAttributes,
  type ChangeEventHandler,
  type Dispatch,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from "react";
import { type ButtonProps } from "../button/Button.js";
import { type ChipProps } from "../chip/Chip.js";
import { type ListboxSelectedIconProps } from "../form/Listbox.js";
import { type OptionProps } from "../form/Option.js";
import { type TextFieldProps } from "../form/TextField.js";
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
import { type IconRotatorProps } from "../icon/IconRotator.js";
import { type CircularProgressProps } from "../progress/CircularProgress.js";
import { type ProgressTheme } from "../progress/types.js";
import { type BaseSearchOptions } from "../searching/types.js";
import { type PropsWithRef, type UseStateInitializer } from "../types.js";

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
 * This can be used to add additional props to each option.
 *
 * @example Simple Example
 * ```tsx
 * getOptionProps={({ option }) => {
 *   return {
 *     disabled: option === "",
 *     className: cnb(option === "a" && styles.blue),
 *     leftAddon: option === value && <CheckIcon />,
 *   };
 * }}
 * ```
 * @since 6.0.0
 */
export type AutocompleteGetOptionProps<Option extends AutocompleteOption> = (
  options: AutocompleteGetOptionPropsOptions<Option>
) => ConfigurableAutocompleteOptionProps | undefined;

/**
 * This can be used to add additional props to each inline chip for multiselect
 * autocompletes.
 *
 * @example Simple Example
 * ```tsx
 * getChipProps={({ option, index }) => {
 *   return {
 *     disabled: index < 3,
 *     className: cnb(option === "a" && styles.blue)<
 *   };
 * }}
 * ```
 * @since 6.0.0
 */
export type AutocompleteGetChipProps<Option extends AutocompleteOption> = (
  options: AutocompleteGetOptionPropsOptions<Option>
) => Partial<AutocompleteChipProps> | undefined;

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
 * @since 6.0.0
 */
export type AutocompleteGetOptionLabel<Option extends AutocompleteOption> = (
  option: Option
) => string;

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
  onValueChange?: never;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteUncontrolledValue<T> {
  value?: never;
  setValue?: never;
  defaultValue?: UseStateInitializer<T>;

  /**
   * This prop should be used when some action should occur whenever the value
   * changes, but is not required to be stored in state. For all other cases, it
   * is recommended to control the `value` instead of using this prop.
   *
   * @defaultValue `() => {}`
   */
  onValueChange?: (value: T) => void;
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
  onValueChange?: (value: Option | null | readonly Option[]) => void;
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
  ? { getOptionLabel?: AutocompleteGetOptionLabel<Option> }
  : { getOptionLabel: AutocompleteGetOptionLabel<Option> };

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

  /** @see {@link AutocompleteGetOptionLabel} */
  getOptionLabel?: AutocompleteGetOptionLabel<Option>;

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

  /**
   * Set this to `true` to allow any value to be typed into the autocomplete
   * instead of enforcing an empty string or one of the option labels.
   *
   * @defaultValue `filter === noopAutocompleteFilter`
   */
  allowAnyValue?: boolean;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteFilterAndListboxOptions<
  Option extends AutocompleteOption,
> extends AutocompleteFilteringOptions<Option>,
    ListboxSelectedIconProps {
  /**
   * Set this to `true` when using a multiselect autocomplete to update each
   * option to use checkboxes to show the selection state.
   *
   * @defaultValue `false`
   */
  checkboxes?: boolean;

  /** @defaultValue `!checkboxes` */
  disableSelectedIcon?: boolean;

  /**
   * Set this to `true` to prevent the listbox from closing when an option is
   * selected.
   *
   * @defaultValue `checkboxes`
   */
  disableCloseOnSelect?: boolean;

  /** @see {@link AutocompleteGetOptionProps} */
  getOptionProps?: AutocompleteGetOptionProps<Option>;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteEditableComboboxOptions<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends EditableComboboxOptions<ComboboxEl, PopupEl>,
    AutocompleteFilterAndListboxOptions<Option> {
  onBlur?: FocusEventHandler<ComboboxEl>;
  onChange?: ChangeEventHandler<ComboboxEl>;

  /**
   * This is a convenience prop for the `onEntering`/`onEntered` transition
   * callbacks that will ensure it is only called once even if the transitions
   * are disabled. A great use-case for this function is to fetch data once the
   * menu is opened.
   */
  onOpen?: () => void;

  /**
   * Set this to `true` to clear the `query` whenever a new value is selected.
   * This should generally be used if the current value is stored outside of the
   * autocomplete itself or multiselect implementations.
   *
   * This will be enabled by default for multiselect implementations.
   *
   * @defaultValue `multiselect || Array.isArray(value ?? defaultValue)`
   */
  clearOnSelect?: boolean;
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
    ListboxSelectedIconProps {
  value: T | null | readonly T[];
  setValue: Dispatch<T>;
  onEnter: (appearing: boolean) => void;
}

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteListboxProps
  extends ConfigurableComboboxMenuProps,
    ListboxSelectedIconProps {
  id?: string;
}

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteClearButtonProps extends ButtonProps {
  /** @defaultValue `"Clear"` */
  "aria-label"?: string;

  /** @defaultValue `"autocomplete-clear-" + useId()` */
  id?: string;
}

/**
 * @internal
 * @since 6.0.0
 */
export interface AutocompleteClearButtonProps
  extends ConfigurableAutocompleteClearButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * @since 6.0.0
 */
export interface ConfigurableAutocompleteDropdownButtonProps
  extends ButtonProps {
  /** @defaultValue `AutocompleteProps.listboxLabel` */
  "aria-label"?: string;
  /** @defaultValue `AutocompleteProps.listboxLabelledby` */
  "aria-labelledby"?: string;

  /** @defaultValue `"autocomplete-dropdown-" + useId()` */
  id?: string;

  /** @defaultValue `getIcon("dropdown")` */
  icon?: ReactNode;
  iconRotatorProps?: Omit<IconRotatorProps, "rotated">;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteDropdownButtonProps
  extends ConfigurableAutocompleteDropdownButtonProps {
  "aria-controls": string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteCircularProgressProps
  extends CircularProgressProps {
  /** @defaultValue `"Loading"` */
  "aria-label"?: string;

  /** @defaultValue `"current-color"` */
  theme?: ProgressTheme;
}

/**
 * @since 6.0.0
 */
export interface AutocompleteChipProps extends ChipProps {
  /**
   * @defaultValue `typeof children === "string" && \`Remove "${children}"\`
   */
  "aria-description"?: string;

  /** @defaultValue `getIcon("remove")` */
  removeIcon?: ReactNode;
  children: ReactNode;
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
   * This is a convenience prop to determine if the autocomplete supports
   * multiselect.
   */
  multiselect: boolean;

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

  /** @see {@link AutocompleteGetOptionLabel} */
  getOptionLabel: AutocompleteGetOptionLabel<Option>;
  /** @see {@link AutocompleteGetOptionProps} */
  getOptionProps: AutocompleteGetOptionProps<Option>;
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

/**
 * @since 6.0.0
 */
export interface AutocompleteBaseProps<Option extends AutocompleteOption>
  extends Omit<TextFieldProps, "value" | "defaultValue">,
    AutocompleteFilterAndListboxOptions<Option> {
  inputRef?: Ref<HTMLInputElement>;

  /**
   * An `aria-label` to pass to the `Listbox` component that describes the list
   * of {@link options}. Either this or the {@link listboxLabelledBy} are
   * required for accessibility.
   */
  listboxLabel?: string;

  /**
   * An `aria-labelledby` to pass to the `Listbox` component that describes the
   * list of {@link options}. Either this or the {@link listboxLabel} are
   * required for accessibility.
   */
  listboxLabelledBy?: string;

  /**
   * Any additional props that should be passed to the `Listbox` component.
   */
  listboxProps?: PropsWithRef<
    ConfigurableAutocompleteListboxProps,
    HTMLDivElement
  >;

  /** @see {@link AutocompleteGetOptionProps} */
  getOptionProps?: AutocompleteGetOptionProps<Option>;

  /**
   * This can be used to add any custom styling, change the icon, change the
   * label, etc for the dropdown button.
   *
   * @example Simple Example
   * ```tsx
   * dropdownButtonProps={{
   *   "aria-label": "Open",
   *   className: styles.dropdownButton,
   *   icon: <MyCustomDropdownIcon />,
   * }}
   * ```
   */
  dropdownButtonProps?: ConfigurableAutocompleteDropdownButtonProps;

  /**
   * Set this to `true` to remove the {@link DropdownButton} from being rendered
   * after the input element.
   *
   * @defaultValue `false`
   */
  disableDropdownButton?: boolean;

  /**
   * Set this to `true` to disable a `<CircularProgress />` after the input and
   * before the `<DropdownButton />`.
   *
   * @defaultValue `false`
   */
  loading?: boolean;

  /**
   * @defaultValue `{ "aria-label": "Loading", ...loadingProps }`
   */
  loadingProps?: AutocompleteCircularProgressProps;

  clearButtonProps?: PropsWithRef<
    ConfigurableAutocompleteClearButtonProps,
    HTMLButtonElement
  >;

  /**
   * @defaultValue `false`
   */
  disableClearButton?: boolean;

  /**
   * This is a convenience prop for the `onEntering`/`onEntered` transition
   * callbacks that will ensure it is only called once even if the transitions
   * are disabled. A great use-case for this function is to fetch data once the
   * menu is opened.
   */
  onOpen?: () => void;

  /**
   * The children to display when there are no {@link options} due to the
   * current text box value.
   *
   * @defaultValue `<ListSubheader>No options</ListSubheader`
   */
  noOptionsChildren?: ReactNode;

  /**
   * Set this to `true` when using a multiselect autocomplete to prevent the
   * selected values from being rendered inline with the input. This is useful
   * when the selected values should be shown in a different part of the UI
   * instead.
   *
   * @defaultValue `false`
   */
  disableInlineChips?: boolean;

  /** @see {@link AutocompleteGetChipProps} */
  getChipProps?: AutocompleteGetChipProps<Option>;
}

/**
 * @since 6.0.0
 */
export type AutocompleteListboxLabelProps =
  | { listboxLabel: string }
  | { listboxLabelledBy: string };

/**
 * @since 6.0.0
 */
export type AutocompleteQueryAndExtractorProps<
  Option extends AutocompleteOption,
> = AutocompleteBaseProps<Option> &
  AutocompleteOptionLabelExtractor<Option> &
  AutocompleteQuery &
  AutocompleteListboxLabelProps;

/**
 * @since 6.0.0
 */
export type AutocompleteSingleSelectProps<Option extends AutocompleteOption> =
  AutocompleteQueryAndExtractorProps<Option> &
    AutocompleteValue<Option | null> & {
      checkboxes?: never;
      getChipProps?: never;
      disableInlineChips?: never;
    };

/**
 * @since 6.0.0
 */
export type AutocompleteMultiSelectProps<Option extends AutocompleteOption> =
  AutocompleteQueryAndExtractorProps<Option> &
    AutocompleteValue<readonly Option[]>;

/**
 * @since 6.0.0
 */
export type AutocompleteProps<Option extends AutocompleteOption> =
  AutocompleteBaseProps<Option> &
    AutocompleteUnknownQueryAndValueOptions<Option>;
