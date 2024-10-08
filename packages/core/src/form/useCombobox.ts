"use client";
import {
  useRef,
  type FocusEventHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type Ref,
  type RefCallback,
  type RefObject,
} from "react";
import { type MenuProps } from "../menu/Menu.js";
import { type MenuSheetConfigurableProps } from "../menu/MenuSheet.js";
import {
  type GetDefaultFocusedIndex,
  type GetFocusableElements,
  type KeyboardMovementExtensionData,
  type KeyboardMovementProviderImplementation,
  type KeyboardMovementProviderOptions,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { BELOW_CENTER_ANCHOR } from "../positioning/constants.js";
import {
  type PositionAnchor,
  type PositionWidth,
} from "../positioning/types.js";
import { TRANSITION_CONFIG } from "../transition/config.js";
import {
  type TransitionCallbacks,
  type TransitionEnterHandler,
  type TransitionExitHandler,
} from "../transition/types.js";
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
 * @since 6.0.0
 */
export const getNonDisabledOptions = (
  container: HTMLElement
): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLLIElement>(
    '[role="option"]:not([aria-disabled])'
  ),
];

/**
 * @since 6.0.0
 */
export type SupportedComboboxPopup = "listbox" | "grid" | "dialog";

/**
 * @since 6.0.0
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
 * @since 6.0.0
 */
export type ExtendComboboxKeyDown<E extends HTMLElement = HTMLInputElement> = (
  movementData: ComboboxKeyboardMovementData<E>
) => void;

/**
 * @since 6.0.0
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
  | "onFocusChange"
  | "isNegativeOneAllowed"
>;

/**
 * @since 6.0.0
 */
export interface BaseComboboxOptions<
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
  multiselect?: boolean;

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
 * @since 6.0.0
 */
export interface ComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends BaseComboboxOptions<ComboboxEl, PopupEl> {
  getEnterDefaultFocusedIndex(options: {
    focusLast: boolean;
    focusables: readonly HTMLElement[];
    currentFocusIndex: number;
  }): number;
}

/**
 * @since 6.0.0
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
 * @since 6.0.0
 */
export interface ComboboxWidgetPopupProps<
  PopupEl extends HTMLElement = HTMLElement,
> {
  "aria-multiselectable": true | undefined;
  id: string;
  ref: RefCallback<PopupEl>;
  role: "listbox" | "dialog" | "grid";
}

/**
 * @since 6.0.0
 */
export type ComboboxTransitionCallbacks = Pick<
  TransitionCallbacks,
  "onEntering" | "onEntered" | "onExiting" | "onExited"
>;

/**
 * @since 6.0.0
 */
export interface ComboboxTransitionOptions extends ComboboxTransitionCallbacks {
  disableTransition?: boolean;
}

/**
 * @since 6.0.0
 */
export type ConfigurableComboboxMenuProps = Partial<
  Omit<MenuProps, "visible" | "onRequestClose" | keyof ComboboxWidgetPopupProps>
>;

/**
 * @since 6.0.0
 */
export interface ProvidedComboboxMenuProps<
  PopupEl extends HTMLElement = HTMLDivElement,
> extends Required<ComboboxTransitionCallbacks>,
    ComboboxWidgetPopupProps<PopupEl> {
  visible: boolean;
  onRequestClose(): void;

  /** @defaultValue `"min"` */
  width: PositionWidth;

  /** @defaultValue `BELOW_CENTER_ANCHOR` */
  anchor: PositionAnchor;

  fixedTo: RefObject<HTMLElement>;

  sheetProps: MenuSheetConfigurableProps &
    Required<ComboboxTransitionCallbacks>;
}

/**
 * @since 6.0.0
 */
export interface ComboboxMenuProps<PopupEl extends HTMLElement = HTMLDivElement>
  extends Omit<ConfigurableComboboxMenuProps, keyof ProvidedComboboxMenuProps>,
    ProvidedComboboxMenuProps<PopupEl> {}

/**
 * @since 6.0.0
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

  /**
   * Since the combobox usually uses the `Menu` as a popup element, this is a
   * helper util to create the required props and merge any additional props
   * with reasonable defaults.
   */
  getMenuProps(
    overrides?: ConfigurableComboboxMenuProps
  ): ComboboxMenuProps<PopupEl>;
  getTransitionCallbacks(
    options: ComboboxTransitionOptions
  ): Required<ComboboxTransitionCallbacks>;
}

/**
 * @since 6.0.0
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
    multiselect,
    isNegativeOneAllowed,
    loopable,
    disabled,
    comboboxId: propComboboxId,
    comboboxRef: propComboboxRef,
    popupId: propPopupId,
    popupRef: propPopupRef,
    defaultVisible = false,
    onFocusChange = noop,
    extendKeyDown = noop,
    getFocusableElements = getNonDisabledOptions,
    getEnterDefaultFocusedIndex,
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
    activeDescendantId,
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
    onFocusChange,
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
  const getTransitionCallbacks = (
    options: ComboboxTransitionOptions = {}
  ): Required<ComboboxTransitionCallbacks> => {
    const { onEntered, onEntering, onExiting, onExited, disableTransition } =
      options;

    const handleEntering =
      (callback: TransitionEnterHandler = noop, skipped: boolean) =>
      (appearing: boolean) => {
        callback(appearing);

        const popup = popupRef.current;
        if (!popup || skipped) {
          // Chrome does not trigger the scrollIntoView behavior correctly while
          // using a scale transition, so need to trigger this on the entered
          // flow to really make sure the item is in view.
          // An alternative would be to implement a custom scrollIntoView
          // behavior again like the previous versions of react-md, but this is
          // less lines of code
          const activeOption = document.getElementById(activeDescendantId);
          if (activeOption) {
            activeOption.scrollIntoView({ block: "nearest" });
          }
          return;
        }

        const focusables = getFocusableElements(popup, true);
        const index = getEnterDefaultFocusedIndex({
          focusLast: focusLast.current,
          focusables,
          currentFocusIndex: currentFocusIndex.current,
        });
        focusLast.current = false;
        currentFocusIndex.current = index;

        const option = focusables[index];
        if (!option) {
          return;
        }

        onFocusChange({
          index,
          element: option,
        });

        option.scrollIntoView({ block: "nearest" });
        setActiveDescendantId(option.id || "");
      };
    const handleExiting =
      (callback: TransitionExitHandler = noop, skipped: boolean) =>
      (): void => {
        callback();

        if (!skipped) {
          // since the menu is unmounted or set to hidden while not visible, need
          // to clear the aria-activedescendant and current focus index when
          // hiding
          currentFocusIndex.current = -1;
          setActiveDescendantId("");
        }
      };

    const isTransitionCompleteSkipped =
      !disableTransition && !TRANSITION_CONFIG.disabled;

    return {
      onEntering: handleEntering(onEntering, false),
      onEntered: handleEntering(onEntered, isTransitionCompleteSkipped),
      onExiting: handleExiting(onExiting, false),
      onExited: handleExiting(onExited, isTransitionCompleteSkipped),
    };
  };

  const popupProps: ComboboxWidgetPopupProps<PopupEl> = {
    "aria-multiselectable": multiselect || undefined,
    id: popupId,
    ref: popupRefCallback,
    role: popup,
  };

  return {
    show,
    hide,
    visible,
    setVisible,
    focusLast,
    popupRef,
    popupProps,
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
    activeDescendantId,
    setActiveDescendantId,
    getTransitionCallbacks,
    getMenuProps(props = {}) {
      const { sheetProps, disableTransition } = props;
      return {
        anchor: BELOW_CENTER_ANCHOR,
        width: "min",
        fixedTo: comboboxRef,
        ...props,
        ...popupProps,
        visible,
        onRequestClose: hide,
        ...getTransitionCallbacks(props),
        sheetProps: {
          ...sheetProps,
          ...getTransitionCallbacks({
            ...sheetProps,
            disableTransition:
              sheetProps?.disableTransition ?? disableTransition,
          }),
        },
      };
    },
  };
}
