import { useState, useEffect, HTMLAttributes } from "react";
import { IRipple, RippleTrigger } from "./types";

function calcHypotenuse(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

function createRipple(
  element: HTMLElement,
  type: RippleTrigger,
  pageX?: number,
  pageY?: number
): IRipple {
  const { offsetWidth, offsetHeight } = element;

  let x: number;
  let y: number;
  if (typeof pageX !== "undefined" && typeof pageY !== "undefined") {
    const rect = element.getBoundingClientRect();

    x = pageX - rect.left + window.pageXOffset;
    y = pageY - rect.top + window.pageYOffset;
  } else {
    x = offsetWidth / 2;
    y = offsetHeight / 2;
  }

  const radius = Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );

  const size = radius * 2;
  return {
    timestamp: Date.now(),
    style: {
      left: x - radius,
      top: y - radius,
      height: size,
      width: size,
    },
    type,
    exiting: false,
  };
}

export type MergableRippleHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onKeyDown" | "onMouseDown" | "onTouchStart"
>;

export interface IRipplesOptions extends MergableRippleHandlers {
  disabled?: boolean;
}

export function useRipplesState({
  disabled,
  onKeyDown,
  onMouseDown,
  onTouchStart,
}: IRipplesOptions) {
  const [ripples, setRipples] = useState<IRipple[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.key !== " " && event.key !== "Enter") {
      return;
    }

    const ripple = createRipple(event.currentTarget, "keyboard");
    setRipples(ripples.concat(ripple));
  }

  function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (event.button !== 0 || document.querySelector(".rmd-states--touch")) {
      return;
    }

    const ripple = createRipple(
      event.currentTarget,
      "mouse",
      event.pageX,
      event.pageY
    );
    setRipples(ripples.concat(ripple));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    if (onTouchStart) {
      onTouchStart(event);
    }

    const touch = event.touches.item(0);
    const ripple = createRipple(
      event.currentTarget,
      "touch",
      touch.pageX,
      touch.pageY
    );
    setRipples(ripples.concat(ripple));
  }

  return {
    ripples,
    setRipples,
    onMouseDown: disabled ? undefined : handleMouseDown,
    onKeyDown: disabled ? undefined : handleKeyDown,
    onTouchStart: disabled ? undefined : handleTouchStart,
  };
}
