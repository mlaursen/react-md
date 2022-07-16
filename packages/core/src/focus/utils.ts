export const FOCUSABLE_ELEMENTS = ["BUTTON", "TEXTAREA", "SELECT"];

const BASE_FOCUSABLE_ELEMENTS =
  'a[href],area[href],input:not([disabled]):not([type="hidden"])';
const BASE_FOCUSABLE_QUERY = FOCUSABLE_ELEMENTS.reduce(
  (queryString, element) => `${queryString},${element}:not([disabled])`,
  BASE_FOCUSABLE_ELEMENTS
);

/**
 * A query selector to find elements that are programmatically focusable.
 *
 * Example:
 *
 * ```ts
 * const focusableElements = document.querySelectorAll(PROGRAMMATICALLY_FOCUSABLE);
 * // do something with elements
 * ```
 */
export const PROGRAMMATICALLY_FOCUSABLE = `${BASE_FOCUSABLE_QUERY},[tabindex]`;

/**
 * A query selector to find elements that are focusable only with tab and shift+tab.
 *
 * Example:
 *
 * ```ts
 * const focusableElements = document.querySelectorAll(TAB_FOCUSABLE);
 * // do something with elements
 * ```
 */
export const TAB_FOCUSABLE = `${PROGRAMMATICALLY_FOCUSABLE}:not([tabindex="-1"])`;

/**
 * A simple util that will find all the tab focusable elements within a
 * container element.  The container should normally be a specific HTMLElement,
 * but it can also be the entire document if you want to find **all** focusable
 * elements within your page.
 *
 * @param container - The container element/document to find focusable elements
 * within.
 * @param programmatic - Boolean if programmatically focusable elements should be
 * included instead of only tab focusable.
 * @returns A list of HTMLElements that are focusable within the container.
 */
export function getFocusableElements(
  container: HTMLElement | Document,
  programmatic = false
): readonly HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      programmatic ? PROGRAMMATICALLY_FOCUSABLE : TAB_FOCUSABLE
    )
  );
}

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

export function isFocusable(
  element: HTMLElement | Document | Window,
  type: ElementFocusType = "programmatic"
): element is HTMLElement {
  const selector = type === "tab" ? TAB_FOCUSABLE : PROGRAMMATICALLY_FOCUSABLE;

  return "matches" in element && element.matches(selector);
}

export type FocusElementWithinType =
  | "first"
  | "last"
  | "query"
  | "self"
  | "none";

export interface FocusElementWithinOptions {
  type: FocusElementWithinType;
  query?: string;
  elements: readonly HTMLElement[];
  container: HTMLElement | Document;
}

export function focusElementWithin(options: FocusElementWithinOptions): void {
  const { type, query = "", container, elements } = options;
  if (type === "none") {
    return;
  }

  let element: HTMLElement | null = null;
  if (type === "first") {
    [element] = elements;
  } else if (type === "last") {
    element = elements[elements.length - 1];
  } else if (type === "query") {
    element = document.querySelector<HTMLElement>(query);
  }

  if (!element && isFocusable(container)) {
    element = container;
  }

  // TODO: Why did I add preventScroll?
  element?.focus();
}
