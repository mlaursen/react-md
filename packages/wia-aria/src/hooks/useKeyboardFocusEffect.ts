import { useRef, useEffect, useState, useMemo } from "react";
import { Maybe, useEventListener } from "@react-md/utils";

import { TAB_FOCUSABLE, PROGRAMATICALLY_FOCUSABLE } from "../constants";

export type KeyboardFocusEvent = (
  element: HTMLElement,
  index: number,
  focusableElements: HTMLElement[]
) => void;

export interface IKeyboardFocusKeys {
  incrementKeys?: string[];
  decrementKeys?: string[];
  jumpToFirstKeys?: string[];
  jumpToLastKeys?: string[];
}

export interface IKeyboardFocusOptions extends IKeyboardFocusKeys {
  container: Maybe<HTMLElement>;
  disabled?: boolean;
  disableFocusOnMount?: boolean;
  onFocus?: KeyboardFocusEvent;
}

export type KeyboardFocusKeyType = "increment" | "decrement" | "first" | "last";

export interface IKeyboardFocusKeyEvent {
  shiftKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  key: string;
  type: KeyboardFocusKeyType;
}

/**
 * A small util function to transform a list of key codes into a list of
 * `IKeyboardFocusKeyEvent` objects. This is useful for how I determine what behavior
 * to implement after a keydown event.
 */
export function transformKeys(keys: string[], type: KeyboardFocusKeyType) {
  return keys.map<IKeyboardFocusKeyEvent>(key => ({
    shiftKey: key.includes("Shift+"),
    metaKey: key.includes("Meta+"),
    altKey: key.includes("Alt+"),
    key: key.replace(/(Shift|Meta|Alt)\+/g, ""),
    type,
  }));
}

/**
 * A small util get the the `KeyboardFocusKeyType` based on the provided keys
 * and keyboard event. This ensures that the key, altKey, metaKey, and shiftKey
 * values all match.
 *
 * If a key is not found, `null` will be returned instead.
 */
export function getEventType(
  event: KeyboardEvent,
  keys: IKeyboardFocusKeyEvent[]
) {
  const { key, altKey, metaKey, shiftKey } = event;
  const found = keys.find(
    k =>
      k.key === key &&
      k.altKey === altKey &&
      k.metaKey === metaKey &&
      k.shiftKey === shiftKey
  );

  return (found && found.type) || null;
}

/**
 * A small hook that creates a memoized list of focus keys based on the provided
 * list of key strings. The `incrementKeys` will be defaulted to `"Tab"` if omitted
 * and the `decrementKeys` will be defaulted to `"Shift+Tab"`.
 */
export function useMemoizedFocusKeys({
  incrementKeys = ["Tab"],
  decrementKeys = ["Shift+Tab"],
  jumpToFirstKeys = [],
  jumpToLastKeys = [],
}: IKeyboardFocusKeys) {
  return useMemo(
    () => [
      ...transformKeys(incrementKeys, "increment"),
      ...transformKeys(decrementKeys, "decrement"),
      ...transformKeys(jumpToFirstKeys, "first"),
      ...transformKeys(jumpToLastKeys, "last"),
    ],
    [incrementKeys, decrementKeys, jumpToFirstKeys, jumpToLastKeys]
  );
}

export function useFocusableElementsEffect(
  container: Maybe<HTMLElement>,
  disabled: boolean = false
) {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  useEffect(() => {
    if (disabled || !container) {
      setElements([]);
      return;
    }

    const elements = Array.from(
      container.querySelectorAll(PROGRAMATICALLY_FOCUSABLE)
    ) as HTMLElement[];

    setElements(elements);
  }, [container, disabled]);

  return elements;
}

export function useKeyboardFocusEffect({
  container,
  onFocus,
  disabled = false,
  disableFocusOnMount = false,
  incrementKeys = ["Tab"],
  decrementKeys = ["Shift+Tab"],
  jumpToFirstKeys = [],
  jumpToLastKeys = [],
}: IKeyboardFocusOptions) {
  const transformedKeys = useMemoizedFocusKeys({
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  });
  const focusableElements = useFocusableElementsEffect(container, disabled);

  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const type = getEventType(event, transformedKeys);
    if (!container || !type) {
      return;
    }

    const target = event.target as HTMLElement;
    const { shiftKey } = event;

    let nextIndex = -1;
    const lastIndex = Math.max(0, focusableElements.length - 1);
    if (!container.contains(target)) {
      nextIndex = shiftKey ? lastIndex : 0;
    } else if (target === focusableElements[lastIndex] && !shiftKey) {
      nextIndex = 0;
    } else if (target === focusableElements[0] && shiftKey) {
      nextIndex = lastIndex;
    } else if (key !== "Tab") {
      const id = target.getAttribute("aria-activedescendant");
      if (id) {
        const active = document.getElementById(id);
        nextIndex = focusableElements.findIndex(e => e === active);
      }

      if (nextIndex === -1) {
        return;
      }

      if (type === "increment") {
        nextIndex += 1;
        if (nextIndex > lastIndex) {
          nextIndex = 0;
        }
      } else {
        nextIndex -= 1;
        if (nextIndex < 0) {
          nextIndex = lastIndex;
        }
      }
    }

    if (nextIndex !== -1) {
      event.preventDefault();
      const el = focusableElements[nextIndex];
      if (onFocus) {
        onFocus(el, nextIndex, focusableElements);
      } else {
        focusableElements[nextIndex].focus();
      }
    }
  }

  useEventListener("keydown", handleKeyDown, {
    capture: true,
    enabled: !disabled,
    shouldUpdate: [container, focusableElements],
  });
}
