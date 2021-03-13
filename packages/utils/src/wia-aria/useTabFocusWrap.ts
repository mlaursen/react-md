import { useCallback, useRef } from "react";

import { getFocusableElements } from "./getFocusableElements";

interface Options<E extends HTMLElement> {
  /**
   * Boolean if the focus wrap behavior should be disabled.
   */
  disabled?: boolean;

  /**
   * Boolean if the list of focusable elements should not be cached after the
   * first tab key press. This should only be set to `true` if you have a lot of
   * dynamic content whin your element and the first and last elements change.
   */
  disableFocusCache?: boolean;

  /**
   * An optional keydown event handler to merge with the focus wrap behavior.
   */
  onKeyDown?: React.KeyboardEventHandler<E>;
}

/**
 * Creates an `onKeyDown` event handler to trap keyboard focus within a
 * container element.
 *
 * @typeParam E - The HTMLElement type that has the keydown event listener
 * attached.
 * @param options - All the options for handling tab focus wrapping.
 * @returns The kedown event handler to enforce focus wrapping or the onKeyDown
 * prop if this functionality is disabled.
 */
export function useTabFocusWrap<E extends HTMLElement>({
  disabled = false,
  disableFocusCache = false,
  onKeyDown,
}: Options<E>): React.KeyboardEventHandler<E> | undefined {
  const focusables = useRef<HTMLElement[]>([]);

  const handleKeyDown = useCallback<React.KeyboardEventHandler<E>>(
    (event): void => {
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
        elements[0].focus();
      } else if (elements[0] === event.target && event.shiftKey) {
        event.preventDefault();
        elements[l - 1].focus();
      } else if (elements[l - 1] === event.target && !event.shiftKey) {
        event.preventDefault();
        elements[0].focus();
      }
    },
    [onKeyDown, disableFocusCache]
  );

  return disabled ? onKeyDown : handleKeyDown;
}
