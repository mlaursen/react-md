import type { MouseEvent, RefObject, TouchEvent } from "react";
import type { ClientPositionEvent, ClientPositionOptions } from "../utils";
import {
  getClientPosition,
  getRangeSteps,
  nearest,
  withinRange,
} from "../utils";

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

/**
 * @internal
 */
interface RelativeDragPositionOptions extends DragPositionOptions {
  min: number;
  max: number;
  step: number;
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
interface UpdateDragPositionOptions
  extends Omit<RelativeDragPositionOptions, "container"> {
  event: ClientPositionEvent;
  nodeRef: RefObject<HTMLElement>;
  focus?: boolean;
  rangeMin: number;
  rangeMax: number;
  isDragStart: boolean;
  setValue(value: number): void;
  setDragging(dragging: boolean): void;
  setDragPercentage(value: number): void;
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
    min: rangeMin,
    max: rangeMax,
    step,
    event,
    isRTL,
    vertical,
    container,
  });

  setValue(value);
  setDragPercentage(dragPercentage);
};
