const FOCUSABLE_ELEMENTS = ["BUTTON", "TEXTAREA", "SELECT"];
const FOCUSABLE_ROLES = ["button", "menuitem", "option"];

const BASE_FOCUSABLE_ELEMENTS = 'a[href],input:not([disabled]):not([type="hidden"])';
const BASE_FOCUSABLE_QUERY = FOCUSABLE_ELEMENTS.reduce(
  (queryString, element) => `${queryString},${element}:not([disabled])`,
  BASE_FOCUSABLE_ELEMENTS
);

/**
 * A query selector to find elements that are programatically focusable.
 *
 * Example:
 * const focusableElements = document.querySelectorAll(PROGRAMATICALLY_FOCUSABLE);
 * // do something with elements
 */
export const PROGRAMATICALLY_FOCUSABLE = `${BASE_FOCUSABLE_QUERY},[tabindex]`;

/**
 * A query selector to find elements that are focusable only with tab and shift+tab.
 *
 * Example:
 * const focusableElements = document.querySelectorAll(TAB_FOCUSABLE);
 * // do something with elements
 */
export const TAB_FOCUSABLE = `${PROGRAMATICALLY_FOCUSABLE}:not([tabindex="-1"])`;

/**
 * Checks if the provided element is focusable.
 */
export function isFocusable(el: HTMLElement | null, allowDisabled: boolean = false) {
  if (!el) {
    return false;
  }

  const disabled = el.getAttribute("disabled");
  if (disabled !== null && !allowDisabled) {
    return false;
  }

  if (FOCUSABLE_ELEMENTS.indexOf(el.tagName) !== -1) {
    return true;
  }

  return el.getAttribute("tabindex") !== null || FOCUSABLE_ROLES.indexOf(el.getAttribute("role") || "") !== -1;
}
