"use client";

import { createContext, useContext, useMemo } from "react";

import type { HoverModeContext } from "../hoverMode/useHoverModeProvider.js";
import {
  createHoverModeContext,
  useHoverModeProvider,
} from "../hoverMode/useHoverModeProvider.js";

/**
 * @internal
 * @since 5.0.0
 * @since 6.0.0 Updated to use the new `HoverModeContext` behavior.
 */
export interface MenuBarContext extends HoverModeContext {
  root: boolean;
  menubar: boolean;
  menuitem: boolean;
}

const context = createContext<MenuBarContext>({
  ...createHoverModeContext(),
  root: false,
  menubar: false,
  menuitem: false,
});
context.displayName = "MenuBar";

/**
 * @internal
 * @since 6.0.0
 */
export const { Provider: MenuBarProvider } = context;

/**
 * @internal
 * @since 5.0.0
 */
export function useMenuBarContext(): Readonly<MenuBarContext> {
  return useContext(context);
}

/**
 * @internal
 * @since 6.0.0
 */
export interface MenuBarProviderOptions {
  root: boolean;
  menubar: boolean;
  hoverTimeout: number | undefined;

  /** @defaultValue `""` */
  defaultActiveId?: string;
}

/**
 * @internal
 * @since 6.0.0
 */
export function useMenuBarProvider(
  options: MenuBarProviderOptions
): Readonly<MenuBarContext> {
  const { hoverTimeout, root, menubar, defaultActiveId = "" } = options;

  const hoverMode = useHoverModeProvider({
    hoverTimeout,
    forceRerender: true,
    defaultActiveId,
  });

  if (defaultActiveId) {
    // without this "fix", first-level nested dropdown menus will only disable
    // the animation the first time they are shown.
    hoverMode.animatedOnceRef.current = true;
  }

  return useMemo<MenuBarContext>(
    () => ({
      // when not within a menubar, disable all the hover mode functionality by
      // creating an empty hover mode context. This makes it so nested dropdown
      // menus don't trigger the hover mode timeouts and behavior
      ...(menubar ? hoverMode : createHoverModeContext()),
      root,
      menubar,
      menuitem: true,
    }),
    [hoverMode, menubar, root]
  );
}
