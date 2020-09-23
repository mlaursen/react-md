import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";

interface Options<E extends HTMLElement> {
  /**
   * Boolean if the keyboard click handler should be disabled. This will make it
   * so the return value is just the provided `onKeyDown` handler or undefined
   * if it was omitted
   */
  disabled?: boolean;

  /**
   * Boolean if the element does not need the Enter key polyfilled. This should
   * normally be set to `true` for `<label>` elements.
   */
  disableEnterClick?: boolean;

  /**
   * Boolean if the user should not be able to click the element with the space
   * key. This should normally only be set to `true` for link elements.
   */
  disableSpacebarClick?: boolean;

  /**
   * An optional onKeyDown event handler that should be merged with the keyboard
   * click polyfill
   */
  onKeyDown?: React.KeyboardEventHandler<E>;
}

/**
 * This small utility function will create an onKeyDown handler that allows the
 * user to "click" an element with the keyboard via Enter or Space.
 */
export function useKeyboardClickPolyfill<E extends HTMLElement = HTMLElement>({
  onKeyDown,
  disabled = false,
  disableEnterClick = false,
  disableSpacebarClick = false,
}: Options<E> = {}): React.KeyboardEventHandler<E> | undefined {
  const ref = useRefCache({
    onKeyDown,
    disableSpacebarClick,
    disableEnterClick,
  });

  const handleKeyDown = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, disableSpacebarClick, disableEnterClick } = ref.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    const isSpace = event.key === " ";
    const isEnter = event.key === "Enter";
    const { currentTarget } = event;
    const { tagName } = currentTarget;
    if (
      (!isSpace && !isEnter) ||
      (isSpace && disableSpacebarClick) ||
      (isEnter && disableEnterClick) ||
      // buttons and textareas, and inputs shouldn't be polyfilled
      /BUTTON|TEXTAREA|INPUT/.test(tagName) ||
      // native links don't click on space
      (isSpace && tagName === "A")
    ) {
      return;
    }

    if (isSpace) {
      // prevent default behavior of page scrolling
      event.preventDefault();
    }

    // don't want parent keydown events to be triggered since this should now
    // be a "click" event instead.
    event.stopPropagation();
    event.currentTarget.click();
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return disabled ? onKeyDown : handleKeyDown;
}
