import type {
  InitialCoords,
  PositionAnchor,
  UseStateObject,
} from "@react-md/core";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/core";
import type { MouseEvent, RefObject } from "react";
import { useCallback, useRef, useState } from "react";

/** @remarks \@since 6.0.0 */
export interface ContextMenuProps extends InitialCoords {
  "aria-label": string;
  anchor: PositionAnchor;
  fixedTo: RefObject<HTMLElement>;
  visible: boolean;
  preventScroll: boolean;
  onRequestClose(): void;
}

/**
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0  Dropped most options since they are no longer required for the
 * context menu to work. Apply any `Menu` props directly to the `Menu` component
 * instead.
 */
export interface ContextMenuHookOptions {
  /**
   * @defaultValue `BELOW_INNER_LEFT_ANCHOR`
   * @see {@link BELOW_INNER_LEFT_ANCHOR}
   */
  anchor?: PositionAnchor;

  /**
   * @defaultValue `"Context Menu"`
   */
  menuLabel?: string;

  /**
   * @defaultValue `true`
   */
  preventScroll?: boolean;
  onContextMenu?<E extends HTMLElement>(event: MouseEvent<E>): void;
}

/**
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 Renamed from `ContextMenuHookReturnValue` to
 * `ContextMenuImplementation` and dropped the `menuRef` and `menuNodeRef`
 * fields.
 */
export interface ContextMenuImplementation
  extends UseStateObject<"visible", boolean> {
  menuProps: ContextMenuProps;
  onContextMenu<E extends HTMLElement>(event: MouseEvent<E>): void;
}

const noop = (): void => {
  // do nothing
};

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
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 No longer supports overriding most of the `Menu` props. The
 * props must be passed to the `Menu` component manually.
 */
export function useContextMenu(
  options: ContextMenuHookOptions = {}
): ContextMenuImplementation {
  const {
    anchor = BELOW_INNER_LEFT_ANCHOR,
    menuLabel = "Context Menu",
    onContextMenu = noop,
    preventScroll = true,
  } = options;
  const [coords, setCoords] = useState<InitialCoords>({});
  const [visible, setVisible] = useState(false);
  const fixedTo = useRef<HTMLElement>(null);
  const onRequestClose = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    setVisible,
    menuProps: {
      "aria-label": menuLabel,
      anchor,
      ...coords,
      fixedTo,
      visible,
      onRequestClose,
      preventScroll,
    },
    onContextMenu(event) {
      onContextMenu(event);
      if (event.isPropagationStopped()) {
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
