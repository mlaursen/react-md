"use client";

import {
  type FocusEventHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type Ref,
  type RefCallback,
  type RefObject,
  useCallback,
  useRef,
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
import { getTransitionCallbacks } from "../transition/getTransitionCallbacks.js";
import { type TransitionCallbacks } from "../transition/types.js";
import {
  type NonNullMutableRef,
  type UseStateInitializer,
  type UseStateSetter,
} from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useEnsuredState } from "../useEnsuredState.js";
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
  show: () => void;
  hide: () => void;
  visible: boolean;

  /**
   * @since 6.3.0 Renamed from `focusLast` to `focusLastRef` to support the new
   * actions.
   */
  focusLastRef: NonNullMutableRef<boolean>;
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
export interface ComboboxVisibilityOptions {
  /**
   * This can be used to control the popup's visibility and **must** be used
   * along with {@link setVisible}.
   */
  visible?: boolean;

  /**
   * Used to control the popup's visibility and should generally be a `useState`
   * setter.
   *
   * @example Controlling the Visibility
   * ```tsx
   * const [visible, setVisible] = useState(false);
   *
   * useCombobox({
   *   visible,
   *   setVisible,
   * });
   * ```
   */
  setVisible?: UseStateSetter<boolean>;

  /**
   * Set this to `true` to have the combobox's popup visible by default.
   *
   * @defaultValue `false`
   */
  defaultVisible?: UseStateInitializer<boolean>;
}

/**
 * @since 6.0.0
 */
export interface ConfigurableComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
>
  extends
    ComboboxKeyboardMovementOptions<ComboboxEl>,
    ComboboxVisibilityOptions {
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
export interface ComboboxGetEnterDefaultFocusedIndexOptions {
  focusLast: boolean;
  focusables: readonly HTMLElement[];
  currentFocusIndex: number;
}

/**
 * @since 6.0.0
 */
export interface ComboboxOptions<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends ConfigurableComboboxOptions<ComboboxEl, PopupEl> {
  getEnterDefaultFocusedIndex: (
    options: ComboboxGetEnterDefaultFocusedIndexOptions
  ) => number;
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
>
  extends
    Required<ComboboxTransitionCallbacks>,
    ComboboxWidgetPopupProps<PopupEl> {
  visible: boolean;
  onRequestClose: () => void;
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
  extends
    Omit<ConfigurableComboboxMenuProps, keyof ProvidedComboboxMenuProps>,
    ProvidedComboboxMenuProps<PopupEl> {}

/**
 * @since 6.0.0
 */
export interface ComboboxImplementation<
  ComboboxEl extends HTMLElement = HTMLInputElement,
  PopupEl extends HTMLElement = HTMLElement,
> extends Omit<KeyboardMovementProviderImplementation<ComboboxEl>, "nodeRef"> {
  show: () => void;
  hide: () => void;
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
  getMenuProps: (
    overrides?: ConfigurableComboboxMenuProps
  ) => ComboboxMenuProps<PopupEl>;
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
    visible: propVisible,
    setVisible: propSetVisible,
    defaultVisible = false,
    comboboxId: propComboboxId,
    comboboxRef: propComboboxRef,
    popupId: propPopupId,
    popupRef: propPopupRef,
    onFocusChange = noop,
    extendKeyDown = noop,
    getFocusableElements = getNonDisabledOptions,
    getEnterDefaultFocusedIndex,
    getDefaultFocusedIndex,
  } = options;

  const [visible, setVisible] = useEnsuredState({
    name: "visible",
    value: propVisible,
    setValue: propSetVisible,
    defaultValue: defaultVisible,
  });
  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const popupId = useEnsuredId(propPopupId, "combobox-popup");
  const comboboxId = useEnsuredId(propComboboxId, "combobox");
  const [popupRef, popupRefCallback] = useEnsuredRef(propPopupRef);
  const focusLastRef = useRef(false);
  const {
    nodeRef: comboboxRef,
    movementProps,
    movementContext,
    currentFocusIndex,
    activeDescendantId,
    setActiveDescendantId,
  } = useKeyboardMovementProvider<ComboboxEl>({
    ref: propComboboxRef,
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
        focusLastRef,
      });
      const { event } = movementData;
      if (event.isPropagationStopped()) {
        return;
      }

      if (visible) {
        switch (event.key) {
          case "Tab":
            // do not stop propagation for tab so that shift+tab works correctly in dialogs
            hide();
            break;
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
          focusLastRef.current = event.key === "ArrowUp";
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
    focusLast: focusLastRef,
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
      role: "combobox",
    },
    movementProps,
    movementContext,
    currentFocusIndex,
    activeDescendantId,
    setActiveDescendantId,
    getMenuProps(props = {}) {
      const {
        sheetProps,
        disableTransition,
        onEnter,
        onEntering,
        onEntered = noop,
        onExited,
        onExiting,
        onExit,
      } = props;

      // Chrome does not trigger the scrollIntoView behavior correctly while
      // using a scale transition, so need to trigger this on the entered flow
      // to really make sure the item is in view. An alternative would be to
      // implement a custom scrollIntoView behavior again like the previous
      // versions of react-md, but this is less lines of code
      const attemptScroll = (): void => {
        const activeOption = document.getElementById(activeDescendantId);
        if (activeOption) {
          activeOption.scrollIntoView({ block: "nearest" });
        }
      };
      const onEnterOnce = (): void => {
        const popup = popupRef.current;
        if (!popup) {
          attemptScroll();
          return;
        }

        const focusables = getFocusableElements(popup, true);
        const index = getEnterDefaultFocusedIndex({
          focusLast: focusLastRef.current,
          focusables,
          currentFocusIndex: currentFocusIndex.current,
        });
        focusLastRef.current = false;
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

      return {
        anchor: BELOW_CENTER_ANCHOR,
        width: "min",
        fixedTo: comboboxRef,
        ...props,
        ...popupProps,
        visible,
        onRequestClose: hide,
        ...getTransitionCallbacks({
          disableTransition,
          onEnter,
          onEntered: (appearing) => {
            onEntered(appearing);
            attemptScroll();
          },
          onEntering,
          onEnterOnce,
          onExit,
          onExiting,
          onExited,
          onExitOnce: () => {
            // since the menu is unmounted or set to hidden while not visible, need
            // to clear the aria-activedescendant and current focus index when
            // hiding
            currentFocusIndex.current = -1;
            setActiveDescendantId("");
          },
        }),
        sheetProps: {
          ...sheetProps,
          ...getTransitionCallbacks({
            ...sheetProps,
            onEnterOnce,
            disableTransition:
              sheetProps?.disableTransition ?? disableTransition,
          }),
        },
      };
    },
  };
}
