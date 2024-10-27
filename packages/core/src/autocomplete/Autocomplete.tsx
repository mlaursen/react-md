// this was disabled since it removes the nice type infer behavior based on the value/options
/* eslint-disable @typescript-eslint/unified-signatures */
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
