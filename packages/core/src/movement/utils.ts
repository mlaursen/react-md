import { loop } from "../loop";
import type {
  FocusableIndexOptions,
  VirtualFocusableIndexOptions,
} from "./types";

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

  return (
    element.getAttribute("disabled") !== null ||
    element.getAttribute("aria-disabled") === "true"
  );
};

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const getVirtualFocusDefaultIndex = (
  options: VirtualFocusableIndexOptions
): number => {
  const { focusables, activeDescendantId } = options;
  if (!activeDescendantId || !focusables.length) {
    return 0;
  }

  const activeIndex = focusables.findIndex(
    (element) => element.id === activeDescendantId
  );
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
    .querySelectorAll(".rmd-icon--font,[aria-hidden=true],[hidden]")
    .forEach((element) => {
      element.parentNode?.removeChild(element);
    });

  // Note: It would be good to use `cloned.innerText` (maybe?) at some point,
  // but it returns `undefined` in jsdom. It also does cause a reflow, so maybe
  // this is fine?
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  return (cloned.textContent || "").substring(0, 1).toUpperCase();
}
