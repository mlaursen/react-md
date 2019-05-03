import { useEffect, useRef } from "react";

import getInstance, { RefOrInstance } from "./getInstance";
import getFocusableElements from "./getFocusableElements";

/**
 * This hook doesn't have much use and is probably overkill, but it is used to keep
 * a cache of the focusable elements within a containing element. It will only update
 * when the provided ref object or HTMLElement changes.
 *
 * @param refOrInstance The ref or instance to get an HTMLElement from
 * @return A MutableRefObject containing a list of the current focusable elements
 * within the ref or instance.
 */
export default function useFocusableElementsCache(
  refOrInstance: RefOrInstance
) {
  const focusables = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const instance = getInstance(refOrInstance);
    if (!instance) {
      return;
    }

    const elements = getFocusableElements(instance);
    if (elements.length === 0 && instance.getAttribute("tabindex") !== null) {
      elements.push(instance);
    }

    if (!elements.length) {
      throw new Error("There are no focusable elements");
    }

    focusables.current = elements;
  }, [refOrInstance]);

  return focusables;
}
