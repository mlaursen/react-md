import { type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";

import { findSizingContainer } from "../positioning/utils.js";
import { type Point } from "../types.js";
import { calcHypotenuse } from "../utils/trigonometry.js";
import {
  type ElementInteractionState,
  type RippleState,
  type RippleStyle,
} from "./types.js";

/**
 * @internal
 * @since 6.3.0
 */
interface GetRadiusOptions extends Point {
  height: number;
  width: number;
}

/**
 * @internal
 * @since 6.3.0
 */
export function getRadius(options: GetRadiusOptions): number {
  const { x, y, height, width } = options;

  return Math.max(
    calcHypotenuse({ x, y }),
    calcHypotenuse({ x: width - x, y }),
    calcHypotenuse({ x: width - x, y: height - y }),
    calcHypotenuse({ x, y: height - y })
  );
}

/** @internal */
export function getRippleStyle(
  event:
    | MouseEvent<HTMLElement>
    | TouchEvent<HTMLElement>
    | KeyboardEvent<HTMLElement>,
  programmatic: boolean
): RippleStyle {
  const element =
    findSizingContainer(event.currentTarget) || event.currentTarget;
  const rect = element.getBoundingClientRect();
  const { left, top, height, width } = rect;

  let x: number;
  let y: number;
  if ("key" in event || programmatic) {
    x = width / 2;
    y = height / 2;
  } else {
    let pageX: number;
    let pageY: number;
    if ("touches" in event) {
      ({ pageX, pageY } = event.touches[0]);
    } else {
      ({ pageX, pageY } = event);
    }

    x = pageX - (left + window.scrollX);
    y = pageY - (top + window.scrollY);
  }

  const radius = getRadius({ x, y, width, height });
  const size = radius * 2;

  return {
    left: x - radius,
    top: y - radius,
    height: size,
    width: size,
  };
}

/**
 * This is used to set the `exiting` state after a normal "touch" duration.
 * 300ms seemed like a good threshold since it is the majority of the scaling
 * duration (450ms)
 */
const ENTER_DELAY = 300;

/** @internal */
export function releaseRipple(
  state: ElementInteractionState
): ElementInteractionState {
  // find the first non-exiting ripple which should now be released
  const i = state.ripples.findIndex((ripple) => !ripple.exiting);
  if (i === -1) {
    return state;
  }

  const ripples = state.ripples.slice();
  const ripple = ripples[i];
  ripples[i] = {
    ...ripple,
    exiting: ripple.entered || Date.now() - ripple.startTime > ENTER_DELAY,
  };
  return { pressed: false, ripples };
}

/** @internal */
interface UpdateRipplesStateOptions {
  type: "entered" | "exited";
  state: ElementInteractionState;
  ripple: RippleState;
  holding: boolean;
}

/** @internal */
export function updateRipplesState(
  options: UpdateRipplesStateOptions
): ElementInteractionState {
  const { type, ripple, state, holding } = options;

  const rippleIndex = state.ripples.findIndex((r) => r === ripple);
  if (rippleIndex === -1) {
    return state;
  }

  const ripples = state.ripples.slice();
  if (type === "exited") {
    ripples.splice(rippleIndex, 1);
  } else {
    const exiting = !holding || Date.now() - ripple.startTime > ENTER_DELAY;
    ripples[rippleIndex] = {
      ...ripple,
      exiting,
      entered: true,
    };
  }

  return { ...state, ripples };
}
