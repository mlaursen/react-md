import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useState } from "react";
import type { InitialCoords } from "@react-md/utils";
import { BELOW_INNER_LEFT_ANCHOR, containsElement } from "@react-md/utils";

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
   * the default context menu behavior will not occur.
   */
  onContextMenu?<E extends HTMLElement>(event: MouseEvent<E>): void;

  /**
   * Unlike other menus, context menus will default to no longer allowing the
   * page to be scrolled while visible.
   *
   * @see {@link BaseMenuHookOptions.preventScroll}
   * @defaultValue `true`.
   */
  preventScroll?: boolean;
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

  /**
   * This function can be used to manually move the context menu to new
   * coordinates if the default behavior did not work. You probably won't ever
   * need to use this.
   */
  setCoords: Dispatch<SetStateAction<InitialCoords>>;
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
  preventScroll = true,
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
    preventScroll,
  });

  return {
    menuRef,
    menuProps,
    menuNodeRef,
    visible,
    setVisible,
    setCoords,
    onContextMenu(event) {
      onContextMenu(event);
      if (
        event.isPropagationStopped() ||
        // make it so that if you right click the custom context menu, the
        // browser's default context menu can appear (mostly for being able to
        // inspect your custom context menu)
        /* istanbul ignore next */
        (event.target instanceof HTMLElement &&
          containsElement(menuNodeRef.current, event.target))
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setCoords({
        initialX: event.clientX,
        initialY: event.clientY,
      });
      setVisible(true);
    },
  };
}
