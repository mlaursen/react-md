import { useCallback, useRef, useEffect } from "react";
import { IKeyboardFocusKeys, IWithKeyboardFocusChange } from "../types.d";
import getCurrentFocusedIndex from "../utils/getCurrentFocusedIndex";
import getFocusableElements from "../utils/getFocusableElements";
import getKeyboardEventType from "../utils/getKeyboardEventType";
import loop from "../utils/loop";

import useMemoizedFocusKeys from "./useMemoizedFocusKeys";

/**
 * All the options for a custom keyboard focus handler.
 */
export interface IKeyboardFocusOptions
  extends IKeyboardFocusKeys,
    IWithKeyboardFocusChange {}

/**
 * Creates an `onKeyDown` event handler to apply to an element so that
 * keyboard focus behavior can be implemented.
 *
 * This is really a event handler function, but it uses the a hook to
 * memoize transforming the different keys so it is named like a hook.
 *
 * @param options All the keyboard focus event options
 * @return an keydown handler that can be used on any react element
 */
export default function useKeyboardFocusEventHandler({
  onKeyDown,
  onKeyboardFocus,
  incrementKeys = ["Tab"],
  decrementKeys = ["Shift+Tab"],
  jumpToFirstKeys = [],
  jumpToLastKeys = [],
}: IKeyboardFocusOptions) {
  const keys = useMemoizedFocusKeys({
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  });

  // storing the event handlers in a ref so the callback doesn't need to be
  // updated each time an arrow function is used for the event listeners.
  const eventHandlersRef = useRef({ onKeyDown, onKeyboardFocus });
  useEffect(() => {
    eventHandlersRef.current.onKeyDown = onKeyDown;
    eventHandlersRef.current.onKeyboardFocus = onKeyboardFocus;
  }, [onKeyDown, onKeyboardFocus]);

  return useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const { onKeyDown, onKeyboardFocus } = eventHandlersRef.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      const target = event.target as HTMLElement;
      const container = event.currentTarget;
      const type = getKeyboardEventType(event, keys);
      if (!container || !type || !target) {
        return;
      }

      // implementing custom behavior, so need to stop native behavior
      event.preventDefault();
      const focusableElements = getFocusableElements(container);
      const handleFocus = (i: number) => {
        onKeyboardFocus(
          {
            element: focusableElements[i],
            elementIndex: i,
            focusableElements,
          },
          event
        );
      };

      const lastIndex = Math.max(0, focusableElements.length - 1);
      if (type === "first") {
        handleFocus(0);
        return;
      } else if (type === "last") {
        handleFocus(lastIndex);
        return;
      }

      const currentIndex = getCurrentFocusedIndex(
        container,
        focusableElements,
        target
      );

      if (currentIndex !== -1) {
        handleFocus(loop(currentIndex, lastIndex, type === "increment"));
      }
    },
    [keys]
  );
}
