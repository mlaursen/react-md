"use client";
import { type ReactElement, type ReactNode, type Ref } from "react";
import { Listbox, type ListboxSelectIconProps } from "../form/Listbox.js";
import { TextField, type TextFieldProps } from "../form/TextField.js";
import { ListSubheader } from "../list/ListSubheader.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import {
  AutocompleteCircularProgress,
  type AutocompleteCircularProgressProps,
} from "./AutocompleteCircularProgress.js";
import {
  AutocompleteClearButton,
  type ConfigurableAutocompleteClearButtonProps,
} from "./AutocompleteClearButton.js";
import {
  AutocompleteDropdownButton,
  type ConfigurableAutocompleteDropdownButtonProps,
} from "./AutocompleteDropdownButton.js";
import { AutocompleteListboxChildren } from "./AutocompleteListboxChildren.js";
import { autocomplete, autocompleteRightAddon } from "./autocompleteStyles.js";
import {
  defaultAutocompleteExtractor,
  defaultAutocompleteFilter,
  defaultAutocompleteGetOptionProps,
  noopAutocompleteFilter,
} from "./defaults.js";
import {
  type AutocompleteFilteringOptions,
  type AutocompleteGetOptionPropsOptions,
  type AutocompleteOption,
  type AutocompleteOptionLabelExtractor,
  type AutocompleteQuery,
  type AutocompleteUnknownQueryAndValueOptions,
  type AutocompleteValue,
  type ConfigurableAutocompleteListboxProps,
  type ConfigurableAutocompleteOptionProps,
} from "./types.js";
import { useAutocomplete } from "./useAutocomplete.js";

/**
 * @since 6.0.0
 */
export interface AutocompleteBaseProps<Option extends AutocompleteOption>
  extends Omit<TextFieldProps, "value" | "defaultValue">,
    AutocompleteFilteringOptions<Option>,
    ListboxSelectIconProps {
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
   */
  getOptionProps?: (
    options: AutocompleteGetOptionPropsOptions<Option>
  ) => ConfigurableAutocompleteOptionProps | undefined;

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

  onOpen?: () => void;

  /**
   * The children to display when there are no {@link options} due to the
   * current text box value.
   *
   * @defaultValue `<ListSubheader>No options</ListSubheader`
   */
  noOptionsChildren?: ReactNode;

  /** @defaultValue `true` */
  disableSelectedIcon?: boolean;
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
  AutocompleteQueryAndExtractorProps<Option> & AutocompleteValue<Option | null>;

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

/**
 * This is the single select autocomplete implementation.
 *
 * @since 6.0.0
 */
export function Autocomplete<Option extends AutocompleteOption>(
  props: AutocompleteSingleSelectProps<Option>
): ReactElement;
/**
 * This is the multiselect autocomplete implementation.
 *
 * @since 6.0.0
 */
export function Autocomplete<Option extends AutocompleteOption>(
  props: AutocompleteMultiSelectProps<Option>
): ReactElement;
/**
 * @since 6.0.0
 * @internal
 */
export function Autocomplete<Option extends AutocompleteOption>(
  props: AutocompleteProps<Option>
): ReactElement {
  const {
    id: propId,
    onBlur,
    onFocus,
    onClick,
    onChange,
    onKeyDown,
    onOpen,
    type,
    className,
    inputRef,
    children,
    filter = type === "search"
      ? noopAutocompleteFilter
      : defaultAutocompleteFilter,
    value,
    setValue,
    defaultValue,
    query,
    setQuery,
    defaultQuery,
    options,
    getOptionLabel = defaultAutocompleteExtractor,
    getOptionProps = defaultAutocompleteGetOptionProps,
    listboxProps: menuProps,
    listboxLabel,
    listboxLabelledBy,
    selectedIconAfter,
    disableSelectedIcon = true,
    loading,
    loadingProps,
    dropdownButtonProps,
    disableDropdownButton,
    clearButtonProps,
    disableClearButton,
    noOptionsChildren = <ListSubheader>No Options</ListSubheader>,
    rightAddon,
    rightAddonProps,
    ...remaining
  } = props;
  const { form, disabled } = props;

  const id = useEnsuredId(propId, "autocomplete");
  const menuId = useEnsuredId(menuProps?.id, "autocomplete-listbox");
  const {
    query: currentQuery,
    comboboxProps,
    movementContext,
    availableOptions,
    getListboxProps,
    getClearButtonProps,
    getDropdownButtonProps,
  } = useAutocomplete({
    form,
    onBlur,
    onFocus,
    onClick,
    onChange,
    onKeyDown,
    onOpen,
    disabled,
    filter,
    popupId: menuId,
    popupRef: menuProps?.ref,
    comboboxId: id,
    comboboxRef: inputRef,
    options,
    getOptionLabel,
    value,
    setValue,
    defaultValue,
    query,
    setQuery,
    defaultQuery,
    selectedIconAfter,
    disableSelectedIcon,
  });

  return (
    <KeyboardMovementProvider value={movementContext}>
      <TextField
        {...remaining}
        {...comboboxProps}
        className={autocomplete({
          className,
          loading,
          disableDropdownButton,
        })}
        rightAddon={
          <>
            {rightAddon}
            {loading && <AutocompleteCircularProgress {...loadingProps} />}
            {!disableClearButton && !!currentQuery && (
              <AutocompleteClearButton
                {...clearButtonProps}
                {...getClearButtonProps(clearButtonProps)}
              />
            )}
            {!disableDropdownButton && (
              <AutocompleteDropdownButton
                aria-label={listboxLabel as string}
                aria-labelledby={listboxLabelledBy}
                {...getDropdownButtonProps(dropdownButtonProps)}
              />
            )}
          </>
        }
        rightAddonProps={{
          ...rightAddonProps,
          pointerEvents: true,
          className: autocompleteRightAddon({
            className: rightAddonProps?.className,
          }),
        }}
      />
      <Listbox
        aria-label={listboxLabel as string}
        aria-labelledby={listboxLabelledBy}
        {...getListboxProps(menuProps)}
      >
        <AutocompleteListboxChildren
          options={availableOptions}
          getOptionLabel={getOptionLabel}
          getOptionProps={getOptionProps}
          noOptionsChildren={noOptionsChildren}
        >
          {children}
        </AutocompleteListboxChildren>
      </Listbox>
    </KeyboardMovementProvider>
  );
}
