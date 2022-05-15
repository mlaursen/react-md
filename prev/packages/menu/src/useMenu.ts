import type {
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
} from "react";
import { useEffect, useRef } from "react";
import type { FABPosition } from "@react-md/button";
import { useFixedPositioning } from "@react-md/transition";
import {
  containsElement,
  useIsUserInteractionMode,
  useScrollLock,
} from "@react-md/utils";

import { useMenuBarContext } from "./MenuBarProvider";
import type {
  BaseMenuHookOptions,
  BaseMenuHookReturnValue,
  ProvidedMenuToggleProps,
} from "./types";
import { getDefaultAnchor, noop } from "./utils";

/** @remarks \@since 5.0.0 */
export interface MenuHookOptions<ToggleEl extends HTMLElement>
  extends BaseMenuHookOptions {
  /**
   * Boolean if the toggle component is currently disabled which will prevent
   * the arrow keys from opening a menuitem's menu.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * This is just used to update the default anchor behavior.
   *
   * @see {@link FABPosition}
   * @defaultValue `null`
   */
  floating?: FABPosition;

  /**
   * An optional click handler to merge with the
   * {@link MenuHookReturnValue.onClick} behavior.
   */
  onMenuClick?: MouseEventHandler<HTMLDivElement>;

  /**
   * An optional keydown handler to merge with the
   * {@link MenuHookReturnValue.menuProps} behavior. Calling
   * `event.stopPropagation()` will prevent the default behavior of closing the
   * menu when the `"Escape"` key is pressed.
   */
  onMenuKeyDown?: KeyboardEventHandler<HTMLDivElement>;

  /**
   * An optional click handler to merge with the toggle visibility behavior.
   * Calling `event.stopPropagation()` will prevent the default behavior from
   * occurring.
   */
  onToggleClick?: MouseEventHandler<ToggleEl>;

  /**
   * An optional keydown handler to merge with the
   * {@link ProvidedMenuToggleProps.onKeyDown} behavior.
   */
  onToggleKeyDown?: KeyboardEventHandler<ToggleEl>;

  /**
   * An optional keydown handler to merge with the
   * {@link ProvidedMenuToggleProps.onMouseEnter} behavior.
   */
  onToggleMouseEnter?: MouseEventHandler<ToggleEl>;

  /**
   * An optional keydown handler to merge with the
   * {@link ProvidedMenuToggleProps.onMouseLeave} behavior.
   */
  onToggleMouseLeave?: MouseEventHandler<ToggleEl>;
}

/**
 * @remarks \@since 5.0.0
 */
export interface MenuHookReturnValue<ToggleEl extends HTMLElement>
  extends BaseMenuHookReturnValue {
  /**
   * A ref that **must** be passed to the toggle element if the toggle should be
   * refocused when the menu is closed via a keyboard press. This can also be
   * used if you need access to the toggle element's DOM node for some reason.
   */
  toggleRef: MutableRefObject<ToggleEl | null>;

  /**
   * An object of props that must be provided to the toggle element for the
   * visibility functionality of menus to work.
   *
   * @see {@link ProvidedMenuToggleProps}
   */
  toggleProps: ProvidedMenuToggleProps<ToggleEl>;
}

/**
 * This hook provides all the functionality for a menu to:
 * - toggle the `Menu`'s visibility when the `MenuButton` or `MenuItemButton`
 *   has been clicked
 * - hide the `Menu` when an element outside of the `Menu` has been clicked
 * - hide the `Menu` when the `Escape` or `Tab` key has been pressed
 * - focus the `Menu` element when it gains visibility
 * - refocus the `MenuButton` or `MenuItemButton` when the menu loses visibility
 * - position the menu within the viewport with {@link useFixedPositioning}
 * - show the `Menu` when the `ArrowRight` key is pressed for a vertical
 *   `MenuItemButton`
 * - show the `Menu` when the `ArrowDown` key is pressed for a horizontal
 *   `MenuItemButton`
 * - hide the `Menu` when the `ArrowRight` key is pressed in a vertical submenu
 * - hide the `Menu` when the `ArrowDown` key is pressed in a horizontal
 *   submenu
 * - conditionally hide the `Menu` if the page is scrolled while the `Menu` is
 *   visible
 * - conditionally hide the `Menu` if the page is resized while the `Menu` is
 *   visible
 * - conditionally move focus to the next `DropdownMenu` with keyboard movement
 *   when inside of a `MenuBar`
 * - conditionally enable the visibility for a `DropdownMenu` when the mouse
 *   hovers over a `MenuItemButton` with a parent `MenuBar` that has been
 *   activated
 * - conditionally show/hide the `Menu` based on a parent `MenuBar`'s `activeId`
 *
 * This hook will probably never need to be used externally since it has been
 * integrated into the `DropdownMenu` component and `useContextMenu` hook.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { useMenu, Menu, MenuButton, MenuItem } from "@react-md/menu";
 *
 * function Example(): ReactElement {
 *   const [visible, setVisible] = useState(false);
 *   const { menuRef, menuProps, toggleRef, toggleProps } = useMenu<
 *     HTMLButtonElement
 *   >({
 *     baseId: "custom-menu-button",
 *     visible,
 *     setVisible,
 *   });
 *
 *   return (
 *     <>
 *       <MenuButton ref={toggleRef} {...toggleProps}>
 *         Button
 *       </MenuButton>
 *       <Menu ref={menuRef} {...menuProps}>
 *         <MenuItem>Item 1</MenuItem>
 *         <MenuItem>Item 2</MenuItem>
 *         <MenuItem>Item 3</MenuItem>
 *       </Menu>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 5.0.0
 */
export function useMenu<ToggleEl extends HTMLElement>(
  options: MenuHookOptions<ToggleEl>
): MenuHookReturnValue<ToggleEl> {
  const {
    baseId,
    disabled = false,
    style: propStyle,
    menuLabel,
    visible,
    setVisible,
    floating = null,
    onMenuClick = noop,
    onMenuKeyDown = noop,
    onToggleClick = noop,
    onToggleKeyDown = noop,
    onToggleMouseEnter = noop,
    onToggleMouseLeave = noop,
    menuitem = false,
    horizontal = false,
    anchor: propAnchor,
    fixedPositionOptions,
    getFixedPositionOptions,
    closeOnResize = false,
    closeOnScroll = false,
    onEnter,
    onEntering,
    onEntered = noop,
    onExited = noop,
    onFixedPositionScroll = noop,
    onFixedPositionResize = noop,
    preventScroll = false,
    disableFocusOnMount = false,
    disableFocusOnUnmount = false,
  } = options;
  const {
    root,
    menubar,
    activeId,
    setActiveId,
    hoverTimeout,
    setAnimatedOnce,
  } = useMenuBarContext();
  const touch = useIsUserInteractionMode("touch");

  const timeout = useRef<number | undefined>();
  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current);
    };
  }, []);

  // if the menu hides because the user scrolls the page or the page is resized,
  // the focus toggle behavior should be disabled since the user is no longer
  // interacting with the menu
  const cancelExitFocus = useRef(false);
  const anchor =
    propAnchor ?? getDefaultAnchor({ menubar, menuitem, floating, horizontal });
  const menuNodeRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<ToggleEl | null>(null);
  const {
    style,
    transitionOptions: { nodeRef, ...transitionOptions },
  } = useFixedPositioning({
    nodeRef: menuNodeRef,
    style: propStyle,
    fixedTo: toggleRef,
    onEnter,
    onEntering,
    onEntered(appearing) {
      cancelExitFocus.current = false;
      onEntered(appearing);
      setAnimatedOnce(true);
      if (!disableFocusOnMount) {
        menuNodeRef.current?.focus();
      }
    },
    onExited() {
      onExited();

      // this has to be done onExited or else the toggle component will be
      // clicked if the user pressed the "Enter" key which makes it look like
      // the menu never closes.
      if (!disableFocusOnUnmount && !cancelExitFocus.current) {
        toggleRef.current?.focus();
      }
    },
    anchor,
    transformOrigin: true,
    ...fixedPositionOptions,
    getFixedPositionOptions,
    onScroll(event, data) {
      onFixedPositionScroll(event, data);
      if (!data.visible || closeOnScroll) {
        cancelExitFocus.current = true;
        setVisible(false);
      }
    },
    onResize(event) {
      onFixedPositionResize(event);
      if (closeOnResize) {
        cancelExitFocus.current = true;
        setVisible(false);
      }
    },
  });
  useScrollLock(preventScroll && visible);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handler = ({ target }: MouseEvent): void => {
      if (
        !(target instanceof Element) ||
        (!menuNodeRef.current?.contains(target) &&
          !toggleRef.current?.contains(target))
      ) {
        setVisible(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [menuNodeRef, setVisible, toggleRef, visible]);
  useEffect(() => {
    if (visible) {
      return;
    }

    // this is to fix keyboard movement behavior when navigating between
    // different root-level menuitems with the `ArrowLeft` and `ArrowRight` keys
    // while menus are visible. If the exit focus behavior is not cancelled, the
    // next menu's menu will be visible, but the current menu's menuitem would
    // be the current focus which breaks everything
    cancelExitFocus.current =
      cancelExitFocus.current ||
      !menuNodeRef.current?.contains(document.activeElement);

    setActiveId((prevActiveId) =>
      baseId === prevActiveId ? "" : prevActiveId
    );
  }, [baseId, root, setActiveId, visible]);
  useEffect(() => {
    setVisible(baseId === activeId);
  }, [activeId, baseId, root, setVisible]);

  return {
    menuRef: nodeRef,
    menuProps: {
      // typecast to string so that it passes the RequireAtLeastOne<LabelA11y>
      // TS won't pass otherwise
      "aria-label": menuLabel as string,
      "aria-labelledby": menuLabel ? undefined : baseId,
      id: `${baseId}-menu`,
      style,
      ...transitionOptions,
      visible,
      onClick(event) {
        onMenuClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        // this makes it so you can click on the menu/list without closing the
        // menu
        if (event.currentTarget === event.target) {
          return;
        }

        // This might be a test only workaround since clicking links move focus
        // somewhere else
        if (event.target instanceof HTMLElement) {
          cancelExitFocus.current = containsElement(
            event.currentTarget,
            event.target.closest("a")
          );
        }
        setVisible(false);
      },
      onKeyDown(event) {
        onMenuKeyDown(event);
        if (event.isPropagationStopped()) {
          return;
        }

        switch (event.key) {
          case "Escape":
            // prevent parent components that have an "Escape" keypress event
            // from being triggered as well
            event.stopPropagation();
            setVisible(false);
            break;
          case "Tab":
            // since menus are portalled, tab index is kinda broke so just close
            // the menu instead of doing default tab behavior
            event.preventDefault();
            if (!menuitem) {
              // pressing the tab key should still cascade close all menus
              event.stopPropagation();
            }
            setVisible(false);
            break;
          case "ArrowUp":
            if (menuitem && horizontal) {
              event.stopPropagation();
              event.preventDefault();
              setVisible(false);
            }
            break;
          case "ArrowLeft":
            if (menuitem && !horizontal) {
              event.stopPropagation();
              event.preventDefault();
              setVisible(false);
            }
            break;
        }
      },
    },
    menuNodeRef,
    toggleRef,
    toggleProps: {
      "aria-haspopup": "menu",
      "aria-expanded": visible || undefined,
      id: baseId,
      onClick(event) {
        onToggleClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        if (menuitem || menubar) {
          // do not allow the default menu close behavior from
          // triggering for parent menus
          event.stopPropagation();
        }

        setVisible((prevVisible) => !prevVisible);
        setActiveId((prevActiveId) => (baseId === prevActiveId ? "" : baseId));
      },
      onKeyDown(event) {
        onToggleKeyDown(event);
        if (event.isPropagationStopped() || disabled) {
          return;
        }

        if (menubar && !menuitem && event.key === "ArrowDown") {
          event.preventDefault();
          event.stopPropagation();
          setActiveId(baseId);
          return;
        }

        if (!menuitem) {
          return;
        }

        switch (event.key) {
          case "ArrowDown":
            if (horizontal) {
              event.stopPropagation();
              event.preventDefault();
              setVisible(true);
            }
            break;
          case "ArrowRight":
            if (!horizontal) {
              event.stopPropagation();
              event.preventDefault();
              setVisible(true);
            }
            break;
        }
      },
      onMouseEnter(event) {
        onToggleMouseEnter(event);
        if (
          event.isPropagationStopped() ||
          disabled ||
          !menubar ||
          !activeId ||
          touch
        ) {
          if (typeof hoverTimeout === "number") {
            timeout.current = window.setTimeout(() => {
              setActiveId(baseId);
            }, hoverTimeout);
          }
          return;
        }

        setActiveId(baseId);
      },
      onMouseLeave(event) {
        onToggleMouseLeave(event);
        window.clearTimeout(timeout.current);
      },
    },
  };
}
