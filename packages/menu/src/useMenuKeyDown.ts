import { useEffect, useMemo, useState } from "react";
import {
  extractTextContent,
  getFocusableElements,
  MovementPresets,
  useKeyboardMovement,
} from "@react-md/utils";

interface MenuKeyDownOptions {
  menu: HTMLDivElement | null;
  horizontal: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onRequestClose: () => void;
  defaultFocus: string;
  portalled: boolean;
}

/**
 * This hook allows for the keyboard movement within a menu. It'll make sure
 * that the arrow keys and typing letters can correctly focus menu items. In
 * addition, it'll automatically swap to the left and right arrow keys if the
 * menu is displayed horizontally.
 */
export function useMenuKeyDown({
  menu,
  onKeyDown,
  onRequestClose,
  portalled,
  horizontal,
  defaultFocus,
}: MenuKeyDownOptions): React.KeyboardEventHandler<HTMLDivElement> {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const items = useMemo(() => {
    if (!menu) {
      return [];
    }

    return getFocusableElements(menu, true);
  }, [menu]);

  useEffect(() => {
    if (!menu) {
      return;
    }

    if (defaultFocus === "last") {
      setFocusedIndex(items.length - 1);
    } else {
      setFocusedIndex(0);
    }

    // only want to trigger this on initial menu mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  return useKeyboardMovement<string, HTMLDivElement>({
    ...(horizontal
      ? MovementPresets.HORIZONTAL_MENU
      : MovementPresets.VERTICAL_MENU),
    focusedIndex,
    onChange({ index }) {
      setFocusedIndex(index);
      if (items[index]) {
        items[index].focus();
      }
    },
    items: items.map((item) => extractTextContent(item)),
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Escape") {
        event.stopPropagation();
        onRequestClose();
      } else if (event.key === "Tab") {
        if (portalled) {
          // have to prevent default tab behavior since tab order is ruined when
          // something is portalled. this will make it interact the same as if
          // it was an escape keypress. it's too much work to try to emulate a
          // real tab here
          event.preventDefault();
        }

        onRequestClose();
      }
    },
  })[1];
}
