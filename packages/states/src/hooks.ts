import { useState, useEffect, HTMLAttributes } from "react";

export interface IPressedStatesOptions {
  touch?: boolean;
  mouse?: boolean;
  keyboard?: boolean;
}

export type PressedStatesEventHanlders<
  E extends HTMLElement = HTMLElement
> = Pick<
  HTMLAttributes<E>,
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onKeyDown"
  | "onKeyUp"
>;

export type PressedStatesOptions<
  E extends HTMLElement = HTMLElement
> = IPressedStatesOptions & PressedStatesEventHanlders<E>;

/**
 * This is a utility hook that will track while an element is currently being
 * pressed via touch, mouse, or keyboard by creating and returning the required
 * event handlers along with the current pressed flag. If the configuration object
 * includes any of the required event handlers already, they will be merged into
 * the created handlers automatically and will be called **before** the pressed
 * states implementation runs.
 *
 * Please note that this is not a fully robust solution as you might get "invalid"
 * mobile touch indications if the user is scrolling.
 */
export function usePressedStates<E extends HTMLElement = HTMLElement>({
  touch = true,
  mouse = true,
  keyboard = true,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
}: PressedStatesOptions) {
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
    onTouchStart: touch ? handleTouchStart : onTouchStart,
    onTouchMove: touch ? handleTouchMove : onTouchMove,
    onTouchEnd: touch ? handleTouchEnd : onTouchEnd,
    onMouseDown: mouse ? handleMouseDown : onMouseDown,
    onMouseUp: mouse ? handleMouseUp : onMouseUp,
    onMouseLeave: mouse ? handleMouseLeave : onMouseLeave,
    onKeyDown: keyboard ? handleKeyDown : onKeyDown,
    onKeyUp: keyboard ? handleKeyUp : onKeyUp,
  };
}

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
