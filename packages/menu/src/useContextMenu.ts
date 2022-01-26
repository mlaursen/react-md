import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import {
  BELOW_INNER_LEFT_ANCHOR,
  containsElement,
  InitialCoords,
} from "@react-md/utils";

import type { BaseMenuHookOptions, BaseMenuHookReturnValue } from "./types";
import { useMenu } from "./useMenu";
import { noop } from "./utils";

/** @remarks \@since 5.0.0 */
export interface ContextMenuHookOptions
  extends Omit<BaseMenuHookOptions, "baseId" | "visible" | "setVisible"> {
  /**
   * Since there can generally only be one context menu visible at a time, this
   * will be defaulted to `"context-menu"` instead of requiring an id like the
   * {@link useMenu} hook. If the default `id` does not work for your use case,
   * it can still be overridden.
   *
   * @defaultValue `"context-menu"`
   * @see {@link BaseMenuHookOptions.baseId}
   */
  baseId?: string;

  /**
   * The label _should_ be required for a context menu since there is no valid
   * "toggle" component here to inherit a label from. However, this will be
   * defaulted to `"Context Menu"` for convenience.
   *
   * @defaultValue `"Context Menu"`
   * @see {@link BaseMenuHookOptions.menuLabel}
   */
  menuLabel?: string;

  /**
   * An optional custom contextmenu event handler that will be merged with the
   * menu visibility behavior. If this function calls `event.stopPropagation()`,
   * the default contet menu behavior will not occur.
   */
  onContextMenu?<E extends HTMLElement>(event: MouseEvent<E>): void;

  /**
   * Unlike other menus, context menus will default to closing if the page is
   * scrolled.
   *
   * @see {@link BaseMenuHookOptions.closeOnScroll}
   * @defaultValue `true`.
   */
  closeOnScroll?: boolean;
}

/** @remarks \@since 5.0.0 */
export interface ContextMenuHookReturnValue extends BaseMenuHookReturnValue {
  /**
   * An event handler that should passed to an element that causes a `Menu` to
   * appear instead of the default browser context menu.
   */
  onContextMenu<E extends HTMLElement>(event: MouseEvent<E>): void;

  /**
   * Boolean if the context menu is currently visible,
   */
  visible: boolean;

  /**
   * A function that can be used to manually set the visibility of the context
   * menu when the default behavior does not match your use case.
   */
  setVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * This hook controls the visibility and positioning for a context menu.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import [ Menu, MenuItem, useContextMenu ] from "@react-md/menu":
 *
 * function Example(): ReactElement {
 *   const { menuProps, onContextMenu } = useContextMenu();
 *
 *   return (
 *     <div onContextMenu={onContextMenu}>
 *       <textarea />
 *       <Menu {...menuProps}>
 *         <MenuItem>Cut</MenuItem>
 *         <MenuItem>Copy</MenuItem>
 *         <MenuItem>Paste</MenuItem>
 *         <MenuItem>Undo</MenuItem>
 *       </Menu>
 *     </div>
 *   );
 * }
 * ```
 *
 *
 * @remarks \@since 5.0.0
 * @param options - The {@link ContextMenuHookOptions}
 * @returns the {@link ContextMenuHookReturnValue}
 */
export function useContextMenu({
  anchor = BELOW_INNER_LEFT_ANCHOR,
  baseId = "context-menu",
  menuLabel = "Context Menu",
  fixedPositionOptions,
  onContextMenu = noop,
  closeOnScroll = true,
  ...options
}: ContextMenuHookOptions = {}): ContextMenuHookReturnValue {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<InitialCoords>({});
  const { menuRef, menuProps, menuNodeRef } = useMenu<HTMLElement>({
    ...options,
    anchor,
    baseId,
    menuLabel,
    visible,
    setVisible,
    fixedPositionOptions: {
      ...fixedPositionOptions,
      ...coords,
    },
    closeOnScroll,
  });

  return {
    menuRef,
    menuProps,
    menuNodeRef,
    visible,
    setVisible,
    onContextMenu(event) {
      onContextMenu(event);
      if (
        event.isPropagationStopped() ||
        (event.target instanceof HTMLElement &&
          containsElement(menuNodeRef.current, event.target))
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const coords: InitialCoords = {};
      if (event.button !== 0 && event.buttons !== 0) {
        coords.initialX = event.clientX;
        coords.initialY = event.clientY;
      }

      setCoords(coords);
      setVisible(true);
    },
  };
}
