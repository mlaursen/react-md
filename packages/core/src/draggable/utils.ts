import { type MouseEvent, type RefObject, type TouchEvent } from "react";

import { type MinMaxRange } from "../types.js";
import {
  type ClientPositionEvent,
  type ClientPositionOptions,
  getClientPosition,
} from "../utils/getClientPosition.js";
import { getRangeSteps } from "../utils/getRangeSteps.js";
import { nearest } from "../utils/nearest.js";
import { withinRange } from "../utils/withinRange.js";

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

/**
 * @internal
 */
interface DragPositionOptions extends ClientPositionOptions {
  isRTL: boolean;
  reversed: boolean;
  container: Element;
}

/**
 * @internal
 */
export const getDragPosition = (options: DragPositionOptions): number => {
  const { isRTL, reversed, vertical, container } = options;

  const clientPosition = getClientPosition(options);
  const { left, right, top } = container.getBoundingClientRect();
  if (vertical) {
    if (reversed) {
      return window.innerHeight - clientPosition;
    }

    // added `Math.max` since the `top` will be a negative number if rendered
    // within a portal element like a dialog/sheet
    return clientPosition - Math.max(0, top);
  }

  if (reversed ? !isRTL : isRTL) {
    return right - clientPosition;
  }

  return clientPosition - left;
};

/**
 * @internal
 */
interface RelativeDragPositionOptions extends DragPositionOptions, MinMaxRange {
  step: number;
  rangeMin: number;
  rangeMax: number;
}

/**
 * @internal
 */
interface RelativeDragPosition {
  value: number;
  dragPercentage: number;
}

/**
 * @internal
 */
export const getRelativeDragPosition = (
  options: RelativeDragPositionOptions
): RelativeDragPosition => {
  const { min, max, rangeMin, rangeMax, step, isRTL, vertical, container } =
    options;

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

  const range = rangeMax - rangeMin;
  const steps = getRangeSteps({ min: rangeMin, max: rangeMax, step });
  const value = dragPercentage * range + rangeMin;
  const nextValue = nearest({
    min,
    max,
    steps,
    range,
    value,
  });

  return {
    value: nextValue,
    dragPercentage,
  };
};

/**
 * @internal
 */
interface UpdateDragPositionOptions extends Omit<
  RelativeDragPositionOptions,
  "container"
> {
  event: ClientPositionEvent;
  nodeRef: RefObject<HTMLElement>;
  focus?: boolean;
  isDragStart: boolean;
  setValue: (value: number) => void;
  setDragging: (dragging: boolean) => void;
  setDragPercentage: (value: number) => void;
  withinOffsetParent: boolean;
}

/**
 * @internal
 */
export const updateDragPosition = (
  options: UpdateDragPositionOptions
): void => {
  const {
    event,
    nodeRef,
    min,
    max,
    step,
    rangeMin,
    rangeMax,
    isRTL,
    reversed,
    vertical,
    isDragStart,
    setValue,
    setDragging,
    setDragPercentage,
    withinOffsetParent,
  } = options;

  const element = nodeRef.current;
  if (!element) {
    return;
  }

  if (isDragStart) {
    // need to focus so that Chromium based browsers allow drag events. this
    // really appeared while trying to create a DnD tree
    element.focus({ preventScroll: true });

    if (!withinOffsetParent && !("changedTouches" in event)) {
      return;
    }

    // unlike the other flow, start dragging immediately so that you can trigger
    // a mousedown or touchstart event on the container element and drag until
    // the user lets go
    setDragging(true);
  }

  // firefox defaults to `document.body` while chrome will return `null`
  const container = element.offsetParent || document.body;
  if (!withinOffsetParent) {
    const dragPosition = getDragPosition({
      event,
      isRTL,
      reversed,
      vertical,
      container,
    });
    const nextValue = withinRange({
      min,
      max,
      value: dragPosition,
    });
    setValue(nextValue);

    return;
  }

  const { value, dragPercentage } = getRelativeDragPosition({
    min,
    max,
    rangeMin,
    rangeMax,
    step,
    event,
    isRTL,
    reversed,
    vertical,
    container,
  });

  setValue(value);
  setDragPercentage(dragPercentage);
};

/**
 * @internal
 * @since 6.0.0
 */
export interface DeserializeDraggableValueOptions extends MinMaxRange {
  item: string;
}

/**
 * @internal
 * @since 6.0.0
 */
export function deserializeDraggableValue(
  options: DeserializeDraggableValueOptions
): number {
  const { item, min, max } = options;

  const value = Number.parseFloat(item);
  if (Number.isNaN(item)) {
    return min;
  }

  return Math.max(min, Math.min(max, value));
}
