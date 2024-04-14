import { type RefObject } from "react";
import {
  type DraggableEventHandlers,
  type DraggableImplementation,
  type DraggableMouseEventHandlers,
  type DraggableTouchEventHandlers,
} from "../draggable/useDraggable.js";
import { type RenameKeysWithPrefix } from "../types.js";
import {
  getClientPosition,
  type ClientPositionEvent,
} from "../utils/getClientPosition.js";
import { getPercentage } from "../utils/getPercentage.js";
import { getRangeSteps } from "../utils/getRangeSteps.js";

/**
 * @since 6.0.0
 * @internal
 */
interface JumpOptions {
  min: number;
  max: number;
  step: number;
  jump: number | undefined;
}

/**
 * @since 6.0.0
 * @internal
 */
export const getJumpValue = (options: JumpOptions): number => {
  const { min, max, step, jump } = options;

  const steps = getRangeSteps({ min, max, step });
  const value = jump ?? (steps / 10) * step;
  if (Number.isInteger(step)) {
    return Math.ceil(value);
  }

  return value;
};

/**
 * @since 6.0.0
 * @internal
 */
type RequiredThumbProps = Pick<
  DraggableImplementation<HTMLElement>,
  | "dragging"
  | keyof DraggableMouseEventHandlers<HTMLElement>
  | keyof DraggableTouchEventHandlers<HTMLElement>
> & { ref: RefObject<HTMLSpanElement> };

/**
 * @since 6.0.0
 * @internal
 */
export type ClosestThumbEventHandlersOptions = RenameKeysWithPrefix<
  RequiredThumbProps,
  "thumb1"
> &
  RenameKeysWithPrefix<RequiredThumbProps, "thumb2"> & {
    vertical: boolean;
    isRangeSlider: boolean;
  };

/**
 * NOTE: I do not need the mousemove events for this one to work.
 *
 * @since 6.0.0
 * @internal
 */
export const getClosestThumbEventHandlers = (
  options: ClosestThumbEventHandlersOptions
): DraggableEventHandlers<HTMLElement> => {
  const {
    thumb1Ref,
    thumb1Dragging,
    thumb1OnMouseUp,
    thumb1OnMouseDown,
    thumb1OnTouchStart,
    thumb1OnTouchMove,
    thumb2Ref,
    thumb2Dragging,
    thumb2OnMouseUp,
    thumb2OnMouseDown,
    thumb2OnTouchStart,
    thumb2OnTouchMove,
    isRangeSlider,
    vertical,
  } = options;

  if (!isRangeSlider) {
    return {
      onMouseDown: thumb1OnMouseDown,
      onMouseUp: thumb1OnMouseUp,
      onTouchStart: thumb1OnTouchStart,
      onTouchMove: thumb1OnTouchMove,
    };
  }

  const isThumbOneClosest = (event: ClientPositionEvent): boolean => {
    if (thumb2Dragging) {
      return false;
    }

    const thumb1 = thumb1Ref.current;
    const thumb2 = thumb2Ref.current;
    if (!thumb1Dragging && thumb1 && thumb2) {
      const clientPosition = getClientPosition({ event, vertical });
      const thumb1Rect = thumb1.getBoundingClientRect();
      const thumb2Rect = thumb2.getBoundingClientRect();
      const thumb1Position = vertical ? thumb1Rect.y : thumb1Rect.x;
      const thumb2Position = vertical ? thumb2Rect.y : thumb2Rect.x;

      return (
        Math.abs(clientPosition - thumb1Position) <
        Math.abs(clientPosition - thumb2Position)
      );
    }

    return true;
  };

  return {
    onMouseDown(event) {
      if (isThumbOneClosest(event)) {
        thumb1OnMouseDown(event);
      } else {
        thumb2OnMouseDown(event);
      }
    },
    onMouseUp(event) {
      if (isThumbOneClosest(event)) {
        thumb1OnMouseUp(event);
      } else {
        thumb2OnMouseUp(event);
      }
    },
    onTouchStart(event) {
      if (isThumbOneClosest(event)) {
        thumb1OnTouchStart(event);
      } else {
        thumb2OnTouchStart(event);
      }
    },
    onTouchMove(event) {
      if (isThumbOneClosest(event)) {
        thumb1OnTouchMove(event);
      } else {
        thumb2OnTouchMove(event);
      }
    },
  };
};

/**
 * @internal
 * @since 6.0.0
 */
export function getThumbOffset(
  offset: number | undefined,
  fallback: number
): string | undefined {
  if (typeof offset !== "number") {
    return;
  }

  // the `offset` will be NaN when there are no possible steps to take because
  // the first thumb is at the maximum value or the second thumb is at the
  // minimum value
  const value = Number.isNaN(offset) ? fallback : offset;
  return `${value * 100}%`;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface ThumbOffsetsOptions {
  min: number;
  max: number;
  thumb1Value: number;
  thumb1Dragging: boolean;
  thumb1DragPercentage: number;
  thumb2Value: number;
  thumb2Dragging: boolean;
  thumb2DragPercentage: number;
  isRangeSlider: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
interface ThumbOffsets {
  "--rmd-slider-offset-1"?: string;
  "--rmd-slider-offset-2"?: string;
}

/**
 * @since 6.0.0
 * @internal
 */
export const getThumbOffsets = (options: ThumbOffsetsOptions): ThumbOffsets => {
  const {
    min,
    max,
    thumb1Value,
    thumb1Dragging,
    thumb1DragPercentage,
    thumb2Value,
    thumb2Dragging,
    thumb2DragPercentage,
    isRangeSlider,
  } = options;
  let thumb1Percentage = thumb1Dragging
    ? thumb1DragPercentage
    : getPercentage({ min, max, value: thumb1Value });

  let thumb2Percentage: number | undefined;
  if (isRangeSlider) {
    const percentage = getPercentage({ min, max, value: thumb2Value });

    thumb1Percentage = Math.min(thumb1Percentage, percentage);
    thumb2Percentage = thumb2Dragging
      ? Math.max(thumb1Percentage, thumb2DragPercentage)
      : percentage;
  }

  return {
    "--rmd-slider-offset-1": getThumbOffset(thumb1Percentage, 0),
    "--rmd-slider-offset-2": getThumbOffset(thumb2Percentage, 1),
  };
};
