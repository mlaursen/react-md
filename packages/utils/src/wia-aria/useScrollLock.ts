import { useEffect } from "react";

/**
 * This is used with the `useScrollLock` effect to determine if the styles were
 * applied by scroll locking or not in the cleanup stage.
 */
export const DATA_RMD_NOSCROLL = "data-rmd-noscroll";

/**
 * This will enable scroll locking for the provided element. Scroll locking
 * works by fixing the element within the page and hiding overflow for that
 * element.
 *
 * @param element - Either the `<body>` tag or an element within the page to
 * disable scroll for.
 * @internal
 */
export function enable(element: HTMLElement): void {
  element.style.overflow = "hidden";
  element.setAttribute(DATA_RMD_NOSCROLL, "");
}

/**
 * Attempts to disable the scroll locking behavior for an element. If the
 * element does not have `data-rmd-noscroll`, it will not be modified. This is
 * really just a safety catch to ensure that pre-existing styles aren't removed
 * on accident.
 *
 * If the `data-rmd-noscroll` attribute exists, overflow style and the
 * `data-rmd-noscroll` attribute will be removed.
 *
 * @param element - Either the `<body>` tag or an element within the page to
 * disable scroll locking for.
 * @internal
 */
export function disable(element: HTMLElement): void {
  if (element.getAttribute(DATA_RMD_NOSCROLL) === null) {
    return;
  }

  element.style.overflow = "";
  element.removeAttribute(DATA_RMD_NOSCROLL);
}

/**
 * A hook that is used to dynamically add scroll locking to an element. By
 * default, this will use the main `<body>` tag for scroll locking, but a query
 * selector string or an HTML element can also be used instead.
 *
 * @param enabled - Boolean if the scroll locking behavior should be enabled
 * @param selectorOrElement - Either a query selector string, HTMLElement, or a
 * function that returns an HTMLElement to apply scroll locking to.
 */
export function useScrollLock(
  enabled: boolean,
  selectorOrElement?: string | HTMLElement | (() => HTMLElement) | null
): void {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") {
      return;
    }

    let element: HTMLElement | null = null;
    if (typeof selectorOrElement === "string") {
      element = document.querySelector<HTMLElement>(selectorOrElement);
    } else if (typeof selectorOrElement === "function") {
      element = selectorOrElement();
    } else if (selectorOrElement) {
      element = selectorOrElement;
    } else {
      element = document.body;
    }

    if (!element || element.getAttribute(DATA_RMD_NOSCROLL) !== null) {
      return;
    }

    enable(element);
    return () => {
      disable(element as HTMLElement);
    };
  }, [enabled, selectorOrElement]);
}
