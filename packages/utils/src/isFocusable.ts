import { FOCUSABLE_ELEMENTS } from "./constants";

/**
 * Checks if the provided element is focusable by checking the different attributes and roles on
 * the element. The general rules for focusable elements are (items with an asterisk have additional
 * notes below):
 * - the element must exist
 * - the element must not be disabled*
 * - the element is one of button, textarea, or select
 * - the element is an achor or area tag with an href*
 * - the element is an input and not `type="hidden"`
 * - the element has a tabindex applied.
 *
 * Disabled elements can return `true` if the `allowDisabled` parameter is enabled. This is really only
 * useful for checking if an element _can_ be considered focusable instead of is currently able to be
 * focused.
 *
 * @param el - The element to check
 * @param allowDiabled - Boolean if disabled elements will return `true` instead of `false`.
 * @return true if the element is currently focusable OR true if the element is focusable once it
 * is no longer in a disabled state.
 */
export default function isFocusable(el: HTMLElement | null, allowDisabled: boolean = false) {
  if (!el || typeof el.getAttribute !== "function") {
    return false;
  }

  const disabled = el.getAttribute("disabled");
  if (disabled !== null && !allowDisabled) {
    return false;
  }

  const { tagName } = el;
  if (FOCUSABLE_ELEMENTS.includes(tagName)) {
    return true;
  } else if (/^A(REA)?$/.test(tagName)) {
    const href = !!(el as HTMLAnchorElement).href;
    return href || allowDisabled;
  } else if (tagName === "INPUT") {
    return (el as HTMLInputElement).type !== "hidden";
  } else if (allowDisabled && el.getAttribute("aria-disabled") === "true") {
    return true;
  }

  return el.getAttribute("tabindex") !== null;
}
