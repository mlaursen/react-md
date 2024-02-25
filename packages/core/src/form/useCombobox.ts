"use client";
import {
  useRef,
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
  type KeyboardMovementExtensionData,
  type KeyboardMovementProviderImplementation,
  type KeyboardMovementProviderOptions,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
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
export interface ComboboxKeyboardMovementData<
  E extends HTMLElement = HTMLInputElement,
> extends KeyboardMovementExtensionData<E> {
  show(): void;
  hide(): void;
  visible: boolean;
  focusLast: NonNullMutableRef<boolean>;
}

/**
 * @remarks \@since 6.0.0
 */
export type ExtendComboboxKeyDown<E extends HTMLElement = HTMLInputElement> = (
  movementData: ComboboxKeyboardMovementData<E>
) => void;

/**
 * @remarks \@since 6.0.0
 */
export type ComboboxKeyboardMovementOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
> = Pick<
  KeyboardMovementProviderOptions<ComboboxEl>,
  | "onClick"
  | "onFocus"
  | "onKeyDown"
  | "disabled"
  | "loopable"
  | "searchable"
  | "isNegativeOneAllowed"
>;

/**
 * @remarks \@since 6.0.0
 */
export interface ComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ComboboxKeyboardMovementOptions<ComboboxEl> {
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
   * @defaultValue `false`
   */
  defaultVisible?: UseStateInitializer<boolean>;

  extendKeyDown?: ExtendComboboxKeyDown<ComboboxEl>;

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
  "aria-controls": string;
  "aria-disabled": true | undefined;
  "aria-expanded": boolean;
  "aria-haspopup": SupportedComboboxPopup;
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
    popup = "listbox",
    onClick = noop,
    onFocus,
    onKeyDown,
    searchable,
    isNegativeOneAllowed,
    loopable,
    disabled,
    comboboxId: propComboboxId,
    comboboxRef: propComboboxRef,
    popupId: propPopupId,
    popupRef: propPopupRef,
    defaultVisible = false,
    extendKeyDown = noop,
    getFocusableElements = getNonDisabledOptions,
    getDefaultFocusedIndex,
  } = options;

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
    onKeyDown,
    onClick(event) {
      onClick(event);
      if (disabled) {
        return;
      }

      show();
    },
    extendKeyDown(movementData) {
      extendKeyDown({
        ...movementData,
        show,
        hide,
        visible,
        focusLast,
      });
      const { event } = movementData;
      if (event.isPropagationStopped()) {
        return;
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
        }

        // while visible, always use the default keyboard movement behavior
        return;
      }

      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          event.stopPropagation();
          focusLast.current = event.key === "ArrowUp";
          show();
          break;
        case "Enter":
          tryToSubmitRelatedForm(event, form);
          break;
      }
    },
    disabled,
    loopable,
    searchable,
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
    isNegativeOneAllowed,
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
      "aria-controls": popupId,
      "aria-disabled": disabled || undefined,
      "aria-expanded": visible,
      "aria-haspopup": popup,
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
