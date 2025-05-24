"use client";

import { useState } from "react";

import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import { getRangeDefaultValue } from "../utils/getRangeDefaultValue.js";

/**
 * @since 2.5.0
 */
export interface SliderValueOptions {
  /**
   * The min value for the slider.
   *
   * @defaultValue `0`
   */
  min?: number;

  /**
   * The max value for the slider.
   *
   * @defaultValue `100`
   */
  max?: number;

  /**
   * A positive number representing the value to "jump" while incrementing or
   * decrementing the slider's value. This should normally stay as the default
   * value of `1`, but can also be decimal values if needed.
   *
   * @defaultValue `1`
   */
  step?: number;
}

/**
 * @since 6.0.0
 */
export interface SliderState {
  value: number;
  setValue: UseStateSetter<number>;
}

/**
 * @since 6.0.0
 */
export interface SliderImplementation
  extends Required<SliderValueOptions>,
    SliderState {}

/**
 * @since 6.0.0
 */
export interface SliderOptions extends SliderValueOptions {
  /** @defaultValue `(max - min ) / 2` */
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @example Simple Example
 * ```tsx
 * import { Form } from "@react-md/core/form/Form";
 * import { Slider } from "@react-md/core/form/Slider";
 * import { useSlider } from "@react-md/core/form/useSlider";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const slider = useSlider({
 *     // these are the defaults and can be changed
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     defaultValue: 50,
 *   });
 *
 *   // if you need access to the current value or manually change the value
 *   // yourself.
 *   const { value, setValue } = slider;
 *
 *   return (
 *     <Form>
 *       <Slider {...slider} aria-label="Volume" />
 *     </Form>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/slider | Slider Demos}
 * @see The `Slider` component for additional examples.
 * @since 2.5.0
 * @since 6.0.0 Now returns an object instead of an ordered tuple and only
 * return the `value` and `setValue` instead of all the slider functionality. In
 * addition, the hook only accepts a single object argument.
 */
export function useSlider(options: SliderOptions = {}): SliderImplementation {
  const { min = 0, max = 100, step = 1, defaultValue } = options;
  const [value, setValue] = useState(
    getRangeDefaultValue({
      min,
      max,
      step,
      defaultValue,
    })
  );

  return {
    min,
    max,
    step,
    value,
    setValue,
  };
}
