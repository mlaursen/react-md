import { useCallback } from "react";

import extractTextContent from "../search/extractTextContent";
import findMatchIndex from "../search/findMatchIndex";
import useTempValue from "../useTempValue";
import useRefCache from "../useRefCache";

import getFocusableElements from "./getFocusableElements";

export interface ProgrammaticFocusChange {
  /**
   * The next element that should gain focus.
   */
  element: HTMLElement;

  /**
   * A list of all the focusable elements found within the container element.
   */
  focusables: HTMLElement[];

  /**
   * The current index of the `element` within the `focusables` list.
   */
  index: number;
}

export interface KeyboardSearchOptions<E extends HTMLElement> {
  /**
   * An optional onKeyDown handler to merge with the current search behavior.
   */
  onKeyDown?: React.KeyboardEventHandler<E>;

  /**
   * The amount of time to wait before the search results shoud be reset. This is really
   * a way to keep track of how long multiple letter combinations should be used.
   */
  resetTime?: number;

  /**
   * An optional function to get the string values for all the focusable elements
   * in the keydown container element. If this is omitted, it will just return the
   * `element.textContent` for each item while removing any font icons from the element
   * since the font icons interfere with the search.
   */
  getValues?: (focusableElements: HTMLElement[]) => string[];

  /**
   * The function to call when the focus should be changed due to the search behavior.
   * If this is manually provided, you'll need also manually trigger the focus events
   * yourself as the default implementation is:
   *
   * ```
   * const onFocusChange = ({ element }) => element.focus();
   * ```
   */
  onFocusChange?: (change: ProgrammaticFocusChange) => void;
}

/**
 * This hook creates a memoized onKeyDown event handler that you can provide to a component
 * so that all focusable elements can be search via typing when either the container element
 * is focused or any child element is focused within the container.
 */
export default function useKeyboardSearch<E extends HTMLElement = HTMLElement>({
  onKeyDown,
  getValues = els => els.map(el => extractTextContent(el)),
  resetTime = 500,
  onFocusChange = ({ element }) => element.focus(),
}: KeyboardSearchOptions<E>): React.KeyboardEventHandler<E> {
  const [value, setValue] = useTempValue("", resetTime);
  const cache = useRefCache({ onKeyDown, getValues, onFocusChange });

  return useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, getValues, onFocusChange } = cache.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { key } = event;
    if (key.length > 1 || !value || (!value.current && key === " ")) {
      // might need to change this later if other languages have
      // non-meta keys that are more than 1 letter
      return;
    }

    let nextValue = key;
    if (value.current !== key) {
      nextValue = `${value.current}${key}`;
    }
    setValue(nextValue);

    const focusables = getFocusableElements(event.currentTarget, true);
    const values = getValues(focusables);
    const currentIndex = focusables.findIndex(
      el => document.activeElement === el
    );
    const index = findMatchIndex(nextValue, values, currentIndex, true);
    const element = focusables[index];
    if (element) {
      onFocusChange({
        element,
        focusables,
        index,
      });
    }
    // disabled since useRefCache and the value is a ref and setValue will never update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
