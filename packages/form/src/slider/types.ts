import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react";
import { PropsWithRef } from "@react-md/utils";

/**
 * @remarks \@since 2.5.0
 */
export type ThumbIndex = 0 | 1;

/**
 * @remarks \@since 2.5.0
 */
export type SliderThumbIndex = ThumbIndex | null;

/**
 * @remarks \@since 2.5.0
 */
export type SliderDragEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

/**
 * @remarks \@since 2.5.0
 */
export type SliderDraggingBy = "mouse" | "touch" | null;

/**
 * @remarks \@since 2.5.0
 */
export type SliderValue = number;

/**
 * @remarks \@since 2.5.0
 */
export type SliderDefaultValue = SliderValue | (() => SliderValue);

/**
 * An object containing the functions required to update the `Slider`'s value
 * when the user interacts with the slider. These functions are provided by the
 * `useSlider` hook.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export interface SliderControls {
  persist(): void;
  minimum(): void;
  maximum(): void;
  increment(): void;
  incrementJump(): void;
  decrement(): void;
  decrementJump(): void;
  setValue: Dispatch<SetStateAction<SliderValue>>;
}

/**
 * @remarks \@since 2.5.0
 */
export type RangeSliderValue = readonly [number, number];

/**
 * @remarks \@since 2.5.0
 */
export type RangeSliderDefaultValue =
  | RangeSliderValue
  | (() => RangeSliderValue);

/**
 * An object containing the functions required to update the `RangeSlider`'s
 * value when the user interacts with the slider. These functions are provided by
 * the `useRangeSlider` hook.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export interface RangeSliderControls {
  persist(): void;
  minimum(index: ThumbIndex): void;
  maximum(index: ThumbIndex): void;
  increment(index: ThumbIndex): void;
  incrementJump(index: ThumbIndex): void;
  decrement(index: ThumbIndex): void;
  decrementJump(index: ThumbIndex): void;
  setValue: Dispatch<SetStateAction<RangeSliderValue>>;
}

/**
 * @remarks \@since 2.5.0
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
 * @remarks \@since 2.5.0
 */
export interface SliderStepOptions extends SliderValueOptions {
  /**
   * An optional amount to jump by when using the `PageUp` or `PageDown` keys.
   * When this is omitted, it will try to default to 10% of the full range to
   * the nearest step
   */
  jump?: number;

  /**
   * Determines when the `value` should be updated from the `useSlider` and
   * `useRangeSlider` hooks. When this is set to `"change"`, the `value` will
   * update immediately as the user interacts with the slider. When this is set
   * to `"blur"`, the `value` will only be updated once the user has tabbed away
   * from the slider or completed the drag via mouse/touch.
   *
   * It is recommended to set this to `"blur"` when the value does not need to
   * be used immediately.
   */
  updateOn?: "change" | "blur";
}

/**
 * @remarks \@since 2.5.0
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
 * @remarks \@since 2.5.0
 */
export interface SliderThumbPresentation {
  /**
   * Boolean if the slider should act as a discrete slider which will render a
   * tooltip above the thumb while dragging to visualize the current value for
   * the slider.
   */
  discrete?: boolean;

  /**
   * The duration that it takes for the slider animation to complete for a new
   * value. This is just used to help make things look smoother while dragging
   * compared to jumping to new values.
   */
  animationDuration?: number;

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
 * @remarks \@since 2.5.0
 */
export interface SliderThumbOptions
  extends Omit<SliderValueOptions, "step">,
    SliderPresentation,
    SliderThumbPresentation {}

/**
 * @remarks \@since 2.5.0
 */
export type DefinedSliderValueOptions = Required<SliderValueOptions>;

/**
 * @remarks \@since 2.5.0
 */
export type SliderEventHandlerNames =
  | "onBlur"
  | "onKeyDown"
  | "onMouseDown"
  | "onTouchStart";

/**
 * @remarks \@since 2.5.0
 */
export type SliderEventHandlers = Pick<
  HTMLAttributes<HTMLSpanElement>,
  SliderEventHandlerNames
>;

/**
 * @remarks \@since 2.5.0
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
 * @remarks \@since 2.5.0
 */
export interface BaseSliderProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderAddons,
    SliderLabelProps,
    SliderPresentation,
    SliderThumbPresentation {
  /**
   * An id for the slider and different parts which is required for a11y.
   */
  baseId: string;
}

/**
 * @remarks \@since 2.5.0
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
