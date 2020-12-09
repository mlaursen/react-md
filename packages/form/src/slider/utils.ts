import { getPercentage, nearest } from "@react-md/utils";

import {
  DefinedSliderValueOptions,
  RangeSliderControls,
  RangeSliderValue,
  SliderControls,
  SliderValue,
  ThumbIndex,
} from "./types";

/**
 * Gets the number of steps in the allowed range of values.
 *
 * @internal
 * @since 2.5.0
 */
export const getSteps = (min: number, max: number, step: number): number =>
  Math.abs(max - min) / step;

/**
 *
 * @internal
 * @since 2.5.0
 */
export const getJumpValue = (
  min: number,
  max: number,
  step: number,
  jump: number | undefined
): number => {
  const steps = getSteps(min, max, step);
  const value = jump ?? (steps / 10) * step;
  if (Number.isInteger(step)) {
    return Math.ceil(value);
  }

  return value;
};

/**
 * @internal
 * @since 2.5.0
 */
export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

/**
 * @internal
 * @since 2.5.0
 */
export const isMouseEvent = (
  event: SliderDragEvent
): event is MouseEvent & { type: "mousedown" | "mousemove" | "mouseup" } =>
  event.type === "mousedown" ||
  event.type === "mousemove" ||
  event.type === "mouseup";

/**
 * @internal
 * @since 2.5.0
 */
export const isTouchEvent = (
  event: SliderDragEvent
): event is TouchEvent & { type: "touchstart" | "touchmove" | "touchend" } =>
  event.type === "touchstart" ||
  event.type === "touchmove" ||
  event.type === "touchend";

/**
 * @internal
 * @since 2.5.0
 */
export interface SimpleSliderControls extends SliderControls {
  value: SliderValue;
}

/**
 * @internal
 * @since 2.5.0
 */
export interface ComplexSliderControls extends RangeSliderControls {
  value: RangeSliderValue;
}

/**
 * @internal
 * @since 2.5.0
 */
export type CombinedSliderControls =
  | SimpleSliderControls
  | ComplexSliderControls;

/**
 * @internal
 * @since 2.5.0
 */
export const isRangeSlider = (
  controls: CombinedSliderControls
): controls is ComplexSliderControls => Array.isArray(controls.value);

/**
 * @internal
 * @since 2.5.0
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
 * @since 2.5.0
 * @internal
 */
export interface SliderDragValue {
  value: number;
  current: number;
}

/**
 * This is used to get the next value for the slider while being dragged via
 * mouse or touch.
 *
 * @internal
 * @since 2.5.0
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
}: SliderDragValues): SliderDragValue => {
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
  const rounded = nearest(value, minValue, maxValue, steps, range);

  return {
    value: isRtl && !vertical ? steps - rounded : rounded,
    current: percentageDragged,
  };
};

/**
 * @since 2.5.0
 * @internal
 */
interface DragPercentageOptions {
  min: number;
  max: number;
  thumb1Value: number;
  thumb2Value?: number;
  dragging: boolean;
  dragValue: number;
  draggingIndex: ThumbIndex | null;
}

interface DragPercentage {
  thumb1Percentage: string;
  thumb2Percentage: string | undefined;
}

/**
 * @since 2.5.0
 * @internal
 */
export const getDragPercentage = ({
  min,
  max,
  dragging,
  dragValue,
  draggingIndex,
  thumb1Value,
  thumb2Value,
}: DragPercentageOptions): DragPercentage => {
  const thumb1Percentage =
    dragging && draggingIndex === 0
      ? dragValue
      : getPercentage(min, max, thumb1Value);

  let thumb2Percentage: number | undefined;
  if (typeof thumb2Value === "number") {
    thumb2Percentage =
      dragging && draggingIndex === 1
        ? dragValue
        : getPercentage(min, max, thumb2Value);
  }

  return {
    thumb1Percentage: `${thumb1Percentage * 100}%`,
    thumb2Percentage:
      typeof thumb2Percentage === "number"
        ? `${thumb2Percentage * 100}%`
        : undefined,
  };
};
