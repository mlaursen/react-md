import { nearest } from "@react-md/utils";

import {
  DefinedSliderValueOptions,
  RangeSliderControls,
  RangeSliderValue,
  SimpleSliderValue,
  SimpleSliderControls as SliderControls,
} from "./types";

export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

export const isMouseEvent = (
  event: SliderDragEvent
): event is MouseEvent & { type: "mousedown" | "mousemove" | "mouseup" } =>
  event.type === "mousedown" ||
  event.type === "mousemove" ||
  event.type === "mouseup";

export const isTouchEvent = (
  event: SliderDragEvent
): event is TouchEvent & { type: "touchstart" | "touchmove" | "touchend" } =>
  event.type === "touchstart" ||
  event.type === "touchmove" ||
  event.type === "touchend";

export interface SimpleSliderControls extends SliderControls {
  value: SimpleSliderValue;
}

export interface ComplexSliderControls extends RangeSliderControls {
  value: RangeSliderValue;
}

export type CombinedSliderControls =
  | SimpleSliderControls
  | ComplexSliderControls;

export const isRangeSlider = (
  controls: CombinedSliderControls
): controls is ComplexSliderControls => Array.isArray(controls.value);

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
  const steps = Math.abs(maxValue - minValue / step);
  const value = percentageDragged * range + min;
  const rounded = nearest(value, minValue, maxValue, steps);

  if (!vertical && isRtl) {
    return steps - rounded;
  }

  return rounded;
};
