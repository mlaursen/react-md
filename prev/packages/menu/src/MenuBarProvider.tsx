import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { noop } from "./utils";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface HoverableMenuBar {
  /**
   * When this is provided and a number greater than 0, this will allow the
   * menus to become visible on hover without clicking a `MenuItemButton`
   * beforehand. Instead, hovering over a `MenuItemButton` for this time in
   * milliseconds will display the `Menu`.
   */
  hoverTimeout?: number;
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuBarContext extends HoverableMenuBar {
  /**
   * Boolean if the `MenuBar` is the top-most `MenuBar`. This is just used so
   * that the top-most `DropdownMenu` can render as a `MenuItemButton` instead
   * of a `MenuButton` while maintaining the dropdown icon and keyboard behavior
   * of a `MenuButton`.
   */
  root: boolean;

  /**
   * Boolean if the `MenuBar` functionality is enabled.
   */
  menubar: boolean;

  /**
   * This isn't tied directly to a `MenuBar`, but this is used to determine if
   * there is a parent `Menu` so the `DropdownMenu` can be rendered as a
   * `MenuItemButton` instead of a `MenuButton`.
   */
  menuitem: boolean;

  /**
   * This is the current DOM id for the `MenuButton` or `MenuItemButton` this is
   * currently visible within the `MenuBar`. If the `MenuBar` behavior has not
   * been enabled or no `Menu` are visible, this will be an empty string;
   */
  activeId: string;

  /**
   * This is used to manually set the {@link activeId} based on menu visibility.
   */
  setActiveId: Dispatch<SetStateAction<string>>;

  /**
   * Boolean if at least one menu has finished the enter animation. This is used
   * to disable repeating the enter animation once the user is in hover mode
   * since it is distracting to have to wait `0.2ms` each time a new menu gains
   * visibility.
   */
  animatedOnce: boolean;

  /**
   * This should be called with the menu's `onEntered` option so that the
   * {@link animatedOnce} flag can be set to `true`. Once the {@link activeId}
   * becomes an empty string (no visible menus), this should be called again
   * with `false` so that the menu animations are visible.
   */
  setAnimatedOnce: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<MenuBarContext>({
  root: false,
  menubar: false,
  menuitem: false,
  activeId: "",
  setActiveId: noop,
  animatedOnce: false,
  setAnimatedOnce: noop,
});
context.displayName = "MenuBar";
const { Provider } = context;

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export function useMenuBarContext(): Readonly<MenuBarContext> {
  return useContext(context);
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuBarProviderProps extends HoverableMenuBar {
  /**
   * This should be set to `false` if this is a child of another `Menu`.
   *
   * @defaultValue `true`
   * @see {@link MenuBarContext.root}
   */
  root?: boolean;

  /**
   * This is used so that when the user is moving through the `MenuBar` while a
   * menu is opened, pressing the `ArrowLeft` or `ArrowRight` key will:
   * - close the current menu
   * - focus the next menu's toggle element
   * - open the next menu's toggle element
   * - move focus to the first menu item
   *
   * This should be set to the `Menu`'s id in that the example above. Otherwise
   * it should be omitted.
   *
   * @defaultValue `""`
   */
  defaultActiveId?: string;

  children: ReactNode;
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export function MenuBarProvider({
  children,
  root = true,
  defaultActiveId = "",
  hoverTimeout,
}: MenuBarProviderProps): ReactElement {
  const { menubar } = useMenuBarContext();
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [animatedOnce, setAnimatedOnce] = useState(!!defaultActiveId);
  const value = useMemo<MenuBarContext>(
    () => ({
      root,
      menubar: root || menubar,
      menuitem: true,
      activeId,
      setActiveId,
      hoverTimeout,
      animatedOnce,
      setAnimatedOnce,
    }),
    [activeId, animatedOnce, hoverTimeout, menubar, root]
  );
  useEffect(() => {
    if (!activeId) {
      setAnimatedOnce(false);
    }
  }, [activeId]);

  return <Provider value={value}>{children}</Provider>;
}
