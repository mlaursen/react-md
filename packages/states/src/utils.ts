import { getRippleRadius } from "./getRippleRadius";
import {
  IRipple,
  RippleEventType,
  RippleableEvent,
  RippleSetter,
} from "./types.d";

/**
 * This does some simple validation based on the provided event to ensure
 * that a ripple can actually be triggered from the current event.
 */
export function isValidRippleTrigger(
  event: RippleableEvent,
  disableSpacebarClick: boolean = false
) {
  switch (event.type) {
    case "mousedown":
      event = event as React.MouseEvent<HTMLElement>;
      return (
        event.button === 0 &&
        document.querySelector(".rmd-states--touch") === null
      );
    case "keydown":
      event = event as React.KeyboardEvent<HTMLElement>;
      return (
        (!disableSpacebarClick && event.key === " ") || event.key === "Enter"
      );
    case "click":
    case "touchstart":
      return true;
    default:
      return false;
  }
}

/**
 * A util to convert an event into a valid RippleTrigger based on
 * event type.
 */
export function getRippleTriggerType(
  triggerOrEvent: RippleEventType | RippleableEvent
) {
  if (typeof triggerOrEvent === "string") {
    return triggerOrEvent;
  }

  switch (triggerOrEvent.type) {
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
 * Creates a ripple based on the provided event. If the event is not considered programmatic,
 * the ripple will be positioned where the user "touched"/"interacted" with the element within
 * the page. Otherwise, the ripple will be positioned in the center of the element.
 */
export function createRipple(event: RippleableEvent): IRipple {
  const element = event.currentTarget;
  const { offsetWidth, offsetHeight } = element;
  const type = getRippleTriggerType(event);

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
      event = event as React.TouchEvent<HTMLElement>;

      const touch = event.touches.item(0);
      ({ pageX, pageY } = touch);
    }

    const rect = element.getBoundingClientRect();
    // have to include the current page's scroll offset to the element's
    // bounding rect since the pageX and pageY from Events include the scroll
    // offset while the bounding rect is only based on viewport.
    x = pageX - (rect.left + window.pageXOffset);
    y = pageY - (rect.top + window.pageYOffset);
  }

  const radius = getRippleRadius(x, y, offsetWidth, offsetHeight);
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
    // when the ripple was triggered by a click event, it is a "full" programmatic event
    // and is impossible to hold
    holding: type !== "programmatic",
    exiting: false,
  };
}

/**
 * A util that will conditionally add a new ripple to the queue of ripples.
 * It will ensure that:
 * - the event is a valid "ripple-able" event
 * - there aren't any ripples of the same type that is still being held
 *
 * A small additional feature is that it will remove all other ripples that are
 * not of the same type. This is really just for cleanup and preventing weird things
 * from happening if a user attempts to hold a ripple down and somehow engage in
 * another ripple trigger action. It's pretty much invalid to do this anyways, so
 * just clear them all up to be safe.
 */
export function addRippleFromEvent(
  event: RippleableEvent,
  ripples: IRipple[],
  setRipples: RippleSetter,
  disableSpacebarClick: boolean = false
) {
  if (!isValidRippleTrigger(event, disableSpacebarClick)) {
    return;
  }

  const type = getRippleTriggerType(event);
  if (ripples.find(ripple => ripple.type === type && ripple.holding)) {
    return;
  }

  const ripple = createRipple(event);
  setRipples(ripples.filter(ripple => ripple.type === type).concat(ripple));
}

/**
 * This util will attempt to find a ripple that is being "held" by the user and
 * update it to no longer being held. If the ripple has been held for more than
 * 300ms, it will also trigger the exit animation.
 */
export function disableRippleHolding(
  event: RippleableEvent,
  ripples: IRipple[],
  setRipples: RippleSetter
) {
  const type = getRippleTriggerType(event);
  const i = ripples.findIndex(ripple => ripple.holding && ripple.type === type);

  if (i === -1) {
    return;
  }

  const ripple = ripples[i];
  const nextRipples = ripples.slice();
  nextRipples[i] = {
    ...ripple,
    holding: false,
    exiting: Date.now() - ripple.startTime > 300,
  };
  setRipples(nextRipples);
}

/**
 * A hook util that will attempt to start the exit animation for a ripple. It will
 * only trigger a ripple based on the provided ripple start time and if the ripple
 * is not being held anymore. This is used for the `onEntered` hook for the
 * CSSTransitionGroup behind the scenes. We don't actually want to trigger the exit
 * animation if the user is still holding the interactable element.
 */
export function triggerRippleExitAnimation(
  startTime: number,
  ripples: IRipple[],
  setRipples: RippleSetter
) {
  const i = ripples.findIndex(
    ripple => ripple.startTime === startTime && !ripple.holding
  );
  if (i === -1) {
    return;
  }

  const nextRipples = ripples.slice();
  nextRipples[i] = {
    ...ripples[i],
    exiting: true,
  };
  setRipples(nextRipples);
}

/**
 * A hook util that will start the exit animation for all ripples that are not
 * exiting but have the provided ripple trigger type. This is really just for
 * when the user does a mousedown event, but moves the mouse out of the element
 * before releasing the button. We want to trigger the exit animation for all
 * mouse events at this point since the `mouseup` event won't be triggered when
 * the mouse is no longer within the element.
 */
export function triggerRippleExitAnimations(
  typeOrEvent: RippleEventType | RippleableEvent,
  setRipples: RippleSetter
) {
  const type = getRippleTriggerType(typeOrEvent);

  setRipples(ripples =>
    ripples.map(ripple => {
      if (ripple.type === type && !ripple.exiting) {
        return { ...ripple, exiting: true };
      }

      return ripple;
    })
  );
}

/**
 * Removes a ripple from the list by start time.
 */
export function removeRippleByStartTime(
  startTime: number,
  ripples: IRipple[],
  setRipples: RippleSetter
) {
  const i = ripples.findIndex(ripple => ripple.startTime === startTime);
  if (i === -1) {
    return;
  }

  const nextRipples = ripples.slice();
  nextRipples.splice(i, 1);
  setRipples(nextRipples);
}

/**
 * Removes all ripples from the list of ripples that match the provided type. This
 * is really only used for canceling touch events if the user tries to scroll the page
 * while pressing an "interactable" element.
 */
export function cancelRipplesByType(
  typeOrEvent: RippleEventType | RippleableEvent,
  setRipples: RippleSetter
) {
  const type = getRippleTriggerType(typeOrEvent);

  setRipples(ripples => ripples.filter(ripple => ripple.type !== type));
}
