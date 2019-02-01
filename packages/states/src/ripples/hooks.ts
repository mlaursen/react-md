import { useState, useContext } from "react";
import { IRipple, IRipplesOptions } from "./types";
import {
  addRippleFromEvent,
  disableRippleHolding,
  triggerRippleExitAnimations,
  cancelRipplesByType,
} from "./utils";
import { RippleContext } from "./context";

/**
 * A hook for using the ripple effect when the user interacts with
 * a focusable/clickable component. This should mostly be used behind
 * the scenes for the `withRipples` hoc, but might be useful in other
 * places.
 */
export function useRipplesState({
  disabled: propDisabled,
  disableRipple: propDisableRipple,
  disableProgrammaticRipple: propDisableProgrammaticRipple,
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
  let disableRipple = propDisableRipple;
  let disableProgrammaticRipple = propDisableProgrammaticRipple;
  if (
    typeof disableRipple === "undefined" ||
    typeof disableProgrammaticRipple === "undefined"
  ) {
    const context = useRippleContext();

    if (typeof propDisableRipple === "undefined") {
      disableRipple = context.disableRipple;
    }

    if (typeof disableProgrammaticRipple === "undefined") {
      disableProgrammaticRipple = context.disableProgrammaticRipple;
    }
  }

  const disabled = propDisabled || disableRipple;
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
    disableRipple,
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

/**
 * A simple hook that can be used to get the Ripple context. This is used
 * behind the scenes for the Ripple component and _probably_ shouldn't be
 * used anywhere else. It's mostly used to just use the context defaults when
 * the timeout or classNames are undefined.
 */
export function useRippleContext() {
  return useContext(RippleContext);
}
