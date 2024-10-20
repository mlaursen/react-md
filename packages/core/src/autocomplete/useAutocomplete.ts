"use client";
import { useCallback, useRef } from "react";
import { useEditableCombobox } from "../form/useEditableCombobox.js";
import {
  triggerManualChangeEvent,
  type EditableHTMLElement,
} from "../form/utils.js";
import { getIcon } from "../icon/iconConfig.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { TRANSITION_CONFIG } from "../transition/config.js";
import { type TransitionEnterHandler } from "../transition/types.js";
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
    allowAnyValue = filter === noopAutocompleteFilter,
    multiselect: propMultiselect,
    checkboxes,
    selectedIcon: propSelectedIcon,
    unselectedIcon: propUnselectedIcon,
    selectedIconAfter,
    disableSelectedIcon: propDisableSelectedIcon,
    clearOnSelect: propClearOnSelect,
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
  const clearOnSelect = propClearOnSelect ?? multiselect;
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
  const entered = useRef(false);
  const initialQuery = useRef("");
  const prevAvailableOptions = useRef<readonly Option[] | null>(null);
  let availableOptions = prevAvailableOptions.current || values;
  if (
    query &&
    query !== initialQuery.current &&
    filter !== noopAutocompleteFilter &&
    entered.current &&
    !prevAvailableOptions.current
  ) {
    initialQuery.current = "";
    availableOptions = filter({
      list: values,
      query,
      extractor: getOptionLabel,
    });
  }

  return {
    ...combobox,
    value,
    setValue,
    query,
    setQuery,
    availableOptions,
    comboboxProps: {
      ...comboboxProps,
      "aria-autocomplete": "list",
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
        ...menuProps
      } = getMenuProps(overrides);

      const isTransitionCompleteSkipped =
        !disableTransition && !TRANSITION_CONFIG.disabled;

      const handleEntering =
        (callback: TransitionEnterHandler = noop, skipped: boolean) =>
        (appearing: boolean) => {
          callback(appearing);

          if (skipped) {
            return;
          }

          onOpen();

          // when the listbox is opened, need to flag the entered state to show
          // that new `query` values should be accepted. Also store the initial
          // query.
          entered.current = true;
          initialQuery.current = query;
        };

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
        ...menuProps,
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

          menuProps.onRequestClose();
        },
        nodeRef: ref,
        value,
        setValue(option) {
          // this makes it so that the options are not filtered again while the
          // listbox is closing after selecting a value
          prevAvailableOptions.current = availableOptions;

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

          const nextQuery = clearOnSelect ? "" : getOptionLabel(option);
          triggerManualChangeEvent(comboboxRef.current, nextQuery);
        },
        onEnter: handleEntering(onEnter, false),
        onEntered: handleEntering(onEntered, isTransitionCompleteSkipped),
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
