import { useCallback, useContext, useEffect, useRef } from "react";
import { KeyboardFocusContext } from "../contexts";
import {
  KeyboardFocusKeys,
  KeyboardFocusedId,
  WithEventHandlers,
  WithKeyboardFocusCallback,
} from "../types.d";
import getCurrentFocusedIndex from "../utils/getCurrentFocusedIndex";
import getFocusableElements from "../utils/getFocusableElements";
import getKeyboardEventType from "../utils/getKeyboardEventType";
import loop from "../utils/loop";
import useMemoizedFocusKeys from "./useMemoizedFocusKeys";

/**
 * A simple hook to get the current keyboard focus context. You are most
 * likely looking for the `useKeyboardFocused` or `useKeyboardFocusedClassName`
 * hooks instead, but this can be used if you need to add custom keyboard-focus
 * ony behavior with the `setFocusedId` callback in the context.
 */
export function useKeyboardFocusContext() {
  return useContext(KeyboardFocusContext);
}

/**
 * Checks if the provided id is the current focused element and the app is
 * in keyboard mode.
 *
 * @param id The id to check agains
 * @return true if the app is in keyboard mode and the id is the current keyboard
 * focus
 */
export function useKeyboardFocused(id: KeyboardFocusedId) {
  const { focusedId, isKeyboardMode } = useKeyboardFocusContext();
  return isKeyboardMode && focusedId === id;
}

/**
 * This is a pretty nifty hook that will return a classname for an element
 * when it is the current keyboard focus in the app.
 *
 * @param id The id of the element
 * @param focusedClassName The class name to return when the element is focused.
 * This defaults to the base `@react-md/states` keyboard focus class name.
 * @return the focused class name or the empty stringstring | nule
 */
export function useKeyboardFocusedClassName(
  id: KeyboardFocusedId,
  focusedClassName: string = "rmd-states--focused"
) {
  return useKeyboardFocused(id) ? focusedClassName : "";
}

/**
 * All the options for a custom keyboard focus handler.
 */
export interface IKeyboardFocusOptions<
  E extends HTMLElement = HTMLElement,
  H = {}
>
  extends KeyboardFocusKeys,
    WithEventHandlers<E, H>,
    Required<WithKeyboardFocusCallback> {}

interface IKeyboardFocusResult<E extends HTMLElement = HTMLElement, H = {}> {
  handlers: H & {
    onKeyDown: (event: React.KeyboardEvent<E>) => void;
  };
}

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
export function useKeyboardFocusEventHandler<
  E extends HTMLElement = HTMLElement,
  H = {}
>({
  handlers,
  onKeyboardFocus,
  incrementKeys = ["ArrowDown"],
  decrementKeys = ["ArrowUp"],
  jumpToFirstKeys = ["Home"],
  jumpToLastKeys = ["End"],
}: IKeyboardFocusOptions<E, H>): IKeyboardFocusResult<E, H> {
  const keys = useMemoizedFocusKeys({
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  });
  const { onKeyDown } = handlers;

  // storing the event handlers in a ref so the callback doesn't need to be
  // updated each time an arrow function is used for the event listeners.
  const eventHandlersRef = useRef({ onKeyDown, onKeyboardFocus });
  useEffect(() => {
    eventHandlersRef.current.onKeyDown = onKeyDown;
    eventHandlersRef.current.onKeyboardFocus = onKeyboardFocus;
  }, [onKeyDown, onKeyboardFocus]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<E>) => {
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

  return {
    handlers: {
      ...handlers,
      onKeyDown: handleKeyDown,
    },
  };
}
