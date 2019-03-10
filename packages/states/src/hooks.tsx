import React, { ReactNode, useContext, useEffect, useState } from "react";
import cn from "classnames";
import { Omit, useKeyboardFocusedClassName } from "@react-md/wia-aria";

import { StatesContextType, StatesContext } from "./context";
import RippleContainer from "./RippleContainer";
import {
  RippleConfig,
  RipplesOptions,
  MergableRippleHandlers,
} from "./types.d";
import {
  addRippleFromEvent,
  cancelRipplesByType,
  disableRippleHolding,
  triggerRippleExitAnimations,
} from "./utils";

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

  useEffect(() => {
    if (lastTouchTime !== 0) {
      window.addEventListener("mousemove", resetTouchTime, true);
    }

    return () => {
      window.removeEventListener("mousemove", resetTouchTime, true);
    };
  }, [lastTouchTime]);

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

  useEffect(() => {
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
  }, [isTouch]);
}

/**
 * A hook for using the ripple effect when the user interacts with
 * a focusable/clickable component. This should mostly be used behind
 * the scenes for the `withRipples` hoc, but might be useful in other
 * places.
 */
export function useRipplesState<E extends HTMLElement = HTMLElement>({
  handlers = {},
  disabled: propDisabled,
  disableSpacebarClick,
  disableRipple,
  disableProgrammaticRipple,
}: RipplesOptions<E>) {
  const disabled = propDisabled || disableRipple;
  const [ripples, setRipples] = useState<RippleConfig[]>([]);
  const {
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = handlers;

  const handleKeyDown = (event: React.KeyboardEvent<E>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples, disableSpacebarClick);
  };

  const handleKeyUp = (event: React.KeyboardEvent<E>) => {
    if (onKeyUp) {
      onKeyUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  };

  const handleMouseDown = (event: React.MouseEvent<E>) => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  };

  const handleMouseUp = (event: React.MouseEvent<E>) => {
    if (onMouseUp) {
      onMouseUp(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  };

  const handleMouseLeave = (event: React.MouseEvent<E>) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    triggerRippleExitAnimations(event, setRipples);
  };

  const handleTouchStart = (event: React.TouchEvent<E>) => {
    if (onTouchStart) {
      onTouchStart(event);
    }

    addRippleFromEvent(event, ripples, setRipples);
  };

  const handleTouchMove = (event: React.TouchEvent<E>) => {
    if (onTouchMove) {
      onTouchMove(event);
    }

    cancelRipplesByType(event, setRipples);
  };

  const handleTouchEnd = (event: React.TouchEvent<E>) => {
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    disableRippleHolding(event, ripples, setRipples);
  };

  const handleClick = (event: React.MouseEvent<E>) => {
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
  };

  return {
    ripples,
    setRipples,
    handlers: {
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

interface PressedStatesOptions<E extends HTMLElement = HTMLElement> {
  handlers?: MergableRippleHandlers<E>;
  disableSpacebarClick?: boolean;
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
  handlers = {},
  disableSpacebarClick = false,
}: PressedStatesOptions<E>) {
  const [pressed, setPressed] = useState(false);
  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onKeyDown,
    onKeyUp,
  } = handlers;

  const handleTouchStart = (event: React.TouchEvent<E>) => {
    if (onTouchStart) {
      onTouchStart(event);
    }

    if (!pressed) {
      setPressed(true);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<E>) => {
    if (onTouchMove) {
      onTouchMove(event);
    }

    if (pressed) {
      setPressed(false);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<E>) => {
    if (onTouchEnd) {
      onTouchEnd(event);
    }

    if (pressed) {
      setPressed(false);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<E>) => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (!pressed && event.button === 0) {
      setPressed(true);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<E>) => {
    if (onMouseUp) {
      onMouseUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<E>) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    if (pressed) {
      setPressed(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<E>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const { key } = event;
    if (
      !pressed &&
      (key === "Enter" || (!disableSpacebarClick && key === " "))
    ) {
      setPressed(true);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<E>) => {
    if (onKeyUp) {
      onKeyUp(event);
    }

    if (pressed) {
      setPressed(false);
    }
  };

  return {
    pressed,
    handlers: {
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

export interface InteractionStatesOptions<E extends HTMLElement = HTMLElement>
  extends Omit<Partial<StatesContextType>, "preventColorPollution">,
    RipplesOptions<E> {
  /**
   * An optional id for the element so that keyboard tracking can be enabled.
   */
  id?: string;

  /**
   * An optional className to merge with the different interactions tates.
   */
  className?: string;

  /**
   * Boolean if the wrapped component needs to have the functionality of a keyboard click
   * event. This is really only necessary when the wrapped component is not a native clickable
   * element like a `<button>`.
   *
   * @default false
   */
  enableKeyboardClick?: boolean;

  /**
   * Boolean if the spacebar should not trigger a click event when using the `enableKeyboardClick`
   * prop. You _normally_ want the spacebar to also trigger a click event when the `enableKeyboardClick`
   * prop is enabled, but there are a few cases where it should not (like custom links).
   *
   * When this is disabled, it will also make sure that the ripple and pressed effects are not triggered
   * from a spacebar click.
   *
   * @default false
   */
  disableSpacebarClick?: boolean;

  /**
   * Boolean if the component should fallback to using the custom pressed class names when ripples are
   * disabled.
   *
   * @default false
   */
  disablePressedFallback?: boolean;
}

/**
 * This is probably one of the most useful hook in react-md. Any functional component component that uses
 * this will gain all the different interaction states based on the states context or any custom overrides.
 *
 * The main interaction state is the "ripple" effect when an element has been clicked either via keyboard,
 * mouse, or touch.
 *
 * If the ripple effect is disabled, it will fallback to "polyfilling"/fixing the `:pressed` pseudo-selector
 * state for items so that a different background-color opacity is applied instead of the entire ripple
 * effect. This is polyfilled since the `:pressed` state does not work on anything other than buttons and links
 * by default and it is not triggered on "valid" keyboard clicks with a spacebar.
 *
 * Finally, the element that uses this hook will gain a focused classname whenever it gains keyboard focus only.
 *
 * To get all these interaction states to work correctly, this hook returns an object containing:
 * - `handlers`- an object of event handlers that must be passed down to your component to get the different
 *  interaction states. All the event handlers are automatically merged with any `handlers` that are provided
 *  to this hook so they can all be called if needed.
 * - `className` - the current class name for the element
 * - `ripples` - a renderable element that displays the ripple effects. This will be `null` when ripples are
 *  disabled.
 *
 * @typeparam E The element type for the component being wrapped. This is really just used to "better type"
 * the event handlers.
 */
export function useInteractionStates<E extends HTMLElement = HTMLElement>(
  options: InteractionStatesOptions<E> = {}
) {
  const {
    id,
    rippleClassName,
    rippleContainerClassName,
    enableKeyboardClick = false,
    disableSpacebarClick = false,
    disablePressedFallback = false,
  } = options;

  let {
    className,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
  } = options;

  // populate undefined props from their context values
  const context = useStatesContext();
  if (typeof disableRipple === "undefined") {
    ({ disableRipple } = context);
  }

  if (typeof disableProgrammaticRipple === "undefined") {
    ({ disableProgrammaticRipple } = context);
  }

  if (typeof rippleTimeout === "undefined") {
    ({ rippleTimeout } = context);
  }

  if (typeof rippleClassNames === "undefined") {
    ({ rippleClassNames } = context);
  }

  // this will be populated with a list of event handlers for managing the different
  // interaction states for an element. This will only be undefined if both the ripple
  // and pressed fallback states are disabled
  let handlers: MergableRippleHandlers<E> | null = null;
  let ripplesContainer: ReactNode = null;
  if (!disableRipple) {
    // if the ripple effect is not disabled, will we have ripple interaction states
    // instead of just pressed states.
    const { ripples, setRipples, handlers: h } = useRipplesState(options);
    handlers = h;

    ripplesContainer = (
      <RippleContainer
        ripples={ripples}
        setRipples={setRipples}
        className={rippleContainerClassName}
        rippleClassName={rippleClassName}
        timeout={rippleTimeout}
        classNames={rippleClassNames}
      />
    );
  } else if (!disablePressedFallback) {
    // if the ripple effect was disabled and the default pressed state interactions were
    // also not disabled, we can hook into it there
    const { pressed, handlers: h } = usePressedStates(options);
    handlers = h;
    className = cn(className, { "rmd-states--pressed": pressed });
  }

  if (id) {
    // if the element is "valid" and has an id, we can also start the keyboard focus only
    // states for the element by merging the class name
    className = cn(className, useKeyboardFocusedClassName(id));
  }

  // "polyfill" the keyboard click events for elements that are supposed to behave like clickable
  // elements but really aren't. this will make sure to merge existing onKeyDown behaviors from
  // the ripple/pressed effects (if any) or the onKeyDown behavior from props
  if (enableKeyboardClick) {
    handlers = handlers || options.handlers || {};
    const { onKeyDown } = handlers;
    handlers.onKeyDown = (event: React.KeyboardEvent<E>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (!disableSpacebarClick && event.key === " ") {
        // need to prevent default behavior of screen scrolling
        event.preventDefault();
        event.currentTarget.click();
      } else if (event.key === "Enter") {
        event.currentTarget.click();
      }
    };
  }

  return {
    ripples: ripplesContainer,
    className,
    handlers,
  };
}
