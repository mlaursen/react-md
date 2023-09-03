import { fireEvent } from "@testing-library/dom";
import type { MouseEvent } from "react";
import { wait } from "../utils/wait.js";

interface XYCoords {
  x: number;
  y: number;
}

interface BaseDragOptions {
  to?: XYCoords | Element;
  delta?: XYCoords;
  steps?: number;
  duration?: number;
}

type DragOptions = BaseDragOptions &
  ({ to: XYCoords | Element; delta?: never } | { delta: XYCoords; to?: never });

const getElementClientCenter = (element: Element): XYCoords => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

const getCoords = (elementOrCoords: Element | XYCoords): XYCoords =>
  "x" in elementOrCoords && "y" in elementOrCoords
    ? elementOrCoords
    : getElementClientCenter(elementOrCoords);

/**
 * This is internal for now. No idea if it's actually worthwhile though since
 * you have to mock the `getBoundingClientRect()` to work.
 *
 * @internal
 * @see https://github.com/testing-library/testing-library-docs/blob/c20f8a8931e9f0a158fda9f01bbea8cb45ed1651/docs/example-drag.mdx
 */
export async function drag(
  element: Element,
  options: DragOptions
): Promise<void> {
  const { delta, to: inTo, steps = 20, duration = 500 } = options;
  const from = getElementClientCenter(element);
  const to = delta
    ? {
        x: from.x + delta.x,
        y: from.y + delta.y,
      }
    : getCoords(inTo);

  const step: XYCoords = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const currentEvent = {
    clientX: from.x,
    clientY: from.y,
    button: 0,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
  } satisfies Partial<MouseEvent>;

  fireEvent.mouseEnter(element, currentEvent);
  fireEvent.mouseOver(element, currentEvent);
  fireEvent.mouseMove(element, currentEvent);
  fireEvent.mouseDown(element, currentEvent);
  fireEvent.dragStart(element, currentEvent);

  const delay = duration / steps;
  for (let i = 0; i < steps; i++) {
    currentEvent.clientX += step.x;
    currentEvent.clientY += step.y;
    await wait(delay);
    fireEvent.mouseMove(element, currentEvent);
  }

  fireEvent.mouseUp(element, currentEvent);
  fireEvent.dragEnd(element, currentEvent);
}
