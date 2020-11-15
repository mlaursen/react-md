import { useCallback, useState } from "react";
import {
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_STEP,
} from "./constants";
import {
  DefinedSliderValueOptions,
  SimpleSliderControls,
  SimpleSliderDefaultValue,
  SimpleSliderValue,
  SliderValueOptions,
} from "./types";

export interface SimpleSliderRequiredProps
  extends SimpleSliderControls,
    DefinedSliderValueOptions {
  value: SimpleSliderValue;
}

export type SimpleSliderValueReturnType = readonly [
  SimpleSliderValue,
  SimpleSliderRequiredProps
];

/**
 * This hook is used to control the value and behavior of the `Slider` component
 * when only using one thumb. The first argument will contain the current slider
 * value while the second argument will be all the props required to control the
 * `Slider` component.
 *
 * @param defaultValue An optional default value to use for the slider. This will
 * default to the `min` option when undefined.
 * @param options An object containing the `min` and `max` values allowed for the
 * slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 */
export function useSimpleSlider(
  defaultValue?: SimpleSliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
  }: SliderValueOptions = {}
): SimpleSliderValueReturnType {
  const [value, setValue] = useState(defaultValue ?? min);
  const increment = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue + step)));
  }, [min, max, step]);
  const decrement = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue - step)));
  }, [min, max, step]);
  const minimum = useCallback(() => {
    setValue(min);
  }, [min]);
  const maximum = useCallback(() => {
    setValue(max);
  }, [max]);

  return [
    value,
    {
      min,
      max,
      step,
      value,
      increment,
      decrement,
      minimum,
      maximum,
      setValue,
    },
  ];
}
