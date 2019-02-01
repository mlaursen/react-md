import { useState, useContext, useEffect } from "react";

import { StatesContext } from "./context";
import {
  addRippleFromEvent,
  disableRippleHolding,
  triggerRippleExitAnimations,
  cancelRipplesByType,
} from "./utils";
import { IRipple, IRipplesOptions, MergableRippleHandlers } from "./types";

/**
 * This is a small hook that is used to determine if the app is currently
 * being used by a touch device or not. All this really does is switch
 * between mousemove and touchstart events to determine which mode you are in.
 *
 * @return true if the app is in touch mode.
 */
export function useTouchDetection() {
  const [lastTouchTime, setTouchTime] = useState(0);
  function updateTouchTime() {
    setTouchTime(Date.now());
  }

  function resetTouchTime() {
    if (Date.now() - lastTouchTime < 500) {
      return;
    }

    setTouchTime(0);
  }

  useEffect(() => {
    window.addEventListener("touchstart", updateTouchTime, true);

    return () => {
      window.removeEventListener("touchstart", updateTouchTime);
    };
  }, []);

  useEffect(
    () => {
      if (lastTouchTime !== 0) {
        window.addEventListener("mousemove", resetTouchTime, true);
      }

      return () => {
        window.removeEventListener("mousemove", resetTouchTime, true);
      };
    },
    [lastTouchTime]
  );

  return lastTouchTime !== 0;
}

/**
 * This hook is used to apply a class name to the root html element to showcase
 * that the app is in "touch" mode. This can be use alongside of the `useTouchDetection`
 * hook if needed, but the main benefit to this version is that adding a class can
 * also modify the css of all elements so that additional hover effects are not triggered
 * in touch mode.
 *
 * @param className - the class name to toggle on the root html element when
 * the app is in touch mode.
 */
export function useTouchDetectionClassNameToggle(
  className: string = "rmd-states--touch"
) {
  const isTouch = useTouchDetection();

  useEffect(
    () => {
      const html = document.querySelector("html") as HTMLElement;
      if (!html) {
        return;
      }

      if (isTouch) {
        html.classList.add(className);
      }

      return () => {
        html.classList.remove(className);
      };
    },
    [isTouch]
  );
}

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
    const context = useStatesContext();

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
 * This is a different version of the useRippleStates that will allow you to know
 * when a component is being pressed by the user. This is really just a fallback for
 * when the ripples are disabled.
 *
 * This will return an object containing the current pressed state of the element as well
 * as all the merged eventHandlers required to trigger the different states.
 */
export function usePressedStates<E extends HTMLElement = HTMLElement>({
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MergableRippleHandlers<E>) {
  const [pressed, setPressed] = useState(false);

  function handleTouchStart(event: React.TouchEvent<E>) {
    if (onTouchStart) {
      onTouchStart(event);
    }

    if (!pressed) {
      setPressed(true);
    }
  }

  function handleTouchMove(event: React.TouchEvent<E>) {
    if (onTouchMove) {
      onTouchMove(event);
    }

    if (pressed) {
      setPressed(false);
    }
  }

  function handleTouchEnd(event: React.TouchEvent<E>) {
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    if (pressed) {
      setPressed(false);
    }
  }

  function handleMouseDown(event: React.MouseEvent<E>) {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (!pressed && event.button === 0) {
      setPressed(true);
    }
  }

  function handleMouseUp(event: React.MouseEvent<E>) {
    if (onMouseUp) {
      onMouseUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
  }

  function handleMouseLeave(event: React.MouseEvent<E>) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    if (pressed) {
      setPressed(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<E>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (!pressed && [" ", "Enter"].includes(event.key)) {
      setPressed(true);
    }
  }

  function handleKeyUp(event: React.KeyboardEvent<E>) {
    if (onKeyUp) {
      onKeyUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
  }

  return {
    pressed,
    eventHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
  };
}

/**
 * A simple hook that can be used to get the Ripple context. This is used
 * behind the scenes for the Ripple component and _probably_ shouldn't be
 * used anywhere else. It's mostly used to just use the context defaults when
 * the timeout or classNames are undefined.
 */
export function useStatesContext() {
  return useContext(StatesContext);
}
