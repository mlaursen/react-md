import { PROGRAMATICALLY_FOCUSABLE, TAB_FOCUSABLE } from "./constants";

/**
 * An element can be tab focused if it is:
 * - an anchor or area with an `href`
 * - a non-disabled `input` element that is not `type="hidden"`
 * - a non-disabled `button`, `textarea`, or `select` element
 * - an element with a `tabIndex >= 0`
 *
 * An element can be noted as "programmatically focusable only"  has the above
 * rules, but the `tabIndex` will be set to `-1`.
 *
 * @remarks \@since 2.8.0
 */
export type ElementFocusType = "tab" | "programmatic";

/**
 * Checks if an element is focusable.
 *
 * @see {@link ElementFocusType}
 * @remarks \@since 2.8.0
 * @param element - The element to check
 * @param type - The focus type to compare against
 * @returns true if the element is focusable
 */
export function isFocusable(
  element: HTMLElement | Document | Window,
  type: ElementFocusType = "programmatic"
): element is HTMLElement {
  return (
    "matches" in element &&
    element.matches(
      type === "programmatic" ? PROGRAMATICALLY_FOCUSABLE : TAB_FOCUSABLE
    )
  );
}
