import React, { useCallback } from "react";

import loop from "../loop";
import { Omit } from "../omit";
import useRefCache from "../useRefCache";

import getFocusableElements from "./getFocusableElements";
import {
  getKeyboardEventType,
  KeyboardFocusKeys,
  useMemoizedFocusKeys,
} from "./useFocusKeys";
import useKeyboardSearch, { KeyboardSearchOptions } from "./useKeyboardSearch";

export type KeyboardFocusKeyType =
  | "increment"
  | "decrement"
  | "first"
  | "last"
  | "custom";

export interface KeyboardMovementOptions<E extends HTMLElement>
  extends KeyboardFocusKeys,
    Pick<KeyboardSearchOptions<E>, "onKeyDown" | "onFocusChange"> {
  search?:
    | boolean
    | Omit<KeyboardSearchOptions<E>, "onFocusChange" | "onKeyDown">;
}

/**
 * This hook is used to handle general keyboard movement for widgets that handle "focus" or selection
 * change with things other than tab.
 */
export default function useKeyboardMovement<
  E extends HTMLElement = HTMLElement
>({
  onKeyDown: propOnKeyDown,
  onFocusChange = ({ element }) => element.focus(),
  incrementKeys = ["ArrowDown"],
  decrementKeys = ["ArrowUp"],
  jumpToFirstKeys = ["Home"],
  jumpToLastKeys = ["End"],
  search = true,
}: KeyboardMovementOptions<E>): React.KeyboardEventHandler<E> {
  const keys = useMemoizedFocusKeys({
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  });

  const searchKeyDown = useKeyboardSearch({
    onKeyDown: propOnKeyDown,
    onFocusChange,
    ...(typeof search !== "boolean" ? search : undefined),
  });
  const cache = useRefCache({
    keys,
    onFocusChange,
    onKeyDown: search ? searchKeyDown : propOnKeyDown,
  });

  return useCallback((event: React.KeyboardEvent<E>) => {
    const { keys, onKeyDown, onFocusChange } = cache.current;
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
    const focusables = getFocusableElements(container, true);
    const lastIndex = Math.max(0, focusables.length - 1);
    let index = 0;
    if (type === "first") {
      index = 0;
    } else if (type === "last") {
      index = lastIndex;
    } else {
      const currentIndex = focusables.findIndex(
        el => el === document.activeElement
      );
      index = loop(currentIndex, lastIndex, type === "increment");
    }

    const element = focusables[index];
    if (element) {
      onFocusChange({
        element,
        focusables,
        index,
      });
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
