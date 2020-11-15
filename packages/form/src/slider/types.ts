import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export type ThumbIndex = 0 | 1;
export type SliderThumbIndex = ThumbIndex | null;
export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;
export type SliderDraggingBy = "mouse" | "touch" | null;

export type SimpleSliderValue = number;
export type SimpleSliderDefaultValue =
  | SimpleSliderValue
  | (() => SimpleSliderValue);

export interface SimpleSliderControls {
  minimum(): void;
  maximum(): void;
  increment(): void;
  decrement(): void;
  setValue: Dispatch<SetStateAction<SimpleSliderValue>>;
}

export type RangeSliderValue = readonly [number, number];
export type RangeSliderDefaultValue =
  | RangeSliderValue
  | (() => RangeSliderValue);

export interface RangeSliderControls {
  minimum(index: ThumbIndex): void;
  maximum(index: ThumbIndex): void;
  increment(index: ThumbIndex): void;
  decrement(index: ThumbIndex): void;
  setValue: Dispatch<SetStateAction<RangeSliderValue>>;
}

export interface SliderValueOptions {
  /**
   * The min value for the slider.
   */
  min?: number;

  /**
   * The max value for the slider.
   */
  max?: number;

  /**
   * A positive number representing the value to "jump" while incrementing or
   * decrementing the slider's value. This should normally stay as the default
   * value of `1`, but can also be decimal values if needed.
   */
  step?: number;
}

export interface SliderPresentation {
  /**
   * Boolean if the slider is rendered vertically instead of horizontally.
   */
  vertical?: boolean;

  /**
   * Boolean if the slider is disabled and the values cannot be changed.
   */
  disabled?: boolean;
}

export interface SliderThumbOptions
  extends Omit<SliderValueOptions, "step">,
    SliderPresentation {
  /**
   * Boolean if the dense spec has been applied.
   */
  dense?: boolean;

  /**
   * A function that is used to help with accessibility by creating a better
   * value string if just a number isn't representative enough of your range.
   */
  getValueText?(value: number): string;
}

export type DefinedSliderValueOptions = Required<SliderValueOptions>;
export type SliderEventHandlerNames =
  | "onKeyDown"
  | "onMouseDown"
  | "onTouchStart";

export type SliderEventHandlers = Pick<
  HTMLAttributes<HTMLSpanElement>,
  SliderEventHandlerNames
>;

/**
 * These are the shared and common props required for both the `SimpleSlider` and
 * `RangeSlider` components.
 */
export interface SliderProps
  extends SliderPresentation,
    HTMLAttributes<HTMLSpanElement> {
  /**
   * An id for the slider and different parts which is required for a11y.
   */
  id: string;

  /**
   * The duration that it takes for the slider animation to complete for a new
   * value. This is just used to help make things look smoother while dragging
   * comapred to jumping to new values.
   */
  animationDuration?: number;
}
