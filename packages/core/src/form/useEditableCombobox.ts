"use client";

import { useRef } from "react";

import { isTypeEvent } from "../movement/utils.js";
import {
  type ComboboxImplementation,
  type ComboboxWidgetProps,
  type ConfigurableComboboxOptions,
  useCombobox,
} from "./useCombobox.js";
import {
  type EditableHTMLElement,
  isChangeableHTMLElement,
  triggerManualChangeEvent,
} from "./utils.js";

/**
 * @since 6.0.0
 */
export type EditableComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> = ConfigurableComboboxOptions<ComboboxEl, PopupEl>;

/**
 * @since 6.0.0
 */
export interface EditableComboboxWidgetProps<
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
> extends ComboboxWidgetProps<ComboboxEl> {
  /**
   * This is set to `off` to prevent browser from providing their own
   * suggestions.
   *
   * @defaultValue `"off"`
   */
  autoComplete: string;

  /**
   * This is set to `"none"` to prevent browsers from automatically capitalizing
   * the first letter.
   *
   * @defaultValue `"none"`
   */
  autoCapitalize: string;
}

/**
 * @since 6.0.0
 */
export interface EditableComboboxImplementation<
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ComboboxImplementation<ComboboxEl, PopupEl> {
  comboboxProps: EditableComboboxWidgetProps<ComboboxEl>;
}

/**
 * @since 6.0.0
 */
export function useEditableCombobox<
  ComboboxEl extends EditableHTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: EditableComboboxOptions<ComboboxEl, PopupEl> = {}
): EditableComboboxImplementation<ComboboxEl, PopupEl> {
  const focusFirst = useRef(false);
  const { getMenuProps, ...combobox } = useCombobox({
    ...options,
    loopable: true,
    searchable: false,
    isNegativeOneAllowed: true,
    getEnterDefaultFocusedIndex(options) {
      const { focusLast, focusables, currentFocusIndex } = options;
      if (focusFirst.current) {
        focusFirst.current = false;
        return 0;
      }

      if (focusLast) {
        return focusables.length - 1;
      }

      return currentFocusIndex;
    },
    extendKeyDown(movementData) {
      const {
        event,
        show,
        hide,
        visible,
        currentFocusIndex,
        setActiveDescendantId,
      } = movementData;

      const resetFocus = (): void => {
        currentFocusIndex.current = -1;
        setActiveDescendantId("");
      };

      switch (event.key) {
        case "Escape":
          if (!visible && isChangeableHTMLElement(event.currentTarget)) {
            event.preventDefault();
            event.stopPropagation();
            triggerManualChangeEvent(event.currentTarget, "");
          }
          break;
        case "Home":
        case "End":
          // do not attempt to jump to the start or end of the listbox so
          // natural text editing occurs
          event.stopPropagation();
          if (visible) {
            resetFocus();
          }
          break;
        case "ArrowLeft":
        case "ArrowRight":
          if (visible) {
            resetFocus();
          }
          break;
        case "ArrowUp":
          // Note: The non-altKey version is handled in the `useCombobox` hook
          //
          // if the popup is available and the altKey was pressed, return focus
          // to the combobox without closing. If the focus was already on the
          // combobox, hide the popup
          if (visible && event.altKey) {
            event.preventDefault();
            event.stopPropagation();

            if (currentFocusIndex.current !== -1) {
              resetFocus();
            } else {
              hide();
            }
          }
          break;
        case "ArrowDown":
          // if the popup is available, display the popup keep the focus on the
          // combobox if the altKey was pressed. Otherwise, move focus into the
          // listbox
          if (!visible) {
            event.preventDefault();
            event.stopPropagation();
            focusFirst.current = !event.altKey;
            show();
          }
          break;
        default:
          if (isTypeEvent(event)) {
            show();
            resetFocus();
          }
      }
    },
  });

  return {
    ...combobox,
    comboboxProps: {
      ...combobox.comboboxProps,
      autoCapitalize: "none",
      autoComplete: "off",
    },
    getMenuProps(props) {
      return {
        // override the inherited renderAsSheet context since the sheet makes it
        // so the user can't actually type in the combobox
        renderAsSheet: false,
        preventOverlap: true,
        ...getMenuProps(props),
      };
    },
  };
}
