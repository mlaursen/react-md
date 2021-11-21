import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  MenuDefaultFocus,
  MenuToggleRequiredProps,
  MenuVisibilityHookOptions,
  MenuVisibilityState,
  MenuWidgetRequiredProps,
} from "./types";

/** @internal */
const isValidMenuFocus = (value: unknown): value is MenuDefaultFocus =>
  typeof value === "string" && ["first", "last", "self"].includes(value);

/**
 * @typeParam ToggleElement - The `HTMLElement` type for the toggle component.
 * Defaults to `HTMLButtonElement`.
 * @typeParam MenuElement - The `HTMLElement` type for the menu component.
 * Defaults to `HTMLDivElement`
 * @remarks \@since 4.0.0
 */
export interface MenuVisibilityHookReturnValue<
  ToggleElement extends HTMLElement = HTMLButtonElement,
  MenuElement extends HTMLElement = HTMLDivElement
> extends MenuVisibilityState {
  /**
   * A function that will show the menu with a {@link MenuDefaultFocus}. This
   * allows for an `unknown` argument so that you can safely use this as an
   * onClick handler without an additional arrow function.
   *
   * @example
   * Click Handler
   * ```ts
   * // This is okay! It will default to `"first"`
   * onClick={showMenu}
   * ```
   *
   * @param defaultFocus - This should generally be one of the
   * {@link MenuDefaultFocus} or `undefined` but can be any value.
   */
  showMenu(defaultFocus?: MenuDefaultFocus | unknown): void;

  /**
   * A function that will close the menu.
   */
  hideMenu(): void;

  /**
   * This _probably_ shouldn't be used externally, but this allows you to set
   * the {@link MenuVisibilityState} if the {@link showMenu} and
   * {@link hideMenu} functions do not work for your use case.
   */
  setMenuVisibilityState: Dispatch<SetStateAction<MenuVisibilityState>>;

  /**
   * A ref that **has** to be provided to the menu element since it is used to
   * handle closing the menu if the user clicks outside of the menu. You can
   * also use this ref yourself if you need to do anything with the menu DOM
   * node.
   */
  menuRef: RefObject<MenuElement>;

  /** {@inheritDoc MenuWidgetRequiredProps} */
  menuProps: Readonly<MenuWidgetRequiredProps<MenuElement>>;

  /**
   * A ref that **has** to be provided to the toggle element since it is used to
   * handle closing the menu if the user clicks outside of the menu and
   * positioning the menu relative to this element. You can also use this ref
   * yourself if you need to do anything with the menu DOM node.
   */
  toggleRef: RefObject<ToggleElement>;

  /** {@inheritDoc MenuToggleRequiredProps} */
  toggleProps: Readonly<MenuToggleRequiredProps<ToggleElement>>;
}

/**
 * This hook is used to handle the visibility of menus and provide some the base
 * accessibility requirements for the menu widget spec. This hook probably
 * shouldn't be used externally since the {@link DropdownMenu} component should
 * handle most use cases for you.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Button } from "@react-md/button"
 * import { Menu, useMenuVisibility } from "@react-md/menu";
 *
 * function Example(): ReactElement {
 *   const {
 *     visible,
 *     defaultFocus,
 *     menuRef,
 *     menuProps,
 *     toggleRef,
 *     toggleProps,
 *     hideMenu,
 *   } = useMenuVisibility({
 *     toggleId: "some-unique-id",
 *   });
 *
 *   return (
 *     <>
 *       <Button {...toggleProps} ref={toggleRef}>
 *         Options...
 *       </Button>
 *       <Menu
 *         {...menuProps}
 *         menuRef={menuRef}
 *         visible={visible}
 *         defaultFocus={defaultFocus}
 *         onRequestClose={hideMenu}
 *       >
 *         <MenuItem onClick={() => { /* do something *\/}}>Item 1</MenuItem>
 *         <MenuItem onClick={() => { /* do something *\/}}>Item 2</MenuItem>
 *         <MenuItem onClick={() => { /* do something *\/}}>Item 3</MenuItem>
 *       </Menu>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#menubutton}
 * @typeParam ToggleElement - The `HTMLElement` type for the toggle component.
 * Defaults to `HTMLButtonElement`.
 * @typeParam MenuElement - The `HTMLElement` type for the menu component.
 * Defaults to `HTMLDivElement`
 * @param options - {@link MenuVisibilityHookOptions}
 * @returns The {@link MenuVisibilityHookReturnValue}
 * @remarks \@since 4.0.0
 */
export function useMenuVisibility<
  ToggleElement extends HTMLElement = HTMLButtonElement,
  MenuElement extends HTMLElement = HTMLDivElement
>({
  toggleId,
  menuLabel,
  horizontal = false,
  onMenuClick,
  onMenuKeyDown,
  onToggleClick,
  onToggleKeyDown,
}: MenuVisibilityHookOptions<ToggleElement, MenuElement>): Readonly<
  MenuVisibilityHookReturnValue<ToggleElement, MenuElement>
> {
  const menuId = `${toggleId}-menu`;
  const menuRef = useRef<MenuElement>(null);
  const toggleRef = useRef<ToggleElement>(null);
  const [{ visible, defaultFocus }, setMenuVisibilityState] =
    useState<MenuVisibilityState>({
      visible: false,
      defaultFocus: "first",
    });
  const showMenu = useCallback(
    (defaultFocusOrUnknown?: MenuDefaultFocus | unknown) => {
      const defaultFocus = isValidMenuFocus(defaultFocusOrUnknown)
        ? defaultFocusOrUnknown
        : "first";

      setMenuVisibilityState({ visible: true, defaultFocus });
    },
    []
  );
  const hideMenu = useCallback(() => {
    setMenuVisibilityState(({ defaultFocus }) => ({
      visible: false,
      defaultFocus,
    }));
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handler = ({ target }: MouseEvent): void => {
      if (process.env.NODE_ENV !== "production") {
        /* eslint-disable no-console */
        const createMessage = (name: string): string =>
          `The \`Menu\` component closed because the \`${name}\` is \`null\`. This normally happens because it was not passed to a valid DOM node.`;

        if (!toggleRef.current) {
          console.error(createMessage("toggleRef"));
        }

        if (!menuRef.current) {
          console.error(createMessage("menuRef"));
        }
      }
      if (
        !(target instanceof Element) ||
        (!menuRef.current?.contains(target) &&
          !toggleRef.current?.contains(target))
      ) {
        setMenuVisibilityState(({ defaultFocus }) => ({
          visible: false,
          defaultFocus,
        }));
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
    setMenuVisibilityState,
    showMenu,
    hideMenu,
    menuRef,
    menuProps: {
      "aria-labelledby": menuLabel ? undefined : toggleId,
      "aria-label": menuLabel || undefined,
      "aria-orientation": horizontal ? "horizontal" : "vertical",
      id: menuId,
      onClick(event) {
        onMenuClick?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        hideMenu();
        toggleRef.current?.focus();
      },
      onKeyDown(event) {
        onMenuKeyDown?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        switch (event.key) {
          case "Escape":
          case "Tab":
            event.preventDefault();
            event.stopPropagation();
            hideMenu();
            toggleRef.current?.focus();
            break;
        }
      },
    },
    toggleRef,
    toggleProps: {
      "aria-haspopup": "menu",
      "aria-expanded": visible || undefined,
      id: toggleId,
      onClick(event) {
        onToggleClick?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        setMenuVisibilityState(({ defaultFocus, visible }) => {
          if (visible) {
            return {
              defaultFocus,
              visible: false,
            };
          }

          return {
            defaultFocus: "first",
            visible: true,
          };
        });
      },
      onKeyDown(event) {
        onToggleKeyDown?.(event);
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
    },
  };
}
