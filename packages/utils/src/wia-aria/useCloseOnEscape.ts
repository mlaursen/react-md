import { useCallback } from "react";

import useRefCache from "../useRefCache";

type KeyboardEventHandler = React.KeyboardEventHandler<HTMLDivElement>;

/**
 * This will conditionally close the dialog when the escape key is pressed.
 *
 * @param onRequestClose The function to call to close the dialog.
 * @param disabled Boolean if the escape key functionality should be disabled
 * @param onKeyDown An optional keydown event handler to also call.
 * @return A keydown event handler
 */
export default function useCloseOnEscape(
  onRequestClose: () => void,
  disabled: boolean,
  onKeyDown?: KeyboardEventHandler
): KeyboardEventHandler | undefined {
  const cache = useRefCache({ onRequestClose, onKeyDown });
  const handleKeyDown = useCallback<KeyboardEventHandler>(event => {
    const { onKeyDown, onRequestClose } = cache.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.key === "Escape") {
      onRequestClose();
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return disabled ? onKeyDown : handleKeyDown;
}
