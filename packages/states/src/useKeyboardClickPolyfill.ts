import { useCallback } from "react";
import { useRefCache } from "@react-md/utils";

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
  const ref = useRefCache({ onKeyDown, disableSpacebarClick });

  const handleKeyDown = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, disableSpacebarClick } = ref.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    const isSpace = event.key === " ";
    const isEnter = event.key === "Enter";
    const { currentTarget } = event;
    const { tagName } = currentTarget;
    const type = currentTarget.getAttribute("type") || "";
    if (
      (!isSpace && !isEnter) ||
      (isSpace && disableSpacebarClick) ||
      // buttons and textareas shouldn't be polyfilled
      /BUTTON|TEXTAREA/.test(tagName) ||
      // checkboxes and radios submit forms on enter instead of clicking the element
      (isEnter && /checkbox|radio/i.test(type)) ||
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
  }, []);

  return disabled ? onKeyDown : handleKeyDown;
}
