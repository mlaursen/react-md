"use client";
import { useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import type { SliderValueOptions } from "./useSlider";

/**
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Updated to use labeled tuple.
 */
export type RangeSliderValue = readonly [minValue: number, maxValue: number];

/**
 * @remarks \@since 6.0.0
 */
export interface RangeSliderState {
  rangeValue: RangeSliderValue;
  setRangeValue: UseStateSetter<RangeSliderValue>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface RangeSliderOptions extends SliderValueOptions {
  defaultValue?: UseStateInitializer<RangeSliderValue>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface RangeSliderImplementation
  extends Required<SliderValueOptions>,
    RangeSliderState {}

/**
 * @example
 * Range Slider Example
 * ```tsx
 * import { Fieldset, Form, Legend, Slider, useRangeSlider } from "@react-md/core";
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
 * @see The `Slider` component for additional examples.
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Now returns an object instead of an ordered tuple and only
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
