import { MutableRefObject, useEffect } from "react";

interface CloseOnOutsideClickOptions {
  visible: boolean;
  controlId: string;
  menu: MutableRefObject<HTMLDivElement | null>;
  onRequestClose: () => void;
}

const contains = (element: HTMLElement | null, target: HTMLElement | null) =>
  element && target && element.contains(target);

/**
 * This hook will automatically close the menu when another element outside of
 * the menu is clicked.
 */
export default function useCloseOnOutsideClick({
  visible,
  controlId,
  menu,
  onRequestClose,
}: CloseOnOutsideClickOptions) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const control = document.getElementById(controlId);
      if (!contains(control, target) && !contains(menu.current, target)) {
        onRequestClose();
      }
    };

    window.addEventListener("click", handleClick, true);
    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, [visible, controlId]);
}
