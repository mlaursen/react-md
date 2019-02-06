import { useRef, useEffect, useState } from "react";
import { Maybe, useEventListener } from "@react-md/utils";

import { TAB_FOCUSABLE } from "../constants";

export interface IFocusTrapOptions {
  container: Maybe<HTMLElement>;
  disabled?: boolean;
  disableFocusOnMount?: boolean;
}

export function useFocusTrap({
  container,
  disabled = false,
  disableFocusOnMount = false,
}: IFocusTrapOptions) {
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
  useEffect(() => {
    if (disabled || !container) {
      setFocusableElements([]);
      return;
    }

    const elements = Array.from(
      container.querySelectorAll(TAB_FOCUSABLE)
    ) as HTMLElement[];
    if (elements.length && !disableFocusOnMount) {
      elements[0].focus();
    }
    setFocusableElements(elements);
  }, [container, disabled]);

  function handleKeyDown(event: KeyboardEvent) {
    if (!container || event.key !== "Tab") {
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
    }

    if (nextIndex !== -1) {
      event.preventDefault();
      focusableElements[nextIndex].focus();
    }
  }

  useEventListener("keydown", handleKeyDown, {
    capture: true,
    enabled: !disabled,
    shouldUpdate: [container, focusableElements],
  });
}
