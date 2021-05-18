import { useCallback, useMemo, useRef, useState } from "react";
import { nearest } from "@react-md/utils";

import {
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_STEP,
} from "./constants";
import {
  DefinedSliderValueOptions,
  SliderControls,
  SliderDefaultValue,
  SliderValue,
  SliderStepOptions,
} from "./types";
import { getJumpValue, getSteps } from "./utils";

/**
 * @remarks \@since 2.5.0
 */
export interface SliderRequiredProps
  extends SliderControls,
    DefinedSliderValueOptions {
  /**
   * The current value of the slider.
   */
  value: SliderValue;
}

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 2.5.0
 */
export type SliderValueReturnType = readonly [SliderValue, SliderRequiredProps];

/**
 * @remarks \@since 2.5.0
 */
export interface UseSliderOptions extends SliderStepOptions {
  /**
   * An optional callback that will be triggered when the value has changed when
   * the `updateOn` behavior is set to `"blur"`. When the `updateOn` behavior is
   * set to `"change"` (default), this will do nothing since the return value
   * from the hook will always be the latest value.
   */
  onChange?(value: SliderValue): void;
}

/**
 * This hook is used to control the value and behavior of the `Slider`
 * component. The first argument will contain the current slider value while
 * the second argument will be all the props required to control the `Slider`
 * component.
 *
 * @param defaultValue - An optional default value to use for the slider. This
 * will default to the `min` option when undefined.
 * @param options - An object containing the `min` and `max` values allowed for
 * the slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 * @returns an ordered list containing the current value followed by the
 * `Slider` props
 * @remarks \@since 2.5.0
 */
export function useSlider(
  defaultValue?: SliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
    jump: propJump,
    updateOn = "change",
    onChange = noop,
  }: UseSliderOptions = {}
): SliderValueReturnType {
  const jump = useMemo(
    () => getJumpValue(min, max, step, propJump),
    [min, max, step, propJump]
  );

  // since the `currentValue` is a ref, this state is used to force a re-render
  // to get the updated value from the ref.
  const [, hack] = useState([]);
  const [value, setValue] = useState(defaultValue ?? min);
  const currentValue = useRef(value);

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

  const persist = useCallback(() => {
    if (currentValue.current === value) {
      return;
    }

    onChange(value);
    currentValue.current = value;
    hack([]);
  }, [onChange, value]);

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
    const nextValue = nearest(value, min, max, getSteps(min, max, step));
    currentValue.current = nextValue;
    setValue(nextValue);
  }

  if (updateOn === "change" && currentValue.current !== value) {
    currentValue.current = value;
  }

  return [
    currentValue.current,
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
      persist,
      setValue,
    },
  ];
}
