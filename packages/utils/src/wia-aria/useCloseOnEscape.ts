import { KeyboardEventHandler, useCallback } from "react";

/**
 * This will conditionally close the dialog when the escape key is pressed.
 *
 * @param onRequestClose - The function to call to close the dialog.
 * @param disabled - Boolean if the escape key functionality should be disabled
 * @param onKeyDown - An optional keydown event handler to also call.
 * @returns A keydown event handler
 */
export function useCloseOnEscape<E extends HTMLElement>(
  onRequestClose: () => void,
  disabled: boolean,
  onKeyDown?: KeyboardEventHandler<E>
): KeyboardEventHandler<E> | undefined {
  const handleKeyDown = useCallback<KeyboardEventHandler<E>>(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Escape") {
        onRequestClose();
      }
    },
    [onKeyDown, onRequestClose]
  );

  return disabled ? onKeyDown : handleKeyDown;
}
