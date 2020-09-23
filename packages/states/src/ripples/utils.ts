import { findSizingContainer } from "@react-md/utils";

import { RippleEvent, RippleState, RippleType } from "./types";

/**
 * Checks if the ripple event should be ignored since it was bubbled
 * up from a child treeitem. I should find a better way to handle
 * this at some point.
 */
export function isBubbled<E extends HTMLElement>(
  event: Pick<RippleEvent<E>, "currentTarget" | "target">
): boolean {
  return Array.from(
    event.currentTarget.querySelectorAll('[role="treeitem"]')
  ).some((item) => item.contains(event.target as HTMLElement));
}

/**
 * Gets the ripple event type based on the provided event.
 */
export function getType(
  event: Pick<RippleEvent<HTMLElement>, "type">
): RippleType {
  switch (event.type) {
    case "mousedown":
    case "mouseup":
    case "mouseleave":
      return "mouse";
    case "touchstart":
    case "touchmove":
    case "touchend":
      return "touch";
    case "keydown":
    case "keyup":
      return "keyboard";
    default:
      return "programmatic";
  }
}

/**
 * Checks if the provided event type is actually rippleable by ensuring:
 * - it is a mousedown event while not in touch mode and the left mouse was
 *   clicked.
 * - it was a keydown event for either tab or space when spacebar clicks have not
 *   been disabled
 * - it was a touchstart event
 */
export function isRippleable(
  event: RippleEvent<HTMLElement>,
  disableSpacebarClick: boolean
): boolean {
  switch (event.type) {
    case "mousedown":
      return (
        document.querySelector(".rmd-states--touch") === null &&
        event.button === 0
      );
    case "keydown":
      return (
        (!disableSpacebarClick && event.key === " ") ||
        (event.key === "Enter" &&
          !/checkbox|radio/i.test(
            event.currentTarget.getAttribute("type") || ""
          ))
      );
    case "touchstart":
    case "click":
      return true;
    default:
      return false;
  }
}

function calcHypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

/**
 * Gets the current radius for a ripple based on the x and y page dimensions
 * as well as the size of the element.
 *
 * This is really just in a separate file so I can easily mock this and write
 * tests.
 */
function getRadius(
  x: number,
  y: number,
  offsetWidth: number,
  offsetHeight: number
): number {
  return Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );
}

interface Origin {
  x: number;
  y: number;
}

/**
 * Gets the ripple creation origin base on the provided event. When the event
 * type is for keyboards or triggered programmatically, the origin will
 * be the center of the target element. When the event is for touch or mouse,
 * the origin will be the location within the viewport where the user touched
 * or clicked the target element.
 */
export function getOrigin(
  event: Pick<RippleEvent<HTMLElement>, "pageX" | "pageY" | "touches" | "type">,
  element: HTMLElement
): Origin {
  const type = getType(event);
  const { offsetWidth, offsetHeight } = element;

  let x: number;
  let y: number;
  if (type === "programmatic" || type === "keyboard") {
    x = offsetWidth / 2;
    y = offsetHeight / 2;
  } else {
    // if the event type is not programmatic, want to figure out exactly where in
    // the element to trigger the animation from. this can be determined by:
    // - getting the pageX and pageY of the mouse or touch event
    // - getting element's current position in the page

    let pageX;
    let pageY;
    if (type === "mouse") {
      ({ pageX, pageY } = event as React.MouseEvent<HTMLElement>);
    } else {
      const touch = (event as React.TouchEvent<HTMLElement>).touches.item(0);
      ({ pageX, pageY } = touch);
    }

    const rect = element.getBoundingClientRect();
    // have to include the current page's scroll offset to the element's
    // bounding rect since the pageX and pageY from Events include the scroll
    // offset while the bounding rect is only based on viewport.
    x = pageX - (rect.left + window.pageXOffset);
    y = pageY - (rect.top + window.pageYOffset);
  }

  return { x, y };
}

/**
 * Creates a new ripple state based off the provided event type.
 */
export function createRippleState(
  event: RippleEvent<HTMLElement>
): RippleState {
  const element =
    findSizingContainer(event.currentTarget) || event.currentTarget;
  const { offsetWidth, offsetHeight } = element;
  const type = getType(event);
  const { x, y } = getOrigin(event, element);

  const radius = getRadius(x, y, offsetWidth, offsetHeight);
  const size = radius * 2;
  return {
    startTime: Date.now(),
    style: {
      left: x - radius,
      top: y - radius,
      height: size,
      width: size,
    },
    type,
    holding: type !== "programmatic",
    exiting: false,
    entered: false,
  };
}
