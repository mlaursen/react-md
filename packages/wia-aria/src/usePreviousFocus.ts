import { useRef, useEffect, useMemo } from "react";

/**
 * This can either be a query selector string, a specific HTMLElement, or a function
 * that finds a specific HTMLElement to focus.
 */
export type FocusFallback =
  | string
  | HTMLElement
  | (() => HTMLElement | null)
  | null
  | undefined;

/**
 * This hook is used to focus the previous element when a component unmounts. The
 * default behavior is to store the current activeElement within the document when
 * the component mounts and then try to focus it again when the component unmounts.
 * You can also provide your own HTMLElement to focus when unmounting.
 *
 * During the unmount phase, it will wait for an animation frame before checking if
 * the fallback element still exists within the page. If it doesn't, it will use the
 * fallback query/element/function to attempt to find another element to focus. If
 * the element exists within the page, it will then finally be focused.
 *
 * The animation frame is unfortunately required for keyboard users as pressing enter
 * key will click the previous element immediately on focus as well.
 *
 * @param disabled Boolean if the focus behavior should be disabled.
 * @param fallback The fallback query, element, or function to use if the previous
 * element no longer exists in the DOM.
 * @param previousElement An optional previous element to focus. If this is omitted,
 * the `document.activeElement` will be used instead.
 */
export default function usePreviousFocus(
  disabled: boolean,
  fallback: FocusFallback = undefined,
  previousElement: HTMLElement | null = null
) {
  // this is a bit overkill, but want to be able to set the defaultValue
  // on mount before a window paint and needs to support ssr
  const defaultValue = useMemo(() => {
    if (previousElement || typeof document === "undefined") {
      return previousElement;
    }

    return document.activeElement as HTMLElement;
  }, []);
  const previousFocus = useRef<HTMLElement | null>(defaultValue);

  useEffect(() => {
    if (disabled) {
      return;
    }

    return () => {
      window.requestAnimationFrame(() => {
        let el = previousFocus.current;
        if (!el || !document.contains(el)) {
          switch (typeof fallback) {
            case "string":
              el = document.querySelector<HTMLElement>(fallback);
              break;
            case "function":
              el = fallback();
              break;
            case "undefined":
              return;
            default:
              el = fallback;
          }
        }

        if (el && !document.contains(el)) {
          el = null;
        }

        if (el) {
          el.focus();
        }
      });
    };
  }, []);
}
