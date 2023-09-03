import type { KeyboardEvent } from "react";
import { loop } from "../utils/loop.js";
import type { FocusableIndexOptions, TabIndexBehavior } from "./types.js";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const isElementDisabled = (element: HTMLElement): boolean =>
  element.getAttribute("disabled") !== null ||
  element.getAttribute("aria-disabled") === "true";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const isNotFocusable = (
  element: HTMLElement | undefined,
  includeDisabled: boolean
): boolean => {
  if (!element) {
    return true;
  }

  if (includeDisabled) {
    return false;
  }

  return isElementDisabled(element);
};

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface VirtualFocusableIndexOptions {
  focusables: readonly HTMLElement[];
  includeDisabled: boolean;
  activeDescendantId: string;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const getVirtualFocusDefaultIndex = (
  options: VirtualFocusableIndexOptions
): number => {
  const { focusables, includeDisabled, activeDescendantId } = options;
  if (!focusables.length || (!activeDescendantId && includeDisabled)) {
    return 0;
  }

  const activeIndex = focusables.findIndex((element) => {
    if (activeDescendantId) {
      return element.id === activeDescendantId;
    }

    return !isElementDisabled(element);
  });
  return Math.max(0, activeIndex);
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getFirstFocusableIndex = (
  options: FocusableIndexOptions
): number => {
  const { focusables, includeDisabled } = options;

  if (!focusables.length) {
    return -1;
  }

  let firstIndex = 0;
  while (
    firstIndex < focusables.length - 1 &&
    isNotFocusable(focusables[firstIndex], includeDisabled)
  ) {
    firstIndex += 1;
  }

  if (isNotFocusable(focusables[firstIndex], includeDisabled)) {
    return -1;
  }

  return firstIndex;
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getLastFocusableIndex = (
  options: FocusableIndexOptions
): number => {
  const { focusables, includeDisabled } = options;

  if (!focusables.length) {
    return -1;
  }

  let lastIndex = focusables.length - 1;
  while (
    lastIndex > 0 &&
    isNotFocusable(focusables[lastIndex], includeDisabled)
  ) {
    lastIndex -= 1;
  }

  if (isNotFocusable(focusables[lastIndex], includeDisabled)) {
    return -1;
  }

  return lastIndex;
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
interface NextFocusableIndexOptions extends FocusableIndexOptions {
  loopable: boolean;
  increment: boolean;
  currentFocusIndex: number;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getNextFocusableIndex = (
  options: NextFocusableIndexOptions
): number => {
  const {
    loopable,
    increment,
    focusables,
    includeDisabled,
    currentFocusIndex,
  } = options;
  if (!focusables.length) {
    return currentFocusIndex;
  }

  const min = getFirstFocusableIndex({ focusables, includeDisabled });
  const max = getLastFocusableIndex({ focusables, includeDisabled });
  let nextIndex = loop({
    min,
    max,
    value: currentFocusIndex,
    minmax: !loopable,
    increment,
  });
  while (
    isNotFocusable(focusables[nextIndex], includeDisabled) &&
    (loopable || nextIndex !== (increment ? max : min))
  ) {
    nextIndex = loop({
      min,
      max,
      value: nextIndex,
      minmax: !loopable,
      increment,
    });
  }

  // Since the `min` and `max` values are "safely" set, I don't need to verify
  // the nextIndex is still focusable
  return nextIndex;
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export function getSearchText(
  element: HTMLElement,
  searchable: boolean
): string {
  if (!searchable) {
    return "";
  }

  const cloned = element.cloneNode(true) as HTMLElement;
  cloned
    .querySelectorAll(
      // Note: do not include DISPLAY_NONE_CLASS since it is presentational only
      ".rmd-icon--font,[aria-hidden=true],[hidden],[role=presentation]"
    )
    .forEach((element) => {
      element.parentNode?.removeChild(element);
    });

  // Note: It would be good to use `cloned.innerText` (maybe?) at some point,
  // but it returns `undefined` in jsdom. It also does cause a reflow, so maybe
  // this is fine?
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  return (cloned.textContent || "")[0].toUpperCase();
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface RecalculateOptions {
  focusables: readonly HTMLElement[];
  includeDisabled: boolean;
  tabIndexBehavior: TabIndexBehavior | undefined;
  activeDescendantId: string;
}

/**
 * This was added to help with specific widgets that cause focus index to change
 * between renders (i.e. expanding all tree items on the same level with `*`).
 * There might be a better way to handle this in the future.
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function recalculateFocusIndex(options: RecalculateOptions): number {
  const { focusables, includeDisabled, tabIndexBehavior, activeDescendantId } =
    options;
  if (tabIndexBehavior === "virtual") {
    return getVirtualFocusDefaultIndex({
      focusables,
      includeDisabled,
      activeDescendantId,
    });
  }

  const { activeElement } = document;
  return focusables.findIndex((element) => element === activeElement);
}

/**
 * Checks if a keyboard event can trigger a search through focusable elements
 * by:
 *
 * - checking if the key is a single letter that is not the space key
 * - checking that the alt, ctrl, and meta keys are not being held
 *
 * The shift key **is allowed** because holding shift means "search from the
 * beginning" instead of "search from current location".
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function isSearchableEvent(event: KeyboardEvent): boolean {
  const { key, altKey, ctrlKey, metaKey } = event;

  return (
    key.length === 1 &&
    // can't search with space since it is generally a click event
    key !== " " &&
    !altKey &&
    !ctrlKey &&
    !metaKey
  );
}
