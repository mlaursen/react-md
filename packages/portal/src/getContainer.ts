/**
 * This is the type for how a portal can be rendered into another element.
 * This can either be a function that returns the HTMLElement, an HTMLElement,
 * or a `document.querySelector` string.
 */
export type PortalInto = (() => HTMLElement) | HTMLElement | string | null;

/**
 * A utility function to get the current container for the portal.
 * For SSR, the container will always be `null` since portals don't
 * work server side.
 *
 * @param into The element to portal into
 * @param intoId An id for an element to portal into
 * @return the portal container element or null
 */
export default function getContainer(
  into?: PortalInto | undefined,
  intoId?: string | undefined
) {
  if (typeof document === "undefined") {
    return null;
  }

  let container: HTMLElement | null = null;
  if (typeof into === "undefined" && typeof intoId === "undefined") {
    container = document.body;
  } else if (typeof intoId === "string") {
    container = document.getElementById(intoId);
    if (!container) {
      throw new Error(
        "Unable to find a valid HTMLElement to render a portal into with the provided id: " +
          `\`${intoId}\`. Please provide an id of an element that exists on the page ` +
          "at the time of the portal rendering, provide a valid `into` prop, or leave both " +
          "the `intoId` and `into` props `undefined` to render in the `document.body`."
      );
    }
  } else if (typeof into === "string") {
    container = document.querySelector(into);
    if (!container) {
      throw new Error(
        "Unable to find a valid HTMLElement to render a portal into with the provided " +
          `querySelector: \`${into}\`. Please provide a querySelector that will return ` +
          "a valid HTMLElement on the page at the time of the portal rendering, an " +
          "HTMLElement, an id for an element on the page with `intoId`, or leave both the " +
          "`intoId` and `into` props `undefined` to render in the `document.body`."
      );
    }
  } else if (typeof into === "function") {
    container = into();
  } else if (into) {
    container = into;
  }

  return container;
}
