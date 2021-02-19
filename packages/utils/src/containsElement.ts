import { MutableRefObject } from "react";

type CheckableElement = HTMLElement | null;
type CheckableThing = CheckableElement | MutableRefObject<CheckableElement>;

/**
 * Typeguard that will check if the provided checkable thing is a
 * MutableRefObject or just an HTMLElement.
 *
 * @internal
 */
const isMutableRefObject = (
  thing: CheckableThing
): thing is MutableRefObject<CheckableElement> =>
  !!thing &&
  typeof (thing as MutableRefObject<CheckableElement>).current !== "undefined";

/**
 * Gets the HTMLElement or null from the checkable thing.
 *
 * @internal
 */
const getElement = (thing: CheckableThing): CheckableElement => {
  if (isMutableRefObject(thing)) {
    return thing.current;
  }

  return thing;
};

/**
 * Checks if a container element contains another element as a child while
 * allowing for nulls or a MutableRefObject of HTMLElement or null. Mostly just
 * a convenience function that should be used internally.
 *
 * @param container - The element to use as a container element. This can be an
 * HTMLElement, null, or a MutableRefObject of HTMLElement or null.
 * @param child - The element that might be a child of the container
 * element. This can be an HTMLElement, null, or a MutableRefObject of
 * HTMLElement or null.
 * @returns True if the container contains the child element and both the
 * container and child are valid HTMLElements (not null).
 * @internal
 */
export function containsElement(
  container: CheckableThing,
  child: CheckableThing
): boolean {
  container = getElement(container);
  child = getElement(child);
  return !!(container && child && container.contains(child));
}
