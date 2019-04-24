import { MutableRefObject } from "react";

import getFocusableElements from "./getFocusableElements";

/**
 * This should be used in a keydown event handler to manually update
 * the tab behavior so that the focus is contained within the event's
 * current target (container element).
 *
 * @param event The keydown event
 * @param focusables A ref list of focusable elements within the container
 * element. The only elements within this list are the first and last
 * elements as they will be used to manually wrap the focus behavior.
 * @param disableFocusCache Boolean if the focusables ref should be updated
 * with each keydown event. This will actually modify the provided focusables
 * ref with the new focusable elements if this is set to `true`.
 * @return False if the focus wrap behavior was not used and True if it was.
 * This is useful for preventing additional keydown handler logic if needed.
 */
export default function handleFocusWrap(
  event: React.KeyboardEvent<HTMLElement>,
  focusables: MutableRefObject<HTMLElement[]>,
  disableFocusCache: boolean = false
) {
  if (event.key !== "Tab" || !event.target) {
    return false;
  }

  if (disableFocusCache) {
    focusables.current = getFocusableElements(event.currentTarget);
  }

  const elements = focusables.current;
  const l = elements.length;
  if (l === 1) {
    event.preventDefault();
  } else if (elements[0] === event.target && event.shiftKey) {
    event.preventDefault();
    elements[l - 1].focus();
  } else if (elements[l - 1] === event.target && !event.shiftKey) {
    event.preventDefault();
    elements[0].focus();
  }

  return true;
}
