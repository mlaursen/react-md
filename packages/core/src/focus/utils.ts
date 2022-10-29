const queries = [
  'input:not([type="hidden"]):not([disabled])',
  "button:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "a[href]",
  "area[href]",
  "[tabindex]",
] as const;

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
export const PROGRAMMATICALLY_FOCUSABLE = queries.join(",");

/**
 * A query selector to find elements that are focusable only with tab and shift+tab.
 *
 * Example:
 *
 * ```ts
 * const focusableElements = document.querySelectorAll(TAB_FOCUSABLE);
 * // do something with elements
 * ```
 *
 * @remarks \@since 6.0.0 This was updated to remove ALL elements that have a
 * `tabindex="-1"` applied instead of only elements that had a manual tab index
 * applied.
 */
export const TAB_FOCUSABLE = queries.reduce((fullQuery, query) => {
  const prefix = `${fullQuery}${fullQuery ? "," : ""}`;
  const notProgrammaticQuery = `${query}:not([tabindex="-1"])`;

  return `${prefix}${notProgrammaticQuery}`;
}, "");

/**
 * A simple util that will find all the tab focusable elements within a
 * container element.  The container should normally be a specific HTMLElement,
 * but it can also be the entire document if you want to find **all** focusable
 * elements within your page.
 *
 * @remarks
 * \@since 6.0.0 This function will be used for all keyboard focus behavior
 * instead of trying to use refs. I did some performance testing in Firefox and
 * Chrome and the `querySelectorAll` takes 4ms with 5000 elements for my use
 * cases. There is more of a performance issue around rendering all 5000
 * elements and since this is only used for specific keydown events, this is
 * good enough for me.
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
  // spread operator is faster than Array.from
  return [
    ...container.querySelectorAll<HTMLElement>(
      programmatic ? PROGRAMMATICALLY_FOCUSABLE : TAB_FOCUSABLE
    ),
  ];
}

/**
 * Attempts to find the first focusable element within a container.
 *
 * @remarks \@since 6.0.0
 * @param container - The container element/document to find focusable elements
 * within.
 * @param programmatic - Boolean if programmatically focusable elements should be
 * included instead of only tab focusable.
 * @returns A list of HTMLElements that are focusable within the container.
 */
export function getFocusableElement(
  container: HTMLElement | Document,
  programmatic = false
): HTMLElement | null {
  return container.querySelector<HTMLElement>(
    programmatic ? PROGRAMMATICALLY_FOCUSABLE : TAB_FOCUSABLE
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
