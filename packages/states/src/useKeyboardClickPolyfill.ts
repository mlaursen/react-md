import { useRef, useEffect, useCallback } from "react";

/**
 * This small utility function will create an onKeyDown handler that
 * allows the user to "click" an element with the keyboard via Enter
 * or Space.
 *
 * @param onKeyDown - An optional onKeyDown event handler that should
 * be merged with the keyboard click polyfill.
 * @param disabled - Boolean if the keyboard click handler should be
 * disabled. This will make it so the return value is just the provided
 * `onKeyDown` handler or undefined if it was omitted.
 * @param disableSpacebarClick - Boolean if the user should not be able
 * to click the element with the space key. This should normally only
 * be set to `true` for link elements.
 */
export default function useKeyboardClickPolyfill<
  E extends HTMLElement = HTMLElement
>(
  onKeyDown?: React.KeyboardEventHandler<E>,
  disabled: boolean = false,
  disableSpacebarClick = false
) {
  const ref = useRef(onKeyDown);
  useEffect(() => {
    ref.current = onKeyDown;
  });

  const handleKeyDown = useCallback((event: React.KeyboardEvent<E>) => {
    const onKeyDown = ref.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { currentTarget } = event;
    const { tagName } = currentTarget;
    const isEnter = event.key === "Enter";
    const isSpace =
      !disableSpacebarClick && tagName !== "A" && event.key === " ";
    if ((!isSpace && !isEnter) || tagName === "BUTTON") {
      return;
    }

    if (isSpace) {
      // prevent page from scrolling
      event.preventDefault();
    }

    currentTarget.click();
  }, []);

  return disabled ? onKeyDown : handleKeyDown;
}
