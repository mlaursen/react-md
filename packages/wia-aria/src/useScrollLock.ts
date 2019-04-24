import { useEffect } from "react";
import { DATA_RMD_NOSCROLL } from "./constants";

/**
 * This will enable scroll locking for the provided element. Scroll locking works
 * by fixing the element within the page and hiding overflow for that element.
 * Since fixing an element in the page might cause scroll shifting or other behavior,
 * the element is also updated with a negative `top` style immediately so scrolling
 * and page shifting not happen. This offset value is determined by either the
 * current `pageYOffset` if the element is the `<body>` tag, otherwise it will be
 * the * `scrollTop` of the element.
 *
 * Finally, if the element is the `<body>` tag, the `left` and `right` styles will
 * also be updated to be `0px`. This is extremely helpful for most margin based
 * layouts (text pages). Without the `left` and `right` values being set to 0,
 * the entire page might shift unexpectedly again if the `<body>` was not updated
 * to have `width: 100%`.
 *
 * @param element Either the `<body>` tag or an element within the page to disable
 * scroll for.
 */
export function enable(element: HTMLElement) {
  const isBody = document.body === element;
  const offset = isBody ? window.pageYOffset : element.scrollTop;

  if (isBody) {
    element.style.left = "0px";
    element.style.right = "0px";
  }

  element.style.top = `${-1 * offset}px`;
  element.style.overflow = "hidden";
  element.style.position = "fixed";
  element.setAttribute(DATA_RMD_NOSCROLL, "");
}

/**
 * Attempts to disable the scroll locking behavior for an element. If the element
 * does not have `data-rmd-noscroll`, it will not be modified. This is really just
 * a safety catch to ensure that pre-existing styles aren't removed on accident.
 *
 * If the `data-rmd-noscroll` attribute exists, the left, right, top, overflow, and
 * position styles will be wiped and the `data-rmd-noscroll` attribute will be removed.
 *
 * Finally, if the element was the `<body>`, the page will be scrolled back to its
 * original position before the fixed positions were applied.
 *
 * @param element Either the `<body>` tag or an element within the page to disable
 * scroll locking for.
 */
export function disable(element: HTMLElement) {
  if (element.getAttribute(DATA_RMD_NOSCROLL) === null) {
    return;
  }

  const scrollTop = Math.abs(parseInt(element.style.top || "", 10));
  element.style.left = "";
  element.style.right = "";
  element.style.top = "";
  element.style.overflow = "";
  element.style.position = "";
  element.removeAttribute(DATA_RMD_NOSCROLL);

  if (element === document.body) {
    window.scrollTo(0, scrollTop);
  } else {
    element.scrollTop = scrollTop;
  }
}

/**
 * A hook that is used to dynamically add scroll locking to an element. By default,
 * this will use the main `<body>` tag for scroll locking, but a query selector string
 * or an HTML element can also be used instead.
 *
 * @param enabled Boolean if the scroll locking behavior should be enabled
 * @param selectorOrElement Either a query selector string, HTMLElement, or a function
 * that returns an HTMLElement to apply scroll * locking to.
 */
export default function useScrollLock(
  enabled: boolean,
  selectorOrElement?: string | HTMLElement | (() => HTMLElement) | null
) {
  useEffect(() => {
    if (typeof document === "undefined") {
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

    if (!element || !enabled) {
      return;
    }

    enable(element);

    return () => {
      disable(element as HTMLElement);
    };
  }, [enabled, selectorOrElement]);
}
