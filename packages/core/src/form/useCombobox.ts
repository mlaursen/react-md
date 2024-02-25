"use client";
import {
  useRef,
  type AriaAttributes,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type Ref,
  type RefCallback,
  type RefObject,
} from "react";
import {
  type GetDefaultFocusedIndex,
  type GetFocusableElements,
  type KeyboardMovementProviderImplementation,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { isSearchableEvent } from "../movement/utils.js";
import {
  type NonNullMutableRef,
  type UseStateInitializer,
  type UseStateSetter,
} from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useToggle } from "../useToggle.js";
import { tryToSubmitRelatedForm } from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export const getNonDisabledOptions = (
  container: HTMLElement
): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLLIElement>(
    '[role="option"]:not([aria-disabled])'
  ),
];

/**
 * @remarks \@since 6.0.0
 */
export type SupportedComboboxPopup = "listbox" | "grid" | "dialog";

/**
 * @remarks \@since 6.0.0
 */
export interface ComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> {
  /**
   * This is the {@link InputHTMLAttributes.form} attribute and is used to
   * attempt submitting a form when the enter key is pressed.
   */
  form?: string;

  /**
   * @defaultValue `"combobox-popup-" + useId()`
   */
  popupId?: string;
  popupRef?: Ref<PopupEl>;

  /**
   * @defaultValue `"combobox-" + useId()`
   */
  comboboxId?: string;
  comboboxRef?: Ref<ComboboxEl>;

  /**
   * @defaultValue `"listbox"`
   */
  popup?: "listbox" | "grid" | "dialog";

  /**
   * Used to determine the keyboard completion behavior with the {@link popup}
   * type:
   *
   * - `"none"` - applies `aria-autocomplete="none"` and focusing options does
   *   not update the value automatically. the user must select an option with
   *   enter
   * - `"list"` - applies `aria-autocomplete="list"` and focusing options
   *   immediately updates the value
   * - `"both"` - applies `aria-autocomplete="both"`, focusing options
   *   immediately updates the value, and typing will attempt to autocomplete
   *   the rest of the match inline using selection ranges
   * - `"select"` - acts as a `<select>` element and is **not editable**.
   *
   * @defaultValue `"list"`
   */
  autocomplete?: "none" | "list" | "both" | "select";

  onClick?: MouseEventHandler<ComboboxEl>;
  onFocus?: FocusEventHandler<ComboboxEl>;
  onKeyDown?: KeyboardEventHandler<ComboboxEl>;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * @defaultValue `false`
   */
  defaultVisible?: UseStateInitializer<boolean>;

  /**
   * @defaultValue {@link getNonDisabledOptions}
   */
  getFocusableElements?: GetFocusableElements;

  getDefaultFocusedIndex?: GetDefaultFocusedIndex;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ComboboxWidgetProps<
  ComboboxEl extends HTMLElement = HTMLInputElement,
> {
  "aria-disabled": true | undefined;
  "aria-haspopup": SupportedComboboxPopup;
  "aria-expanded": boolean;
  "aria-autocomplete"?: AriaAttributes["aria-autocomplete"];
  id: string;
  ref: RefCallback<ComboboxEl>;
  role: "combobox";
  onClick: MouseEventHandler<ComboboxEl>;
  onFocus: FocusEventHandler<ComboboxEl>;
  onKeyDown: KeyboardEventHandler<ComboboxEl>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ComboboxWidgetPopupProps<
  PopupEl extends HTMLElement = HTMLElement,
> {
  id: string;
  ref: RefCallback<PopupEl>;
  role: "listbox" | "dialog" | "grid";
}

/**
 * @remarks \@since 6.0.0
 */
export interface ComboboxImplementation<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends KeyboardMovementProviderImplementation<ComboboxEl> {
  show(): void;
  hide(): void;
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
  focusLast: NonNullMutableRef<boolean>;
  popupRef: RefObject<PopupEl>;
  popupProps: ComboboxWidgetPopupProps<PopupEl>;
  comboboxRef: RefObject<ComboboxEl>;
  comboboxProps: ComboboxWidgetProps<ComboboxEl>;
}

/**
 * @remarks \@since 6.0.0
 */
export function useCombobox<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: ComboboxOptions<ComboboxEl, PopupEl>
): ComboboxImplementation<ComboboxEl, PopupEl> {
  const {
    form,
    autocomplete = "list",
    popup = "listbox",
    onClick = noop,
    onFocus,
    onKeyDown,
    disabled = false,
    comboboxId: propComboboxId,
    comboboxRef: propComboboxRef,
    popupId: propPopupId,
    popupRef: propPopupRef,
    defaultVisible = false,
    getFocusableElements = getNonDisabledOptions,
    getDefaultFocusedIndex,
  } = options;
  const isSelect = autocomplete === "select";

  const {
    toggled: visible,
    enable: show,
    disable: hide,
    setToggled: setVisible,
  } = useToggle(defaultVisible);
  const popupId = useEnsuredId(propPopupId, "combobox-popup");
  const comboboxId = useEnsuredId(propComboboxId, "combobox");
  const [comboboxRef, comboboxRefCallback] = useEnsuredRef(propComboboxRef);
  const [popupRef, popupRefCallback] = useEnsuredRef(propPopupRef);
  const focusLast = useRef(false);
  const {
    movementProps,
    movementContext,
    currentFocusIndex,
    setActiveDescendantId,
  } = useKeyboardMovementProvider<ComboboxEl>({
    onFocus,
    onClick(event) {
      onClick(event);
      if (disabled) {
        return;
      }

      show();
    },
    extendKeyDown(movementData) {
      const { event, currentFocusIndex, setActiveDescendantId } = movementData;
      const resetFocus = (): void => {
        currentFocusIndex.current = -1;
        setActiveDescendantId("");
      };

      if (!visible && !isSelect && isSearchableEvent(event)) {
        show();
        resetFocus();
      }

      if (visible) {
        switch (event.key) {
          case "Tab":
          case "Escape":
            event.stopPropagation();
            hide();
            break;
          case "Enter":
            event.preventDefault();
            break;
          default:
          case "Home":
          case "End":
            // do not jump to start and end of listbox and instead use native
            // input typing
            if (!isSelect) {
              event.stopPropagation();
              resetFocus();
            }
            break;
          case "ArrowLeft":
          case "ArrowRight":
            if (!isSelect) {
              resetFocus();
            }
        }

        // while visible, always use the default keyboard movement behavior
        return;
      }

      switch (event.key) {
        case " ":
        case "Home":
        case "End":
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          event.stopPropagation();
          focusLast.current = event.key === "End" || event.key === "ArrowUp";
          show();
          break;
        case "Enter":
          tryToSubmitRelatedForm(event, form);
          break;
      }
    },
    onKeyDown,
    disabled,
    loopable: false,
    searchable: isSelect,
    programmatic: true,
    includeDisabled: false,
    tabIndexBehavior: "virtual",
    getFocusableElements(container, programmatic) {
      const popup = popupRef.current;
      if (!popup) {
        return [];
      }

      return getFocusableElements(popup || container, programmatic);
    },
    getDefaultFocusedIndex,
  });

  return {
    show,
    hide,
    visible,
    setVisible,
    focusLast,
    popupRef,
    popupProps: {
      id: popupId,
      ref: popupRefCallback,
      role: popup,
    },
    comboboxRef,
    comboboxProps: {
      ...movementProps,
      "aria-disabled": disabled || undefined,
      "aria-haspopup": popup,
      "aria-expanded": visible,
      "aria-autocomplete": (!isSelect && autocomplete) || undefined,
      id: comboboxId,
      ref: comboboxRefCallback,
      role: "combobox",
    },
    movementProps,
    movementContext,
    currentFocusIndex,
    setActiveDescendantId,
  };
}
