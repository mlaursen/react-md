import type { KeyboardFocusElementData } from "./types";
import { loop } from "../loop";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const focusElement = (element: HTMLElement): void => {
  element.focus();
};

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
 * @remarks \@since 5.0.0
 * @internal
 */
export const getFirstFocusableIndex = (
  watching: readonly KeyboardFocusElementData[],
  includeDisabled: boolean
): number => {
  if (!watching.length) {
    return -1;
  }

  let firstIndex = 0;
  while (
    firstIndex < watching.length - 1 &&
    isNotFocusable(watching[firstIndex].element, includeDisabled)
  ) {
    firstIndex += 1;
  }

  if (isNotFocusable(watching[firstIndex].element, includeDisabled)) {
    return -1;
  }

  return firstIndex;
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getLastFocusableIndex = (
  watching: readonly KeyboardFocusElementData[],
  includeDisabled: boolean
): number => {
  if (!watching.length) {
    return -1;
  }

  let lastIndex = watching.length - 1;
  while (
    lastIndex > 0 &&
    isNotFocusable(watching[lastIndex].element, includeDisabled)
  ) {
    lastIndex -= 1;
  }

  if (isNotFocusable(watching[lastIndex].element, includeDisabled)) {
    return -1;
  }

  return lastIndex;
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
interface NextFocusableIndexOptions {
  loopable: boolean;
  watching: readonly KeyboardFocusElementData[];
  increment: boolean;
  includeDisabled: boolean;
  currentFocusIndex: number;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getNextFocusableIndex = ({
  loopable,
  watching,
  increment,
  includeDisabled,
  currentFocusIndex,
}: NextFocusableIndexOptions): number => {
  const min = getFirstFocusableIndex(watching, includeDisabled);
  const max = getLastFocusableIndex(watching, includeDisabled);
  let nextIndex = loop({
    min,
    max,
    value: currentFocusIndex,
    minmax: !loopable,
    increment,
  });
  while (
    isNotFocusable(watching[nextIndex].element, includeDisabled) &&
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
