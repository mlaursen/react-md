import { useCallback, useRef } from "react";

import useRefCache from "../useRefCache";
import getFocusableElements from "./getFocusableElements";

interface Options<E extends HTMLElement> {
  disabled?: boolean;
  disableFocusCache?: boolean;
  onKeyDown?: React.KeyboardEventHandler<E>;
}

/**
 * Creates an `onKeyDown` event handler to trap keyboard focus within a container
 * element.
 *
 * @param options All the options for handling tab focus wrapping.
 * @return The kedown event handler to enforce focus wrapping or the onKeyDown prop
 * if this functionality is disabled.
 */
export default function useTabFocusWrap<E extends HTMLElement>({
  disabled = false,
  disableFocusCache = false,
  onKeyDown,
}: Options<E>): React.KeyboardEventHandler<E> | undefined {
  const focusables = useRef<HTMLElement[]>([]);
  const cache = useRefCache({ disableFocusCache, onKeyDown });

  const handleKeyDown = useCallback<React.KeyboardEventHandler<E>>(
    (event): void => {
      const { onKeyDown, disableFocusCache } = cache.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key !== "Tab") {
        return;
      }

      if (disableFocusCache || !focusables.current.length) {
        focusables.current = getFocusableElements(event.currentTarget);
      }

      const elements = focusables.current;
      const l = elements.length;
      if (l === 0) {
        return;
      }

      if (l === 1) {
        event.preventDefault();
      } else if (elements[0] === event.target && event.shiftKey) {
        event.preventDefault();
        elements[l - 1].focus();
      } else if (elements[l - 1] === event.target && !event.shiftKey) {
        event.preventDefault();
        elements[0].focus();
      }
    },
    []
  );

  return disabled ? onKeyDown : handleKeyDown;
}
