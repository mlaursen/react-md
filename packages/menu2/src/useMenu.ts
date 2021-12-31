import { KeyboardEvent, useEffect, useRef, useReducer, RefObject } from "react";

export type MenuDefaultFocus = "self" | "first" | "last";
/** @internal */
const isValidMenuFocus = (value: unknown): value is MenuDefaultFocus =>
  typeof value === "string" && ["first", "last", "self"].includes(value);

interface MenuHookOptions {
  baseId: string;
  disableDeselect?: boolean;

  [key: string]: unknown;
}

interface MenuVisibilityState {
  /**
   * Boolean if the menu is currently visible
   *
   * @defaultValue `false`
   */
  visible: boolean;

  /** {@inheritdoc MenuDefaultFocus} */
  defaultFocus: MenuDefaultFocus;
}

type MenuVisibilityAction =
  | { type: "hide" }
  | { type: "toggle" }
  | { type: "show"; defaultFocus: MenuDefaultFocus };

interface MenuHookReturnValue<
  ToggleElement extends HTMLElement,
  MenuElement extends HTMLElement
> extends MenuVisibilityState {
  menuRef: RefObject<MenuElement>;
  toggleRef: RefObject<ToggleElement>;
  showMenu(defaultFocus?: MenuDefaultFocus | unknown): void;
  hideMenu(): void;
  toggleMenu(): void;
  onToggleKeyDown: <E extends Element>(event: KeyboardEvent<E>) => void;
  onContextMenu: <E extends Element>(event: React.MouseEvent<E>) => void;
}

export function useMenu<
  ToggleElement extends HTMLElement,
  MenuElement extends HTMLElement
>(options: MenuHookOptions): MenuHookReturnValue<ToggleElement, MenuElement> {
  const { disableDeselect = false } = options;
  const [state, dispatch] = useReducer(
    function reducer(
      state: MenuVisibilityState,
      action: MenuVisibilityAction
    ): MenuVisibilityState {
      const { visible, defaultFocus } = state;
      switch (action.type) {
        case "show":
          if (visible && defaultFocus === action.defaultFocus) {
            return state;
          }

          return {
            visible: true,
            defaultFocus: action.defaultFocus,
          };
        case "hide":
          if (!visible) {
            return state;
          }

          return {
            visible: false,
            defaultFocus: state.defaultFocus,
          };
        case "toggle":
          return {
            visible: !visible,
            defaultFocus: visible ? defaultFocus : "first",
          };
      }
    },
    undefined,
    () =>
      ({
        visible: false,
        defaultFocus: "first",
      } as const)
  );

  const { visible, defaultFocus } = state;
  const menuRef = useRef<MenuElement>(null);
  const toggleRef = useRef<ToggleElement>(null);

  const showMenu = (
    defaultFocusOrUnknown: MenuDefaultFocus | undefined
  ): void => {
    const defaultFocus = isValidMenuFocus(defaultFocusOrUnknown)
      ? defaultFocusOrUnknown
      : "first";

    dispatch({ type: "show", defaultFocus });
  };
  const hideMenu = (): void => {
    dispatch({ type: "hide" });
  };
  const toggleMenu = (): void => {
    dispatch({ type: "toggle" });
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handler = (event: MouseEvent): void => {
      const { target } = event;
      if (
        !(target instanceof Element) ||
        (menuRef.current?.contains(target) &&
          toggleRef.current?.contains(target))
      ) {
        dispatch({ type: "hide" });
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [visible]);

  return {
    visible,
    defaultFocus,
    menuRef,
    toggleRef,
    showMenu,
    hideMenu,
    toggleMenu,
    onToggleKeyDown(event) {
      if (event.isPropagationStopped()) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          event.stopPropagation();
          event.preventDefault();
          showMenu("last");
          break;
        case "ArrowDown":
          event.stopPropagation();
          event.preventDefault();
          showMenu("first");
          break;
        case " ":
          event.stopPropagation();
          break;
        case "Enter":
          event.stopPropagation();
      }
    },
    onContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      const selection = window.getSelection();
      if (selection && !disableDeselect) {
        selection.empty();
      }
    },
  };
}
