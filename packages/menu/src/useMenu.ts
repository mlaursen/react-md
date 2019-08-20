import { HTMLAttributes, MutableRefObject, Ref } from "react";
import { useCloseOnOutsideClick } from "@react-md/utils";

import useCloseOnScroll from "./useCloseOnScroll";
import useMenuClick from "./useMenuClick";
import useMenuKeyDown from "./useMenuKeyDown";
import useMenuRef from "./useMenuRef";

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
   * The id of the element that controls the menu's visibility. This
   * is required so that the menu won't be closed when the control
   * element is clicked since it'll have it's own toggle functionality
   * built-in already.
   */
  controlId: string;

  /**
   * Boolean if the menu is oriented horizontally instead of vertically.
   * This will update the keydown handlers to use the `ArrowLeft` and `ArrowRight`
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
   * triggers a keydown event. This will be merged witht he default logic
   * of allowing items to be focused with the arrow keys or closing when the
   * escape or tab key is pressed.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;

  /**
   * The function that should close the menu.
   */
  onRequestClose: () => void;

  /**
   * Boolean if the menu should no longer close when the page or any
   * outside element scrolled.
   */
  disableCloseOnScroll?: boolean;
}

interface ReturnValue
  extends Pick<HTMLAttributes<HTMLDivElement>, "onClick" | "onKeyDown"> {
  ref: (instance: HTMLDivElement | null) => void;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  onScroll?: (event: Event) => void;
}

/**
 * This hook is used to provide all the menu functionality within the `Menu` component.
 * It'll ensure that:
 *
 * - the menu will be closed if an element outside of the menu is clicked
 * - the menu items within the menu are keyboard focusable after typing or
 *   using the arrow keys
 * - the menu will close if the Escape key or Tab key is pressed (tab since it'll lose focus)
 * - conditionally close the menu if the page is scrolled while visible.
 */
export default function useMenu({
  ref: forwardedRef,
  visible,
  controlId,
  horizontal = false,
  onClick: propOnClick,
  onKeyDown: propOnKeyDown,
  onRequestClose,
  disableCloseOnScroll = false,
}: MenuOptions): ReturnValue {
  const { menu, ref } = useMenuRef(forwardedRef);
  const onScroll = useCloseOnScroll({
    menu,
    disabled: disableCloseOnScroll,
    onRequestClose,
  });

  useCloseOnOutsideClick({
    element: menu,
    enabled: visible,
    onOutideClick(element, target, contains) {
      if (!element || !target) {
        return;
      }

      const control = document.getElementById(controlId);

      // Need to also check if we have an `aria-expanded` visible anywhere since
      // the child menus need to be portalled out to fix the overflow issue in
      // Safari. If we didn't need to portal, this line could be removed as the
      // `menu.current` would contain the child menu and not close.
      const expanded =
        menu.current &&
        menu.current.querySelector('[aria-expanded="true"]') &&
        target.closest('[role="menu"]');

      if (!contains(control, target) && !expanded) {
        onRequestClose();
      }
    },
  });

  const onClick = useMenuClick({ onClick: propOnClick, onRequestClose });
  const onKeyDown = useMenuKeyDown({
    onKeyDown: propOnKeyDown,
    onRequestClose,
    horizontal,
  });

  return {
    ref,
    menuRef: menu,
    onScroll,
    onClick,
    onKeyDown,
  };
}
