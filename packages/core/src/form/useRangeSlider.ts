"use client";

import { useState } from "react";

import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import { type SliderValueOptions } from "./useSlider.js";

/**
 * @since 2.5.0
 * @since 6.0.0 Updated to use labeled tuple.
 */
export type RangeSliderValue = readonly [minValue: number, maxValue: number];

/**
 * @since 6.0.0
 */
export interface RangeSliderState {
  rangeValue: RangeSliderValue;
  setRangeValue: UseStateSetter<RangeSliderValue>;
}

/**
 * @since 6.0.0
 */
export interface RangeSliderOptions extends SliderValueOptions {
  /** @defaultValue `[min, max]` */
  defaultValue?: UseStateInitializer<RangeSliderValue>;
}

/**
 * @since 6.0.0
 */
export interface RangeSliderImplementation
  extends Required<SliderValueOptions>,
    RangeSliderState {}

/**
 * @example Range Slider Example
 * ```tsx
 * import { Fieldset } from "@react-md/core/form/Fieldset";
 * import { Form } from "@react-md/core/form/Form";
 * import { Legend } from "@react-md/core/form/Legend";
 * import { Slider } from "@react-md/core/form/Slider";
 * import { useRangeSlider } from "@react-md/core/form/useRangeSlider";
 * import type { ReactElement } from "react";
 * import { useId } from "react";
 *
 * function Example(): ReactElement {
 *   const slider = useRangeSlider({
 *     // these are the defaults and can be changed
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     defaultValue: [0, 100],
 *   });
 *
 *   // if you need access to the current value or manually change the value
 *   // yourself.
 *   const { rangeValue, setRangeValue } = slider;
 *   const [minPrice, maxPrice] = rangeValue;
 *
 *   return (
 *     <Form>
 *       <Fieldset>
 *         <Legend>Price Range</Legend>
 *         <Slider {...slider} />
 *       </Fieldset>
 *     </Form>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/slider|Slider Demos}
 * @see The `Slider` component for additional examples.
 * @since 2.5.0
 * @since 6.0.0 Now returns an object instead of an ordered tuple and only
 * return the `rangeValue` and `setRangeValue` instead of all the slider
 * functionality. In addition, the hook only accepts a single object argument.
 */
export function useRangeSlider(
  options: RangeSliderOptions = {}
): RangeSliderImplementation {
  const { min = 0, max = 100, step = 1, defaultValue } = options;
  const [rangeValue, setRangeValue] = useState<RangeSliderValue>(
    defaultValue ?? [min, max]
  );

  return {
    min,
    max,
    step,
    rangeValue,
    setRangeValue,
  };
}
