import type { MouseEvent, TouchEvent } from "react";
import type { ClientPositionOptions } from "../utils";
import { getClientPosition, getRangeSteps, nearest } from "../utils";

/**
 * @internal
 */
export const isMouseDragStartEvent = (event: MouseEvent): boolean =>
  event.button === 0 &&
  !event.altKey &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey;

/**
 * @internal
 */
export const isTouchDragStartEvent = (event: TouchEvent): boolean =>
  event.changedTouches.length === 1;

interface DragPositionOptions extends ClientPositionOptions {
  isRTL: boolean;
  container: Element;
}

/**
 * @internal
 */
export const getDragPosition = (options: DragPositionOptions): number => {
  const { isRTL, vertical, container } = options;

  const clientPosition = getClientPosition(options);
  const { left, right, top } = container.getBoundingClientRect();
  if (vertical) {
    return clientPosition - top;
  }

  if (isRTL) {
    return right - clientPosition;
  }

  return clientPosition - left;
};

interface RelativeDragPositionOptions extends DragPositionOptions {
  min: number;
  max: number;
  step: number;
}

interface RelativeDragPosition {
  value: number;
  dragPercentage: number;
}

export const getRelativeDragPosition = (
  options: RelativeDragPositionOptions
): RelativeDragPosition => {
  const { min, max, step, isRTL, vertical, container } = options;

  const { height, width, left, top } = container.getBoundingClientRect();
  const containerSize = vertical ? height : width;
  const containerPosition = vertical ? top + height : left;
  const clientPosition = getClientPosition(options);

  const position = vertical
    ? containerPosition - clientPosition
    : clientPosition - containerPosition;
  const distanceDragged = Math.min(Math.max(0, position), containerSize);
  let dragPercentage = distanceDragged / containerSize;
  if (isRTL && !vertical) {
    dragPercentage = 1 - dragPercentage;
  }

  const range = max - min;
  const steps = getRangeSteps({ min, max, step });
  const value = dragPercentage * range + min;

  return {
    value: nearest({
      min,
      max,
      steps,
      range,
      value,
    }),
    dragPercentage,
  };
};
