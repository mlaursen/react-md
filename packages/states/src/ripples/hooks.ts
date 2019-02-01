import { useState, useEffect, HTMLAttributes } from "react";
import {
  IRipple,
  RippleTrigger,
  RippleEvent,
  RippleSetter,
  IRipplesOptions,
} from "./types";

/**
 * This does some simple validation based on the provided event to ensure
 * that a ripple can actually be triggered from the current event.
 */
function isValidRippleTrigger(event: RippleEvent) {
  switch (event.type) {
    case "mousedown":
      event = event as React.MouseEvent<HTMLElement>;
      return (
        event.button === 0 &&
        document.querySelector(".rmd-states--touch") === null
      );
    case "keydown":
      event = event as React.KeyboardEvent<HTMLElement>;
      return event.key === " " || event.key === "Enter";
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
function getRippleTriggerType(event: RippleEvent | RippleTrigger) {
  if (typeof event === "string") {
    return event;
  }

  switch (event.type) {
    case "mousedown":
    case "mouseup":
    case "mouseleave":
      return "mouse";
    case "touchstart":
    case "touchmove":
    case "touchend":
      return "touch";
    default:
      return "programmatic";
  }
}

function calcHypotenuse(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

/**
 * Creates a ripple based on the provided event. If the event is not considered programmatic,
 * the ripple will be positioned where the user "touched"/"interacted" with the element within
 * the page. Otherwise, the ripple will be positioned in the center of the element.
 */
function createRipple(event: RippleEvent): IRipple {
  const element = event.currentTarget;
  const { offsetWidth, offsetHeight } = element;
  const type = getRippleTriggerType(event);

  let x: number;
  let y: number;
  if (type === "programmatic") {
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

  const radius = Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );

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
    holding: event.type !== "click",
    exiting: false,
  };
}

export function addRippleFromEvent(
  event: RippleEvent,
  ripples: IRipple[],
  setRipples: RippleSetter
) {
  if (!isValidRippleTrigger(event)) {
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
  event: RippleEvent,
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

  const ripple = ripples[i];
  const nextRipples = ripples.slice();
  nextRipples[i] = {
    ...ripples[i],
    exiting: true,
  };
  setRipples(nextRipples);
}

export function triggerRippleExitAnimations(
  typeOrEvent: RippleTrigger | RippleEvent,
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

export function cancelRipplesByType(
  typeOrEvent: RippleTrigger | RippleEvent,
  setRipples: RippleSetter
) {
  const type = getRippleTriggerType(typeOrEvent);

  setRipples(ripples => ripples.filter(ripple => ripple.type !== type));
}

export function useRipplesState({
  disabled,
  disableProgrammaticRipple,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseUp,
  onClick,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: IRipplesOptions) {
  const [ripples, setRipples] = useState<IRipple[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLElement>) {
    if (onKeyUp) {
      onKeyUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    if (onMouseDown) {
      onMouseDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  }

  function handleMouseUp(event: React.MouseEvent<HTMLElement>) {
    if (onMouseUp) {
      onMouseUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    triggerRippleExitAnimations(event, setRipples);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    if (onTouchStart) {
      onTouchStart(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLElement>) {
    if (onTouchMove) {
      onTouchMove(event);
    }

    cancelRipplesByType(event, setRipples);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (onClick) {
      onClick(event);
    }

    // when a click event is triggered and the current active element is not
    // the event target, we know it was a true programmatic event and should
    // trigger a ripple for it.
    if (document.activeElement === event.currentTarget) {
      return;
    }

    addRippleFromEvent(event, ripples, setRipples);
  }

  return {
    ripples,
    setRipples,
    eventHandlers: {
      onMouseDown: disabled ? onMouseDown : handleMouseDown,
      onMouseUp: disabled ? onMouseUp : handleMouseUp,
      onMouseLeave: disabled ? onMouseLeave : handleMouseLeave,
      onKeyDown: disabled ? onKeyDown : handleKeyDown,
      onKeyUp: disabled ? onKeyUp : handleKeyUp,
      onClick: disabled || disableProgrammaticRipple ? onClick : handleClick,
      onTouchStart: disabled ? onTouchStart : handleTouchStart,
      onTouchMove: disabled ? onTouchMove : handleTouchMove,
      onTouchEnd: disabled ? onTouchEnd : handleTouchEnd,
    },
  };
}
