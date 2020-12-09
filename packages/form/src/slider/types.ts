import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react";
import { PropsWithRef } from "@react-md/utils";

/**
 * @since 2.5.0
 */
export type ThumbIndex = 0 | 1;

/**
 * @since 2.5.0
 */
export type SliderThumbIndex = ThumbIndex | null;

/**
 * @since 2.5.0
 */
export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

/**
 * @since 2.5.0
 */
export type SliderDraggingBy = "mouse" | "touch" | null;

/**
 * @since 2.5.0
 */
export type SliderValue = number;

/**
 * @since 2.5.0
 */
export type SliderDefaultValue = SliderValue | (() => SliderValue);

/**
 * An object containing the functions required to update the `Slider`'s value
 * when the user interacts with the slider. These functions are provided by the
 * `useSlider` hook.
 *
 * @since 2.5.0
 * @internal
 */
export interface SliderControls {
  minimum(): void;
  maximum(): void;
  increment(): void;
  incrementJump(): void;
  decrement(): void;
  decrementJump(): void;
  setValue: Dispatch<SetStateAction<SliderValue>>;
}

/**
 * @since 2.5.0
 */
export type RangeSliderValue = readonly [number, number];

/**
 * @since 2.5.0
 */
export type RangeSliderDefaultValue =
  | RangeSliderValue
  | (() => RangeSliderValue);

/**
 * An object containing the functions required to update the `RangeSlider`'s
 * value when the user interacts with the slider. These functions are provided by
 * the `useRangeSlider` hook.
 *
 * @since 2.5.0
 * @internal
 */
export interface RangeSliderControls {
  minimum(index: ThumbIndex): void;
  maximum(index: ThumbIndex): void;
  increment(index: ThumbIndex): void;
  incrementJump(index: ThumbIndex): void;
  decrement(index: ThumbIndex): void;
  decrementJump(index: ThumbIndex): void;
  setValue: Dispatch<SetStateAction<RangeSliderValue>>;
}

/**
 * @since 2.5.0
 */
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

/**
 * @since 2.5.0
 */
export interface SliderStepOptions extends SliderValueOptions {
  /**
   * An optional amount to jump by when using the `PageUp` or `PageDown` keys.
   * When this is omitted, it will try to default to 10% of the full range to
   * the nearest step
   */
  jump?: number;
}

/**
 * @since 2.5.0
 */
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

/**
 * @since 2.5.0
 */
export interface SliderThumbOptions
  extends Omit<SliderValueOptions, "step">,
    SliderPresentation {
  /**
   * A function that is used to help with accessibility by creating a better
   * value string if just a number isn't representative enough of your range.
   *
   * Example:
   *
   * ```tsx
   * const [value, controls] = useSlider(0, {
   *   // format to be `$100`, etc
   *   getValueText: value => `$${value}`,
   * });
   *
   * return <Slider baseId="price-slider" label="Price" {...controls} />;
   * ```
   */
  getValueText?(value: number): string;
}

/**
 * @since 2.5.0
 */
export type DefinedSliderValueOptions = Required<SliderValueOptions>;

/**
 * @since 2.5.0
 */
export type SliderEventHandlerNames =
  | "onKeyDown"
  | "onMouseDown"
  | "onTouchStart";

/**
 * @since 2.5.0
 */
export type SliderEventHandlers = Pick<
  HTMLAttributes<HTMLSpanElement>,
  SliderEventHandlerNames
>;

/**
 * @since 2.5.0
 */
export interface SliderAddons {
  /**
   * An optional addon to render before the slider's track. This can be anything
   * and will be wrapped in the `TextIconSpacing` component from
   * `@react-md/icon`.
   *
   * When the `vertical` prop is enabled, the addon will appear underneath the
   * track.
   */
  beforeAddon?: ReactNode;

  /**
   * An optional addon to render after the slider's track. This can be anything
   * and will be wrapped in the `TextIconSpacing` component from
   * `@react-md/icon`.
   *
   * When the `vertical` prop is enabled, the addon will appear above the track.
   */
  afterAddon?: ReactNode;
}

/**
 * These are the shared and common props required for both the `Slider` and
 * `RangeSlider` components.
 *
 * @since 2.5.0
 */
export interface BaseSliderProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderPresentation,
    SliderAddons,
    SliderLabelProps,
    Pick<SliderThumbOptions, "getValueText"> {
  /**
   * An id for the slider and different parts which is required for a11y.
   */
  baseId: string;

  /**
   * The duration that it takes for the slider animation to complete for a new
   * value. This is just used to help make things look smoother while dragging
   * comapred to jumping to new values.
   */
  animationDuration?: number;
}

/**
 * @since 2.5.0
 */
export interface SliderLabelProps {
  /**
   * An optional label to display with the slider. This should normally be a
   * short (1-4 word) description for this slider.
   */
  label?: ReactNode;

  /**
   * Optional props to pass to the component wrapping the `label` content.
   */
  labelProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}
