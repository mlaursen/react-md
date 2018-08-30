import { FOCUSABLE_ELEMENTS } from "./constants";

const FOCUSABLE_ROLES = ["button", "menuitem", "option"];

/**
 * Checks if the provided element is focusable.
 */
export default function isFocusable(el: HTMLElement | null, allowDisabled: boolean = false) {
  if (!el || typeof el.getAttribute !== "function") {
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
