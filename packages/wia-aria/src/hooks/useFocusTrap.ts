import { useRef, useEffect, useState } from "react";
import { Maybe, useEventListener } from "@react-md/utils";

import { TAB_FOCUSABLE, PROGRAMATICALLY_FOCUSABLE } from "../constants";

export type FocusTrapFocusEvent = (
  element: HTMLElement,
  index: number,
  focusableElements: HTMLElement[]
) => void;
export interface IFocusTrapOptions {
  container: Maybe<HTMLElement>;
  disabled?: boolean;
  disableFocusOnMount?: boolean;
  onFocus?: FocusTrapFocusEvent;
  incrementKeys?: string[];
  decrementKeys?: string[];
}

interface IFocusKeyEvent {
  shiftKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  key: string;
  increment: boolean;
}

function transformKeys(keys: string[], increment: boolean) {
  return keys.map<IFocusKeyEvent>(key => ({
    shiftKey: key.includes("Shift+"),
    metaKey: key.includes("Meta+"),
    altKey: key.includes("Alt+"),
    key: key.replace(/(Shift|Meta|Alt)\+/g, ""),
    increment,
  }));
}

function getEventType(event: KeyboardEvent, keys: IFocusKeyEvent[]) {
  const { key, metaKey, shiftKey, altKey } = event;
  const found = keys.find(
    k =>
      k.key === key &&
      k.metaKey === metaKey &&
      k.shiftKey === k.shiftKey &&
      k.altKey === altKey
  );
  if (!found) {
    return null;
  } else if (found.increment) {
    return "increment";
  }

  return "decrement";
}

export function useFocusTrap({
  container,
  onFocus,
  disabled = false,
  disableFocusOnMount = false,
  incrementKeys = ["Tab"],
  decrementKeys = ["Shift+Tab"],
}: IFocusTrapOptions) {
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
  useEffect(() => {
    if (disabled || !container) {
      setFocusableElements([]);
      return;
    }

    const elements = Array.from(
      container.querySelectorAll(PROGRAMATICALLY_FOCUSABLE)
    ) as HTMLElement[];
    if (!disableFocusOnMount) {
      if (container.tabIndex === -1) {
        container.focus();
      } else if (elements.length) {
        elements[0].focus();
      }
    }

    setFocusableElements(elements);
  }, [container, disabled]);

  const transformedKeys = useRef<IFocusKeyEvent[]>([]);
  useEffect(() => {
    transformedKeys.current = [
      ...transformKeys(incrementKeys, true),
      ...transformKeys(decrementKeys, false),
    ];
  }, [incrementKeys, decrementKeys]);

  function handleKeyDown(event: KeyboardEvent) {
    const keys = transformedKeys.current;
    const { key } = event;
    const type = getEventType(event, keys);
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
