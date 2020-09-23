import { HTMLAttributes, MutableRefObject, Ref } from "react";
import { useCloseOnOutsideClick, useEnsuredRef } from "@react-md/utils";

import { useMenuClick } from "./useMenuClick";
import { useMenuKeyDown } from "./useMenuKeyDown";

export interface MenuOptions {
  /**
   * An optional ref to be merged into the menu's required ref handler.
   */
  ref?: Ref<HTMLDivElement | null>;

  /**
   * Boolean if the menu is currently visible.
   */
  visible: boolean;

  /**
   * The id of the element that controls the menu's visibility. This is required
   * so that the menu won't be closed when the control element is clicked since
   * it'll have it's own toggle functionality built-in already.
   */
  controlId: string;

  /**
   * Boolean if the menu is oriented horizontally instead of vertically.  This
   * will update the keydown handlers to use the `ArrowLeft` and `ArrowRight`
   * keys instead of `ArrowUp` and `ArrrowDown` to navigate.
   */
  horizontal?: boolean;

  /**
   * An optional click handler to call when the `Menu` (or any child item) is
   * clicked. This will be merged with the default implementation to close the
   * menu once clicked.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * An optional keydown handler to call when the `Menu` (or any child item)
   * triggers a keydown event. This will be merged witht he default logic of
   * allowing items to be focused with the arrow keys or closing when the escape
   * or tab key is pressed.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;

  /**
   * The default focusable element within the menu.
   */
  defaultFocus: "first" | "last" | string;

  /**
   * The function that should close the menu.
   */
  onRequestClose: () => void;

  /**
   * Boolean if the close on outside click logic should consider the control
   * element within the menu and not call the `onRequestClose` function when it
   * is been clicked. This should be enabled when creating a context menu but
   * normally should remain `false` otherwise since the control element has it's
   * own toggle logic that conflicts with this close click.
   */
  disableControlClickOkay?: boolean;

  /**
   * Boolean if the menu has been portalled so that the tab keypress behavior
   * can be fixed since tab order is destroyed when portalling.
   */
  portalled?: boolean;
}

interface ReturnValue
  extends Pick<HTMLAttributes<HTMLDivElement>, "onClick" | "onKeyDown"> {
  ref: (instance: HTMLDivElement | null) => void;
  menuRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * This hook is used to provide all the menu functionality within the `Menu`
 * component.  It'll ensure that:
 *
 * - the menu will be closed if an element outside of the menu is clicked
 * - the menu items within the menu are keyboard focusable after typing or using
 *   the arrow keys
 * - the menu will close if the Escape key or Tab key is pressed (tab since
 *   it'll lose focus)
 * - conditionally close the menu if the page is scrolled while visible.
 */
export function useMenu({
  ref: propRef,
  visible,
  controlId,
  horizontal = false,
  onClick: propOnClick,
  onKeyDown: propOnKeyDown,
  portalled = false,
  defaultFocus,
  onRequestClose,
  disableControlClickOkay = false,
}: MenuOptions): ReturnValue {
  const [ref, refHandler] = useEnsuredRef(propRef);

  useCloseOnOutsideClick({
    element: ref,
    enabled: visible,
    onOutsideClick(element, target, contains) {
      if (!element || !target) {
        return;
      }

      const control = document.getElementById(controlId);

      // Need to also check if we have an `aria-expanded` visible anywhere since
      // the child menus need to be portalled out to fix the overflow issue in
      // Safari. If we didn't need to portal, this line could be removed as the
      // `menu.current` would contain the child menu and not close.
      const expanded =
        ref.current &&
        ref.current.querySelector('[aria-expanded="true"]') &&
        target.closest('[role="menu"]');

      if (
        (disableControlClickOkay || !contains(control, target)) &&
        !expanded
      ) {
        onRequestClose();
      }
    },
  });

  const onClick = useMenuClick({ onClick: propOnClick, onRequestClose });
  const onKeyDown = useMenuKeyDown({
    menu: ref.current,
    onKeyDown: propOnKeyDown,
    onRequestClose,
    portalled,
    horizontal,
    defaultFocus,
  });

  return {
    ref: refHandler,
    menuRef: ref,
    onClick,
    onKeyDown,
  };
}
