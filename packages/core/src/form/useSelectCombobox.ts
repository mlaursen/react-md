"use client";
import { TRANSITION_CONFIG } from "../transition/config.js";
import {
  type TransitionEnterHandler,
  type TransitionExitHandler,
} from "../transition/types.js";
import {
  getNonDisabledOptions,
  useCombobox,
  type ComboboxImplementation,
  type ComboboxOptions,
} from "./useCombobox.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface SelectComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ComboboxOptions<ComboboxEl, PopupEl> {
  value: string;
  values: readonly string[];
}

/**
 * @remarks \@since 6.0.0
 */
export interface SelectComboboxImplementation<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ComboboxImplementation<ComboboxEl, PopupEl> {
  handleMounting(
    callback: TransitionEnterHandler | undefined,
    skipped: boolean
  ): TransitionEnterHandler;
  handleUnmounting(
    callback: TransitionExitHandler | undefined,
    skipped: boolean
  ): TransitionExitHandler;
}

/**
 * @remarks \@since 6.0.0
 */
export function useSelectCombobox<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>(
  options: SelectComboboxOptions<ComboboxEl, PopupEl>
): SelectComboboxImplementation<ComboboxEl, PopupEl> {
  const {
    getFocusableElements = getNonDisabledOptions,
    value,
    values,
    ...comboboxOptions
  } = options;

  const combobox = useCombobox({
    ...comboboxOptions,
    searchable: true,
    extendKeyDown(movementData) {
      const { event, show, focusLast, visible } = movementData;
      if (visible) {
        return;
      }

      switch (event.key) {
        case " ":
        case "Home":
        case "End":
          event.preventDefault();
          event.stopPropagation();
          focusLast.current = event.key === "End";
          show();
          break;
      }
    },
  });
  const { popupRef, focusLast, currentFocusIndex, setActiveDescendantId } =
    combobox;

  return {
    ...combobox,
    handleMounting:
      (callback = noop, skipped) =>
      (appearing) => {
        callback(appearing);

        const popup = popupRef.current;
        if (!popup || (skipped && !TRANSITION_CONFIG.disabled)) {
          return;
        }

        // Since the keyboard movement behavior is tied to the
        // `TextFieldContainer` or `input` element instead of the menu for this
        // widget, the focus index and active descendant must manually be updated
        // whenever the menu becomes visible. Without this, no items will be
        // focused until the first keyboard event that would move focus
        const focusables = getFocusableElements(popup, true);
        let index: number;
        if (focusLast.current && !value) {
          index = values.length - 1;
        } else {
          index = Math.max(
            0,
            values.findIndex((option) => option === value)
          );
        }
        focusLast.current = false;
        currentFocusIndex.current = index;

        const option = focusables[index];
        // this should only be possible if no valid children were provided
        if (!option) {
          return;
        }
        option.scrollIntoView({ block: "nearest" });
        setActiveDescendantId(option.id || "");
      },
    handleUnmounting:
      (callback = noop, skipped) =>
      () => {
        callback();

        if (!skipped || TRANSITION_CONFIG.disabled) {
          // since the menu is unmounted or set to hidden while not visible, need
          // to clear the aria-activedescendant and current focus index when
          // hiding
          currentFocusIndex.current = -1;
          setActiveDescendantId("");
        }
      },
  };
}
