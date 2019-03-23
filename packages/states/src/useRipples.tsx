import React, { useCallback, useEffect, useRef, useState } from "react";
import RippleContainer from "./RippleContainer";
import { RippleConfig, RipplesOptions } from "./types.d";
import {
  addRippleFromEvent,
  cancelRipplesByType,
  disableRippleHolding,
  triggerRippleExitAnimations,
} from "./utils";

/**
 * A hook for using the ripple effect when the user interacts with
 * a focusable/clickable component. This should mostly be used behind
 * the scenes for the `withRipples` hoc, but might be useful in other
 * places.
 */
export function useRipplesState<E extends HTMLElement = HTMLElement>({
  handlers = {},
  disabled: propDisabled,
  disableRipple,
  disableSpacebarClick,
  disableProgrammaticRipple,
}: RipplesOptions<E>) {
  const disabled = propDisabled || disableRipple;
  const [ripples, setRipples] = useState<RippleConfig[]>([]);
  const ref = useRef({
    ...handlers,
    ripples,
    disableSpacebarClick,
  });
  useEffect(() => {
    ref.current = {
      ...handlers,
      ripples,
      disableSpacebarClick,
    };
  });

  const handleKeyDown = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyDown, ripples, disableSpacebarClick } = ref.current;
    if (onKeyDown) {
      onKeyDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples, disableSpacebarClick);
  }, []);
  const handleKeyUp = useCallback((event: React.KeyboardEvent<E>) => {
    const { onKeyUp, ripples } = ref.current;
    if (onKeyUp) {
      onKeyUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseDown, ripples } = ref.current;
    if (onMouseDown) {
      onMouseDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  }, []);
  const handleMouseUp = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseUp, ripples } = ref.current;
    if (onMouseUp) {
      onMouseUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }, []);

  const handleMouseLeave = useCallback((event: React.MouseEvent<E>) => {
    const { onMouseLeave } = ref.current;
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    triggerRippleExitAnimations(event, setRipples);
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchStart, ripples } = ref.current;
    if (onTouchStart) {
      onTouchStart(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  }, []);
  const handleTouchMove = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchMove } = ref.current;
    if (onTouchMove) {
      onTouchMove(event);
    }

    cancelRipplesByType(event, setRipples);
  }, []);
  const handleTouchEnd = useCallback((event: React.TouchEvent<E>) => {
    const { onTouchEnd, ripples } = ref.current;
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<E>) => {
    const { onClick, ripples } = ref.current;
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
  }, []);

  return {
    ripples,
    setRipples,
    handlers: {
      onMouseDown: disabled ? handlers.onMouseDown : handleMouseDown,
      onMouseUp: disabled ? handlers.onMouseUp : handleMouseUp,
      onMouseLeave: disabled ? handlers.onMouseLeave : handleMouseLeave,
      onKeyDown: disabled ? handlers.onKeyDown : handleKeyDown,
      onKeyUp: disabled ? handlers.onKeyUp : handleKeyUp,
      onClick:
        disabled || disableProgrammaticRipple ? handlers.onClick : handleClick,
      onTouchStart: disabled ? handlers.onTouchStart : handleTouchStart,
      onTouchMove: disabled ? handlers.onTouchMove : handleTouchMove,
      onTouchEnd: disabled ? handlers.onTouchEnd : handleTouchEnd,
    },
  };
}

/**
 * A hook that will return an object containing the ripples element
 * and an object of event handlers to apply to an element to trigger
 * the ripple effects.
 */
export function useRipples<E extends HTMLElement = HTMLElement>({
  rippleTimeout,
  rippleClassNames,
  rippleContainerClassName,
  rippleClassName,
  ...options
}: RipplesOptions<E>) {
  const { ripples, setRipples, handlers } = useRipplesState(options);

  return {
    handlers,
    ripples: (
      <RippleContainer
        key="ripples"
        ripples={ripples}
        setRipples={setRipples}
        className={rippleContainerClassName}
        rippleClassName={rippleClassName}
        timeout={rippleTimeout}
        classNames={rippleClassNames}
      />
    ),
  };
}
