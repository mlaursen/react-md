import type { MouseEvent, TouchEvent } from "react";

interface DragPositionOptions {
  event: globalThis.MouseEvent | globalThis.TouchEvent;
  isRTL: boolean;
  vertical: boolean;
  container: Element;
}

/**
 * @internal
 */
export const getDragPosition = (options: DragPositionOptions): number => {
  const { event, isRTL, vertical, container } = options;

  let clientPosition: number;
  const key = vertical ? "clientY" : "clientX";
  if ("clientX" in event) {
    clientPosition = event[key];
  } else {
    // this should pretty much always be defined
    clientPosition = event.changedTouches.item(0)?.[key] || 0;
  }

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
