import { useKeyboardMovement } from "@react-md/wia-aria";

interface MenuKeyDownOptions {
  horizontal: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onRequestClose: () => void;
}

/**
 * This hook allows for the keyboard movement within a menu. It'll
 * make sure that the arrow keys and typing letters can correctly focus
 * menu items. In addition, it'll automatically swap to the left and right
 * arrow keys if the menu is displayed horizontally.
 */
export default function useMenuKeyDown({
  onKeyDown,
  onRequestClose,
  horizontal,
}: MenuKeyDownOptions) {
  return useKeyboardMovement<HTMLDivElement>({
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Escape" || event.key === "Tab") {
        onRequestClose();

        // prevent parent key listeners as well.
        event.stopPropagation();
      }
    },
    incrementKeys: [horizontal ? "ArrowRight" : "ArrowDown"],
    decrementKeys: [horizontal ? "ArrowLeft" : "ArrowUp"],
  });
}
