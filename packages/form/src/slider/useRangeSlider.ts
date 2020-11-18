import { useCallback, useMemo, useRef, useState } from "react";
import { nearest } from "@react-md/utils";

import {
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  DEFAULT_SLIDER_STEP,
} from "./constants";
import {
  DefinedSliderValueOptions,
  RangeSliderControls,
  RangeSliderDefaultValue,
  RangeSliderValue,
  SliderStepOptions,
  ThumbIndex,
} from "./types";
import { getJumpValue, getSteps } from "./utils";

export interface RangeSliderRequiredProps
  extends RangeSliderControls,
    DefinedSliderValueOptions {
  /**
   * The current value of the slider.
   */
  value: RangeSliderValue;
}

export type RangeSliderValueReturnType = readonly [
  RangeSliderValue,
  RangeSliderRequiredProps
];

/**
 * This hook is used to control the value and behavior of the `RangeSlider`
 * component. The first argument will contain the current slider value while the
 * second argument will be all the props required to control the `RangeSlider`
 * component.
 *
 * @param defaultValue An optional default value to use. When omitted, this will
 * be the `[min, max]` values
 * @param options An object containing the `min` and `max` values allowed for the
 * slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 * @return an ordered list containing the current value followed by the
 * `RangeSlider` props
 */
export function useRangeSlider(
  defaultValue?: RangeSliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
    jump: propJump,
  }: SliderStepOptions = {}
): RangeSliderValueReturnType {
  const jump = useMemo(() => getJumpValue(min, max, step, propJump), [
    min,
    max,
    step,
    propJump,
  ]);
  const [value, setValue] = useState<RangeSliderValue>(
    defaultValue ?? [min, max]
  );
  const update = useCallback(
    (index: ThumbIndex, increment: boolean, minMax: boolean, amount = step) => {
      if (process.env.NODE_ENV !== "production") {
        if (index !== 0 && index !== 1) {
          throw new TypeError("Thumb index must be 0 or 1.");
        }
      }

      setValue(([thumb1Value, thumb2Value]) => {
        let value: number;
        let minValue = min;
        let maxValue = max;
        if (index === 0) {
          value = thumb1Value;
          maxValue = thumb2Value - step;
        } else {
          value = thumb2Value;
          minValue = thumb1Value + step;
        }

        if (minMax) {
          value = increment ? minValue : maxValue;
        } else {
          value = Math.max(
            minValue,
            Math.min(maxValue, value + (increment ? amount : -amount))
          );
        }

        return index === 0 ? [value, thumb2Value] : [thumb1Value, value];
      });
    },
    [max, min, step]
  );
  const increment = useCallback(
    (index: ThumbIndex) => update(index, true, false),
    [update]
  );
  const incrementJump = useCallback(
    (index: ThumbIndex) => update(index, true, false, jump),
    [update, jump]
  );
  const decrement = useCallback(
    (index: ThumbIndex) => update(index, false, false),
    [update]
  );
  const decrementJump = useCallback(
    (index: ThumbIndex) => update(index, false, false, jump),
    [update, jump]
  );
  const minimum = useCallback(
    (index: ThumbIndex) => update(index, true, true),
    [update]
  );
  const maximum = useCallback(
    (index: ThumbIndex) => update(index, false, true),
    [update]
  );

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
    const steps = getSteps(min, max, step);
    setValue([
      nearest(min, max, value[0], steps),
      nearest(min, max, value[1], steps),
    ]);
  }

  return [
    value,
    {
      min,
      max,
      step,
      value,
      minimum,
      maximum,
      increment,
      incrementJump,
      decrement,
      decrementJump,
      setValue,
    },
  ];
}
