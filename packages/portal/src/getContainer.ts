/**
 * This is the type for how a portal can be rendered into another element.  This
 * can either be a function that returns the HTMLElement, an HTMLElement, or a
 * `document.querySelector` string.
 */
export type PortalInto =
  | (() => HTMLElement | null)
  | HTMLElement
  | string
  | null;

/**
 * A utility function to get the current container for the portal.  For SSR, the
 * container will always be `null` since portals don't work server side.
 *
 * @param into - The element to portal into
 * @param intoId - An id for an element to portal into
 * @returns the portal container element or null
 */
export function getContainer(
  into?: PortalInto | undefined,
  intoId?: string | undefined
): HTMLElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  let container: HTMLElement | null = null;
  if (typeof into === "undefined" && typeof intoId === "undefined") {
    container = document.body;
  } else if (typeof intoId === "string") {
    container = document.getElementById(intoId);
  } else if (typeof into === "string") {
    container = document.querySelector(into);
  } else if (typeof into === "function") {
    container = into();
  } else if (into) {
    container = into;
  }

  return container;
}
