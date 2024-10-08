"use client";
import { useRef } from "react";
import { useEditableCombobox } from "../form/useEditableCombobox.js";
import {
  triggerManualChangeEvent,
  type EditableHTMLElement,
} from "../form/utils.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { TRANSITION_CONFIG } from "../transition/config.js";
import { type TransitionEnterHandler } from "../transition/types.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  defaultAutocompleteExtractor,
  defaultAutocompleteFilter,
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
import { getDefaultQuery, getDefaultValue } from "./utils.js";

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
    query: propQuery,
    setQuery: propSetQuery,
    defaultQuery,
    options: values,
    getOptionLabel = defaultAutocompleteExtractor,
    onBlur = noop,
    onChange = noop,
    onOpen = noop,
    filter = defaultAutocompleteFilter,
    multiselect: propMultiselect,
    selectedIconAfter,
    disableSelectedIcon,
    ...comboboxOptions
  } = options;

  const mode = useUserInteractionMode();
  const [value, setValue] = useEnsuredState({
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

  const [query, setQuery] = useEnsuredState({
    value: propQuery,
    setValue: propSetQuery,
    defaultValue: getDefaultQuery({
      value,
      getOptionLabel,
      defaultQuery,
    }),
  });

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

  /**
   * This ref is used to make sure that the options do not begin filtering until
   * the menu has become visible. This improves the UX by displaying all options
   * until the user types a new query
   */
  const entered = useRef(false);
  const initialQuery = useRef("");

  /**
   * This ref is used to make it so that the `availableOptions` are not filtered
   * again after a user has selected one of the options and the menu exit
   * transition is happening
   *
   * NOTE: This really needs to be the query since some keypress trigger it? It's because of switching between mouse `->` keybaord
   */
  const exitingOptions = useRef<readonly Option[] | null>(null);

  // TODO: What I need to have is:
  // - Open Listbox
  // - Display all options
  // - User types a new query and filters options
  // - User selects or closes the menu
  // - The options are filtered until the menu closes
  // - Restart
  //
  // This solution no good since moving keyboard focus rerenders the component
  let availableOptions = exitingOptions.current || values;
  if (
    !exitingOptions.current &&
    query &&
    entered.current &&
    filter !== noopAutocompleteFilter
  ) {
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

        // Maybe move to `useClickAway/useFocusLoss`
        const container = event.currentTarget.parentElement;
        window.requestAnimationFrame(() => {
          if (
            container?.contains(document.activeElement) ||
            popupRef.current?.contains(document.activeElement)
          ) {
            return;
          }

          if (visible) {
            exitingOptions.current = availableOptions;
          }

          let label = "";
          if (typeof value === "string") {
            label = value;
          } else if (
            typeof value === "object" &&
            value &&
            !("length" in value)
          ) {
            label = getOptionLabel(value);
          }

          triggerManualChangeEvent(comboboxRef.current, label);
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
          entered.current = true;
          initialQuery.current = query;
        };

      return {
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
          exitingOptions.current = availableOptions;

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
          triggerManualChangeEvent(comboboxRef.current, getOptionLabel(option));
        },
        onEnter: handleEntering(onEnter, false),
        onEntered: handleEntering(onEntered, isTransitionCompleteSkipped),
        onExited() {
          onExited();

          entered.current = false;
          exitingOptions.current = null;
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
            exitingOptions.current = availableOptions;
          }
          setVisible((prev) => !prev);
        },
      };
    },
  };
}
