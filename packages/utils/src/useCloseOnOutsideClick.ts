import { MutableRefObject, useEffect } from "react";

import { containsElement } from "./containsElement";

/**
 * Gets the HTMLElement or null from a provided RefObject or HTMLElement/null
 * @internal
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

type Contains = typeof containsElement;

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
 * @typeParam E - The HTMLElement type of the container element that should not
 * trigger the close behavior if an element inside is clicked.
 */
export interface CloseOnOutsideClickOptions<E extends HTMLElement> {
  /**
   * Boolean if the behavior is enabled.
   */
  enabled: boolean;

  /**
   * The element that should not trigger the onOutsideClick callback when it or
   * a child has been clicked.
   */
  element: E | null | MutableRefObject<E | null>;

  /**
   * A callback function when an element outside has been clicked. This is
   * normally something that closes temporary elements.
   */
  onOutsideClick: OnOutsideClick<E>;
}

/**
 * Triggers a callback function when another element in the page is clicked that
 * is outside of the provided element. This is generally used for closing
 * temporary elements when something else within the page has been clicked.
 *
 * The callback will be provided the current `element` as well as the click
 * target if additional logic should be applied before closing.
 *
 * @typeParam E - The type of element
 */
export function useCloseOnOutsideClick<E extends HTMLElement>({
  enabled,
  element,
  onOutsideClick,
}: CloseOnOutsideClickOptions<E>): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleClick(event: MouseEvent): void {
      const target = event.target as HTMLElement | null;
      const el = getElement<E>(element);

      if (!containsElement(el, target)) {
        onOutsideClick(el, target, containsElement);
      }
    }

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [enabled, element, onOutsideClick]);
}
