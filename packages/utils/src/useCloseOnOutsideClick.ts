import { useEffect, useRef, MutableRefObject } from "react";

/**
 * Checks if an element contains a target element by ensuring both HTMLElement
 * are not null.
 * @private
 */
export function contains(
  element: HTMLElement | null,
  target: HTMLElement | null
): boolean {
  return !!(element && target && element.contains(target));
}

/**
 * Gets the HTMLElement or null from a provided RefObject or HTMLElement/null
 * @private
 */
export function getElement<E extends HTMLElement>(
  element: MutableRefObject<E | null> | E | null
): E | null {
  if (!element) {
    return null;
  }

  if (typeof (element as MutableRefObject<E | null>).current !== "undefined") {
    return (element as MutableRefObject<E | null>).current;
  }

  return element as E | null;
}

type Contains = typeof contains;

/**
 * The on outside click handler that can be used to check for additional logic
 * before triggering some action. This will be provided:
 *
 * - the current element or null
 * - the current click target or null
 * - a nice "safe" contains function that handles nulls
 */
export type OnOutsideClick<E extends HTMLElement> = (
  element: E | null,
  target: HTMLElement | null,
  contains: Contains
) => void;

/**
 * @private
 */
export interface Options<E extends HTMLElement> {
  enabled: boolean;
  element: E | null | MutableRefObject<E | null>;
  onOutsideClick: OnOutsideClick<E>;
}

/**
 * Triggers a callback function when another element in the page is clicked that
 * is outside of the provided element. This is generally used for closing
 * temporary elements when something else within the page has been clicked.
 *
 * The callback will be provided the current `element` as well as the click
 * target if additional logic should be applied before closing.
 */
export default function useCloseOnOutsideClick<E extends HTMLElement>({
  enabled,
  element,
  onOutsideClick,
}: Options<E>): void {
  const handler = useRef(onOutsideClick);
  useEffect(() => {
    handler.current = onOutsideClick;
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleClick(event: MouseEvent): void {
      const target = event.target as HTMLElement | null;
      const el = getElement<E>(element);

      if (!contains(el, target)) {
        handler.current(el, target, contains);
      }
    }

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [enabled, element]);
}
