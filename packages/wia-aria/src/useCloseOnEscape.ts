import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";

type KeyboardEventHandler = React.KeyboardEventHandler<HTMLDivElement>;

/**
 * This will conditionally close the dialog when the escape key is pressed.
 *
 * @param onRequestClose The function to call to close the dialog.
 * @param disabled Boolean if the escape key functionality should be
 * disabled
 * @param onKeyDown An optional keydown event handler to also call.
 * @return A keydown event handler
 */
export default function useCloseOnEscape(
  onRequestClose: () => void,
  disabled: boolean,
  onKeyDown?: KeyboardEventHandler
) {
  const cache = useRefCache({ onRequestClose, onKeyDown, disabled });
  return useCallback<KeyboardEventHandler>(event => {
    const { onKeyDown, onRequestClose, disabled } = cache.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (!disabled && event.key === "Escape") {
      onRequestClose();
    }
  }, []);
}
