export const FOCUSABLE_ELEMENTS = ["BUTTON", "TEXTAREA", "SELECT"];

const BASE_FOCUSABLE_ELEMENTS =
  'a[href],area[href],input:not([disabled]):not([type="hidden"])';
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
 * This is used with the `useScrollLock` effect to determine if the styles were
 * applied by scroll locking or not in the cleanup stage.
 */
export const DATA_RMD_NOSCROLL = "data-rmd-noscroll";

/**
 * I mispell this alot for some reason, so just using a constant to make sure
 * it's spelled correctly.
 */
export const ACTIVE_DESCENDANT = "aria-activedescendant";
