"use client";

import { useCallback, useMemo, useRef } from "react";

import { useEditableCombobox } from "../form/useEditableCombobox.js";
import {
  type EditableHTMLElement,
  triggerManualChangeEvent,
} from "../form/utils.js";
import { getIcon } from "../icon/config.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { getTransitionCallbacks } from "../transition/getTransitionCallbacks.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  defaultAutocompleteExtractor,
  defaultAutocompleteFilter,
  defaultAutocompleteGetOptionProps,
  noopAutocompleteFilter,
} from "./defaults.js";
import {
  type AutocompleteImplementation,
  type AutocompleteMultiSelectImplementation,
  type AutocompleteMultiSelectOptions,
  type AutocompleteOption,
  type AutocompleteOptions,
  type AutocompleteSingleSelectImplementation,
  type AutocompleteSingleSelectOptions,
} from "./types.js";
import {
  enforceSelectedValue,
  getDefaultQuery,
  getDefaultValue,
  isMultipleValues,
} from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * This is the single select autocomplete implementation.
 *
 * @since 6.0.0
 */
export function useAutocomplete<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: AutocompleteSingleSelectOptions<Option, ComboboxEl, PopupEl>
): AutocompleteSingleSelectImplementation<Option, ComboboxEl, PopupEl>;
/**
 * This is the multiselect autocomplete implementation.
 *
 * @since 6.0.0
 */
export function useAutocomplete<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: AutocompleteMultiSelectOptions<Option, ComboboxEl, PopupEl>
): AutocompleteMultiSelectImplementation<Option, ComboboxEl, PopupEl>;
/**
 * This is an internal override implementation where the types are less strict
 * so it can be used with the `Autocomplete` component.
 *
 * @since 6.0.0
 * @internal
 */
export function useAutocomplete<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: AutocompleteOptions<Option, ComboboxEl, PopupEl>
): AutocompleteImplementation<Option, ComboboxEl, PopupEl>;
/**
 * @since 6.0.0
 * @internal
 */
export function useAutocomplete<
  Option extends AutocompleteOption,
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: AutocompleteOptions<Option, ComboboxEl, PopupEl>
): AutocompleteImplementation<Option, ComboboxEl, PopupEl> {
  const {
    value: propValue,
    setValue: propSetValue,
    defaultValue,
    onValueChange = noop,
    query: propQuery,
    setQuery: propSetQuery,
    defaultQuery,
    options: values,
    getOptionLabel = defaultAutocompleteExtractor,
    getOptionProps = defaultAutocompleteGetOptionProps,
    onBlur = noop,
    onChange = noop,
    onOpen = noop,
    filter = defaultAutocompleteFilter,
    filterSelected,
    allowAnyValue = filter === noopAutocompleteFilter,
    multiselect: propMultiselect,
    checkboxes,
    selectedIcon: propSelectedIcon,
    unselectedIcon: propUnselectedIcon,
    selectedIconAfter,
    disableSelectedIcon: propDisableSelectedIcon,
    updateQueryOnSelect: propUpdateQueryOnSelect,
    disableCloseOnSelect: propDisableCloseOnSelect,
    ...comboboxOptions
  } = options;

  const mode = useUserInteractionMode();
  const [value, setValueState] = useEnsuredState({
    value: propValue,
    setValue: propSetValue,
    defaultValue: getDefaultValue({
      query: propQuery,
      filter,
      multiselect: propMultiselect,
      defaultQuery,
      defaultValue,
      options: values,
      getOptionLabel,
    }),
  });
  const multiselect =
    propMultiselect ??
    (!!value && typeof value === "object" && "length" in value);
  let updateQueryOnSelect = propUpdateQueryOnSelect;
  if (typeof propUpdateQueryOnSelect === "undefined") {
    updateQueryOnSelect = multiselect ? "clear" : "selected";
  }

  const disableCloseOnSelect =
    propDisableCloseOnSelect ?? (multiselect && checkboxes);

  const [query, setQuery] = useEnsuredState({
    value: propQuery,
    setValue: propSetQuery,
    defaultValue: getDefaultQuery({
      value,
      getOptionLabel,
      defaultQuery,
    }),
  });
  const setValue = useCallback(
    (value: Option | null | readonly Option[]) => {
      onValueChange(value);
      setValueState(value);
    },
    [onValueChange, setValueState]
  );

  const combobox = useEditableCombobox<ComboboxEl, PopupEl>({
    ...comboboxOptions,
    multiselect,
  });
  const {
    visible,
    setVisible,
    popupRef,
    comboboxRef,
    comboboxProps,
    getMenuProps,
  } = combobox;

  // These refs are used to make it so that the options are not filtered until
  // the user types a new query while the listbox is visible. The filtered
  // options will be "cached" while:
  // - the listbox is closing
  // - the listbox is opening and:
  //   - the user has not typed at least one letter
  //   - the options have not changed
  const entered = useRef(visible);
  const initialQuery = useRef("");
  const prevAvailableOptions = useRef<readonly Option[] | null>(null);
  const isQueryChange =
    query && query !== initialQuery.current && entered.current;

  let availableOptions = prevAvailableOptions.current || values;
  if (
    isQueryChange &&
    filter !== noopAutocompleteFilter &&
    !prevAvailableOptions.current
  ) {
    initialQuery.current = "";
    availableOptions = filter({
      list: values,
      query,
      extractor: getOptionLabel,
    });
  }

  // This is probably overkill, but `filterSelected` will create a quick-lookup
  // for all the selected values in a `Set` since it is much faster than
  // `Array.includes()`. The lookup will only be re-created whenever the `value`
  // changes or is uninitialized to prevent it being created each render as
  // well.
  //
  // These optimizations only start mattering when there are around 5000 items
  // selected...
  const selectedOptions = useMemo(() => {
    if (!filterSelected) {
      return null;
    }

    let optionList: readonly Option[] = [];
    if (isMultipleValues(value)) {
      optionList = value;
    } else if (value) {
      optionList = [value];
    }

    return new Set(optionList);
  }, [filterSelected, value]);

  if (filterSelected && selectedOptions?.size) {
    availableOptions = availableOptions.filter(
      (option) => !selectedOptions.has(option)
    );
  }

  return {
    ...combobox,
    value,
    setValue,
    query,
    setQuery,
    availableOptions,
    multiselect,
    comboboxProps: {
      ...comboboxProps,
      "aria-autocomplete": filter === noopAutocompleteFilter ? "none" : "list",
      value: query,
      onKeyDown(event) {
        comboboxProps.onKeyDown(event);
        if (!visible && event.key === "Escape") {
          setQuery("");
        }
      },
      onBlur(event) {
        onBlur(event);

        if (allowAnyValue) {
          return;
        }

        enforceSelectedValue({
          value,
          visible,
          popupRef,
          container: event.currentTarget.parentElement,
          comboboxRef,
          getOptionLabel,
          availableOptions,
          prevAvailableOptions,
        });
      },
      onFocus(event) {
        comboboxProps.onFocus(event);
        event.currentTarget.select();
      },
      onChange(event) {
        onChange(event);

        const { value } = event.currentTarget;
        setQuery(value);
        if (!value && !multiselect) {
          setValue(null);
        }
      },
    },
    getListboxProps(overrides) {
      const {
        ref,
        onEnter,
        onEntered,
        onExited,
        disableTransition,
        ...listboxProps
      } = getMenuProps(overrides);

      let selectedIcon = propSelectedIcon;
      let unselectedIcon = propUnselectedIcon;
      let disableSelectedIcon = propDisableSelectedIcon;
      if (multiselect && checkboxes) {
        if (typeof selectedIcon === "undefined") {
          selectedIcon = getIcon("checkboxChecked");
        }
        if (typeof unselectedIcon === "undefined") {
          unselectedIcon = getIcon("checkbox");
        }
      } else if (typeof disableSelectedIcon === "undefined") {
        disableSelectedIcon = true;
      }

      return {
        selectedIcon,
        unselectedIcon,
        selectedIconAfter,
        disableSelectedIcon,
        ...listboxProps,
        disableTransition,
        onRequestClose() {
          // Make it so clicking on the text field, clear button, dropdown
          // button, etc does not close the listbox
          if (
            mode !== "keyboard" &&
            comboboxRef.current?.parentElement?.contains(document.activeElement)
          ) {
            return;
          }

          listboxProps.onRequestClose();
        },
        nodeRef: ref,
        value,
        setValue(option) {
          if (!disableCloseOnSelect) {
            // this makes it so that the options are not filtered again while the
            // listbox is closing after selecting a value
            prevAvailableOptions.current = availableOptions;
          }

          if (value && typeof value === "object" && "length" in value) {
            const nextValue = [...value];
            const i = value.indexOf(option);
            if (i === -1) {
              nextValue.push(option);
            } else {
              nextValue.splice(i, 1);
            }

            setValue(nextValue);
          } else {
            setValue(option);
          }

          if (updateQueryOnSelect === "as-is") {
            return;
          }

          const nextQuery =
            updateQueryOnSelect === "clear" ? "" : getOptionLabel(option);
          triggerManualChangeEvent(comboboxRef.current, nextQuery);
        },
        ...getTransitionCallbacks({
          enter: true,
          onEnter,
          onEntered,
          onEnterOnce: () => {
            onOpen();

            // when the listbox is opened, need to flag the entered state to show
            // that new `query` values should be accepted. Also store the initial
            // query.
            entered.current = true;
            initialQuery.current = query;
          },
          disableTransition,
        }),
        onExited() {
          onExited();

          // once the listbox has exited, reset any cached states so the next
          // time the listbox is opened the filtering behaves the same
          entered.current = false;
          prevAvailableOptions.current = null;
        },
      };
    },
    getOptionLabel,
    getOptionProps(options) {
      const overrides = getOptionProps(options);

      return {
        ...overrides,
        onClick: (event) => {
          overrides?.onClick?.(event);
          if (disableCloseOnSelect) {
            event.stopPropagation();
          }
        },
      };
    },
    getClearButtonProps(overrides) {
      return {
        ...overrides,
        onClick(event) {
          overrides?.onClick?.(event);
          comboboxRef.current?.focus();

          if (!multiselect) {
            setValue(null);
          }
          triggerManualChangeEvent(comboboxRef.current, "");
        },
      };
    },
    getDropdownButtonProps(overrides) {
      return {
        "aria-controls": comboboxProps.id,
        visible,
        ...overrides,
        onClick(event) {
          overrides?.onClick?.(event);
          comboboxRef.current?.focus();
          if (visible) {
            prevAvailableOptions.current = availableOptions;
          }
          setVisible((prev) => !prev);
        },
      };
    },
  };
}
