import { useCallback, useMemo, useRef, useState } from "react";
import { nearest } from "@react-md/utils";

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
  SliderStepOptions,
} from "./types";
import { getJumpValue, getSteps } from "./utils";

/**
 * @since 2.5.0
 */
export interface SimpleSliderRequiredProps
  extends SimpleSliderControls,
    DefinedSliderValueOptions {
  /**
   * The current value of the slider.
   */
  value: SimpleSliderValue;
}

/**
 * @since 2.5.0
 */
export type SimpleSliderValueReturnType = readonly [
  SimpleSliderValue,
  SimpleSliderRequiredProps
];

/**
 * This hook is used to control the value and behavior of the `SimpleSlider`
 * component. The first argument will contain the current slider value while the
 * second argument will be all the props required to control the `SimpleSlider`
 * component.
 *
 * @param defaultValue An optional default value to use for the slider. This will
 * default to the `min` option when undefined.
 * @param options An object containing the `min` and `max` values allowed for the
 * slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 * @return an ordered list containing the current value followed by the
 * `SimpleSlider` props
 * @since 2.5.0
 */
export function useSimpleSlider(
  defaultValue?: SimpleSliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
    jump: propJump,
  }: SliderStepOptions = {}
): SimpleSliderValueReturnType {
  const jump = useMemo(() => getJumpValue(min, max, step, propJump), [
    min,
    max,
    step,
    propJump,
  ]);

  const [value, setValue] = useState(defaultValue ?? min);
  const increment = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue + step)));
  }, [min, max, step]);
  const incrementJump = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue + jump)));
  }, [min, max, jump]);
  const decrement = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue - step)));
  }, [min, max, step]);
  const decrementJump = useCallback(() => {
    setValue((prevValue) => Math.max(min, Math.min(max, prevValue - jump)));
  }, [min, max, jump]);
  const minimum = useCallback(() => {
    setValue(min);
  }, [min]);
  const maximum = useCallback(() => {
    setValue(max);
  }, [max]);

  const prev = useRef({ min, max, step });
  if (
    prev.current.min !== min ||
    prev.current.max !== max ||
    prev.current.step !== step
  ) {
    // ensure that if the `min`, `max`, or `step` value changes that the value
    // is updated as well. Without this, there will be a runtime error if the
    // value is not within the new range.
    prev.current = { min, max, step };
    setValue(nearest(min, max, value, getSteps(min, max, step)));
  }

  return [
    value,
    {
      min,
      max,
      step,
      value,
      increment,
      incrementJump,
      decrement,
      decrementJump,
      minimum,
      maximum,
      setValue,
    },
  ];
}
