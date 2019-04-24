import getInstance, { RefOrInstance } from "./getInstance";
import { useEffect, useRef } from "react";
import { TAB_FOCUSABLE } from "./constants";

export default function useFocusableElementCache(refOrInstance: RefOrInstance) {
  const focusables = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const instance = getInstance(refOrInstance);
    if (!instance) {
      return;
    }

    const elements = Array.from(
      instance.querySelectorAll<HTMLElement>(TAB_FOCUSABLE)
    );

    if (!elements.length) {
      throw new Error("There are no focusable elements.");
    }

    focusables.current = elements;
  }, [refOrInstance]);

  return focusables;
}
