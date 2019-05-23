import React, { useCallback } from "react";
import { Omit } from "@react-md/utils";
import { useMemoizedFocusKeys, getKeyboardEventType } from "./useFocusKeys";
import getFocusableElements from "./getFocusableElements";
import useKeyboardSearch, { KeyboardSearchOptions } from "./useKeyboardSearch";

/**
 * A small util that is used to increment or decrement a number until
 * it reaches the max value or -1. When that happens, it will loop around
 * to 0 or the max value respectively. This does not work for different
 * increment numbers or any values below 0 for now.
 *
 * @param x The number to increment or decrement
 * @param max The max number that can be set
 * @param increment Boolean if it should be incremented or decremented
 * @private
 */
export function loop(x: number, max: number, increment: boolean) {
  let next = x + (increment ? 1 : -1);
  if (next > max) {
    next = 0;
  } else if (next < 0) {
    next = max;
  }

  return next;
}

/**
 * This interface is used to show how keyboard focus can be achieved with different
 * key presses. When any of the values are omitted, an empty list will be used instead.
 */
export interface KeyboardFocusKeys {
  incrementKeys?: string[];
  decrementKeys?: string[];
  jumpToFirstKeys?: string[];
  jumpToLastKeys?: string[];
}

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
}: KeyboardMovementOptions<E>) {
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
  const onKeyDown = search ? searchKeyDown : propOnKeyDown;

  return useCallback(
    (event: React.KeyboardEvent<E>) => {
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
    },
    [onKeyDown]
  );
}
