import { MutableRefObject, useEffect } from "react";

interface CloseOnOutsideClickOptions {
  visible: boolean;
  controlId: string;
  menu: MutableRefObject<HTMLDivElement | null>;
  onRequestClose: () => void;
}

const contains = (
  element: HTMLElement | null,
  target: HTMLElement | null
): boolean => !!(element && target && element.contains(target));

/**
 * This hook will automatically close the menu when another element outside of
 * the menu is clicked.
 */
export default function useCloseOnOutsideClick({
  visible,
  controlId,
  menu,
  onRequestClose,
}: CloseOnOutsideClickOptions): void {
  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      const control = document.getElementById(controlId);

      // Need to also check if we have an `aria-expanded` visible anywhere since the child
      // menus need to be portalled out to fix the overflow issue in Safari. If we didn't
      // need to portal, this line could be removed as the `menu.current` would contain the
      // child menu and not close.
      const expanded =
        target &&
        menu.current &&
        menu.current.querySelector('[aria-expanded="true"]') &&
        target.closest('[role="menu"]');

      if (
        !contains(control, target) &&
        !contains(menu.current, target) &&
        !expanded
      ) {
        onRequestClose();
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
    // disabled since menu is a MutableRefObject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, controlId, onRequestClose]);
}
