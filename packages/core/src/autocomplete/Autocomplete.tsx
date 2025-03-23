"use client";

import { type ReactElement } from "react";

import { Listbox } from "../form/Listbox.js";
import { TextField } from "../form/TextField.js";
import { ListSubheader } from "../list/ListSubheader.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { AutocompleteChip } from "./AutocompleteChip.js";
import { AutocompleteCircularProgress } from "./AutocompleteCircularProgress.js";
import { AutocompleteClearButton } from "./AutocompleteClearButton.js";
import { AutocompleteDropdownButton } from "./AutocompleteDropdownButton.js";
import { AutocompleteListboxChildren } from "./AutocompleteListboxChildren.js";
import { autocomplete, autocompleteRightAddon } from "./autocompleteStyles.js";
import {
  defaultAutocompleteFilter,
  noopAutocompleteFilter,
} from "./defaults.js";
import {
  type AutocompleteMultiSelectProps,
  type AutocompleteOption,
  type AutocompleteProps,
  type AutocompleteSingleSelectProps,
} from "./types.js";
import { useAutocomplete } from "./useAutocomplete.js";

const noop = (): undefined => undefined;

/**
 * An `Autocomplete` is a component that allows for real-time suggestions from
 * a pre-determined list as the user types by filtering data based on the
 * current value. It can also be used to interact with an API that handles the
 * sorting, filtering, matching, etc as well.
 *
 * An `Autocomplete` always requires the following props:
 *
 * - `options` - a list of available options that can be a list of strings,
 *   a list of objects with a `{ label: string }`, or any list of objects
 *   - if the list of objects do not have a `label`, the
 *     {@link AutocompleteProps.getOptionLabel} **must** be provided to allow
 *     filtering
 * - `label` or `aria-label` to describe the textbox for accessibility
 * - `listboxLabel` or `listboxLabelledBy` for an accessible label describing the options
 *
 * @example Simple Example
 * ```tsx
 * "use client";
 *
 * import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
 * import { type ReactElement } from "react";
 *
 * export default function SimpleExample(): ReactElement {
 *   return (
 *     <Autocomplete
 *       label="Fruit"
 *       placeholder="Apple"
 *       listboxLabel="Fruits"
 *       options={[
 *         "Apple",
 *         "Apricot",
 *         "Banana",
 *         "Blueberry",
 *         "Cranberry",
 *         "Kiwi",
 *         "Mango",
 *         "Orange",
 *         "Peach",
 *         "Plum",
 *         "Strawberry",
 *       ]}
 *     />
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/autocomplete|Autocomplete Demos}
 * @since 6.0.0
 */
export function Autocomplete<Option extends AutocompleteOption>(
  props: AutocompleteSingleSelectProps<Option>
): ReactElement;
/**
 * To create an `Autocomplete` that can have multiple values selected at once,
 * either provide an array `value` or `defaultValue`.
 *
 * @example Simple Example
 * ```tsx
 * "use client";
 *
 * import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
 * import { type ReactElement, useState } from "react";
 *
 * export default function SimpleExample(): ReactElement {
 *   const [value, setValue] = useState<readonly Dessert[]>([]);
 *   return (
 *     <Autocomplete
 *       label="Fruit"
 *       placeholder="Apple"
 *       listboxLabel="Fruits"
 *       options={[
 *         "Apple",
 *         "Apricot",
 *         "Banana",
 *         "Blueberry",
 *         "Cranberry",
 *         "Kiwi",
 *         "Mango",
 *         "Orange",
 *         "Peach",
 *         "Plum",
 *         "Strawberry",
 *       ]}
 *     />
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/autocomplete|Autocomplete Demos}
 * @since 6.0.0
 */
export function Autocomplete<Option extends AutocompleteOption>(
  props: AutocompleteMultiSelectProps<Option>
): ReactElement;
/**
 * @see {@link https://next.react-md.dev/components/autocomplete|Autocomplete Demos}
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
    filterSelected,
    value,
    setValue,
    defaultValue,
    onValueChange,
    query,
    setQuery,
    defaultQuery,
    options,
    getOptionLabel: propGetOptionLabel,
    getOptionProps: propGetOptionProps,
    allowAnyValue,
    listboxProps,
    listboxLabel,
    listboxLabelledBy,
    selectedIcon,
    unselectedIcon,
    selectedIconAfter,
    checkboxes,
    disableSelectedIcon,
    loading,
    loadingProps,
    dropdownButtonProps,
    disableDropdownButton,
    clearButtonProps,
    disableClearButton,
    noOptionsChildren = <ListSubheader>No Options</ListSubheader>,
    leftAddon: propLeftAddon,
    disableLeftAddonStyles: propDisableLeftAddonStyles,
    labelProps,
    rightAddon,
    rightAddonProps,
    containerProps,
    getChipProps = noop,
    updateQueryOnSelect,
    visible,
    setVisible,
    defaultVisible,
    disableInlineChips,
    disableCloseOnSelect,
    ...remaining
  } = props;
  const { form, disabled } = props;

  const id = useEnsuredId(propId, "autocomplete");
  const menuId = useEnsuredId(listboxProps?.id, "autocomplete-listbox");
  const {
    query: currentQuery,
    value: currentValue,
    setValue: currentSetValue,
    multiselect,
    comboboxRef: inputNodeRef,
    comboboxProps,
    movementContext,
    availableOptions,
    getOptionLabel,
    getOptionProps,
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
    filterSelected,
    popupId: menuId,
    popupRef: listboxProps?.ref,
    comboboxId: id,
    comboboxRef: inputRef,
    options,
    getOptionLabel: propGetOptionLabel,
    getOptionProps: propGetOptionProps,
    allowAnyValue,
    updateQueryOnSelect,
    value,
    setValue,
    defaultValue,
    onValueChange,
    query,
    setQuery,
    defaultQuery,
    defaultVisible,
    visible,
    setVisible,
    checkboxes,
    selectedIcon,
    unselectedIcon,
    selectedIconAfter,
    disableSelectedIcon,
    disableCloseOnSelect,
  });
  const [containerRef, containerRefCallback] = useEnsuredRef(
    containerProps?.ref
  );

  let leftAddon = propLeftAddon;
  let disableLeftAddonStyles = propDisableLeftAddonStyles;
  let inlineChips = false;
  let floatingActive = labelProps?.floatingActive;
  if (multiselect && !disableInlineChips) {
    inlineChips = true;
    // TODO: Maybe one day fix the typing? Might not be possible with
    // destructuring though
    const value = currentValue as readonly Option[];
    disableLeftAddonStyles ??= true;
    floatingActive ||= value.length > 0;
    leftAddon = (
      <>
        {value.map((option, index) => {
          const label = getOptionLabel(option);
          const overrides = getChipProps({
            index,
            query: currentQuery,
            option,
            extractor: getOptionLabel,
          });
          return (
            <AutocompleteChip
              key={label}
              {...overrides}
              onClick={(event) => {
                overrides?.onClick?.(event);
                currentSetValue(value.filter((v) => v !== option));
              }}
            >
              {overrides?.children ?? label}
            </AutocompleteChip>
          );
        })}
      </>
    );
  }

  return (
    <KeyboardMovementProvider value={movementContext}>
      <TextField
        {...remaining}
        {...comboboxProps}
        containerProps={{
          ...containerProps,
          ref: containerRefCallback,
          onClick: (event) => {
            containerProps?.onClick?.(event);
            inputNodeRef.current?.focus();
          },
        }}
        className={autocomplete({
          className,
          loading,
          inlineChips,
          disableClearButton,
          disableDropdownButton,
        })}
        labelProps={{
          ...labelProps,
          floatingActive,
        }}
        leftAddon={leftAddon}
        disableLeftAddonStyles={disableLeftAddonStyles}
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
        {...getListboxProps(listboxProps)}
        fixedTo={containerRef}
      >
        <AutocompleteListboxChildren
          query={currentQuery}
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
