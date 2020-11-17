import { nearest } from "@react-md/utils";

import {
  DefinedSliderValueOptions,
  RangeSliderControls,
  RangeSliderValue,
  SimpleSliderControls as SliderControls,
  SimpleSliderValue,
} from "./types";

/**
 * Gets the number of steps in the allowed range of values.
 *
 * @internal
 */
export const getSteps = (min: number, max: number, step: number): number =>
  Math.abs(max - min) / step;

/**
 * @internal
 */
export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

/**
 * @internal
 */
export const isMouseEvent = (
  event: SliderDragEvent
): event is MouseEvent & { type: "mousedown" | "mousemove" | "mouseup" } =>
  event.type === "mousedown" ||
  event.type === "mousemove" ||
  event.type === "mouseup";

/**
 * @internal
 */
export const isTouchEvent = (
  event: SliderDragEvent
): event is TouchEvent & { type: "touchstart" | "touchmove" | "touchend" } =>
  event.type === "touchstart" ||
  event.type === "touchmove" ||
  event.type === "touchend";

/**
 * @internal
 */
export interface SimpleSliderControls extends SliderControls {
  value: SimpleSliderValue;
}

/**
 * @internal
 */
export interface ComplexSliderControls extends RangeSliderControls {
  value: RangeSliderValue;
}

/**
 * @internal
 */
export type CombinedSliderControls =
  | SimpleSliderControls
  | ComplexSliderControls;

/**
 * @internal
 */
export const isRangeSlider = (
  controls: CombinedSliderControls
): controls is ComplexSliderControls => Array.isArray(controls.value);

/**
 * @internal
 */
export interface SliderDragValues extends DefinedSliderValueOptions {
  clientX: number;
  clientY: number;
  top: number;
  height: number;
  left: number;
  width: number;
  isRtl: boolean;
  vertical: boolean;
  minValue: number;
  maxValue: number;
}

/**
 * This is used to get the next value for the slider while being dragged via
 * mouse or touch.
 *
 * @internal
 */
export const getDragValue = ({
  min,
  max,
  step,
  vertical,
  clientX,
  clientY,
  left,
  top,
  height,
  width,
  isRtl,
  minValue,
  maxValue,
}: SliderDragValues): number => {
  const sliderSize = vertical ? height : width;
  const sliderPosition = vertical ? top + height : left;
  const cursorPosition = vertical ? clientY : clientX;
  const difference = vertical
    ? sliderPosition - cursorPosition
    : cursorPosition - sliderPosition;

  const distanceDragged = Math.min(Math.max(0, difference), sliderSize);
  const percentageDragged = distanceDragged / sliderSize;
  const range = max - min;
  const steps = getSteps(min, max, step);
  const value = percentageDragged * range + min;
  const rounded = nearest(value, minValue, maxValue, steps);

  if (!vertical && isRtl) {
    return steps - rounded;
  }

  return rounded;
};
