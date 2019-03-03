import { useCallback, useRef } from "react";
import { WithEventHandlers, WithKeyboardFocusCallback } from "../types.d";
import extractTextContent from "../utils/extractTextContent";
import defaultFindMatchIndex from "../utils/findMatchIndex";
import getCurrentFocusedIndex from "../utils/getCurrentFocusedIndex";
import getFocusableElements from "../utils/getFocusableElements";
import useValueReset from "./useValueReset";

export interface ISearchEffectOptions<
  E extends HTMLElement = HTMLElement,
  H = {}
> extends WithEventHandlers<E, H>, Required<WithKeyboardFocusCallback> {
  /**
   * An optional function to get the string values for all the focusable elements
   * in the keydown container element. If this is omitted, it will just return the
   * `element.textContent` for each item while removing any font icons from the element
   * since the font icons interfere with the search.
   */
  getValues?: (focusableElements: HTMLElement[]) => string[];

  /**
   * An optional reset time in milliseconds to apply for the search. When this is
   * omitted, it will default to 500ms.
   */
  searchResetTime?: number;

  /**
   * An optional function that is used to find the next match index. By default, this
   * will do a case-insensitive starts-with search.
   */
  findMatchIndex?: typeof defaultFindMatchIndex;

  /**
   * Boolean if the current item can be a valid search result. This is helpful if you'd
   * like to show that the same item keeps gaining foucs during a search. This is enabled
   * by default if omitted.
   */
  isSelfMatchable?: boolean;
}

/**
 * A hook used to create a `onKeyDown` event handler that will allow text matching/searching
 * within. This can be used with any of the other hooks/effects/event listeners provided from
 * this package or your own functionality to make extremely complex widgets.
 *
 * That said, this is normally used for the "menu" or "tree" roles.
 *
 * @param options All the options to create the search event handler.
 * @return a keydown event handler that should be provided to a React element
 */
export default function useSearchEventHandler<
  E extends HTMLElement = HTMLElement,
  H = {}
>({
  handlers,
  onKeyboardFocus,
  searchResetTime = 500,
  getValues = els => els.map(el => extractTextContent(el)),
  findMatchIndex = defaultFindMatchIndex,
  isSelfMatchable = true,
}: ISearchEffectOptions<E, H>) {
  const { valueRef, setValue } = useValueReset("", searchResetTime);

  // storing the event handlers in a ref so the callback doesn't need to be
  // updated each time an arrow function is used for the event listeners.
  const eventHandlersRef = useRef({
    onKeyDown: handlers.onKeyDown,
    onKeyboardFocus,
  });
  eventHandlersRef.current = { onKeyDown: handlers.onKeyDown, onKeyboardFocus };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, onKeyboardFocus } = eventHandlersRef.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { key } = event;
    if (key.length > 1 || !valueRef || (!valueRef.current && key === " ")) {
      // might need to change this later if other languages have
      // non-meta keys that are more than 1 letter
      return;
    }

    const nextValue = `${valueRef.current}${key}`;
    setValue(nextValue);
    const focusableElements = getFocusableElements(event.currentTarget);
    const values = getValues(focusableElements);
    const currentIndex = getCurrentFocusedIndex(
      event.currentTarget,
      focusableElements,
      event.target as HTMLElement
    );
    const index = findMatchIndex(
      nextValue,
      values,
      currentIndex,
      isSelfMatchable
    );
    if (index !== -1) {
      onKeyboardFocus(
        {
          element: focusableElements[index],
          elementIndex: index,
          focusableElements,
        },
        event
      );
    }
  }, []);

  return {
    handlers: {
      ...handlers,
      onKeyDown: handleKeyDown,
    },
  };
}
