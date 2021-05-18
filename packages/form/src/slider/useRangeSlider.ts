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

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @remarks \@since 2.5.0
 */
interface UpdateOptions {
  /**
   * The thumb index that is being updated.
   */
  index: ThumbIndex;

  type:
    | "increment"
    | "decrement"
    | "min"
    | "max"
    | "increment-jump"
    | "decrement-jump";
}

/**
 * @remarks \@since 2.5.0
 */
export interface UseRangeSliderOptions extends SliderStepOptions {
  /**
   * An optional callback that will be triggered when the value has changed when
   * the `updateOn` behavior is set to `"blur"`. When the `updateOn` behavior is
   * set to `"change"` (default), this will do nothing since the return value
   * from the hook will always be the latest value.
   */
  onChange?(value: RangeSliderValue): void;
}

/**
 * @remarks \@since 2.5.0
 */
export interface RangeSliderRequiredProps
  extends RangeSliderControls,
    DefinedSliderValueOptions {
  /**
   * The current value of the slider.
   */
  value: RangeSliderValue;
}

/**
 * @remarks \@since 2.5.0
 */
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
 * @param defaultValue - An optional default value to use. When omitted, this
 * will be the `[min, max]` values
 * @param options - An object containing the `min` and `max` values allowed for
 * the slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 * @returns an ordered list containing the current value followed by the
 * `RangeSlider` props
 * @remarks \@since 2.5.0
 */
export function useRangeSlider(
  defaultValue?: RangeSliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
    jump: propJump,
    updateOn = "change",
    onChange = noop,
  }: UseRangeSliderOptions = {}
): RangeSliderValueReturnType {
  const jump = useMemo(
    () => getJumpValue(min, max, step, propJump),
    [min, max, step, propJump]
  );

  // since the `currentValue` is a ref, this state is used to force a re-render
  // to get the updated value from the ref.
  const [, hack] = useState([]);
  const [value, setValue] = useState<RangeSliderValue>(
    defaultValue ?? [min, max]
  );
  const currentValue = useRef(value);

  const update = useCallback(
    ({ index, type }: UpdateOptions) => {
      /* istanbul ignore next */
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

        switch (type) {
          case "min":
            value = minValue;
            break;
          case "max":
            value = maxValue;
            break;
          case "increment":
            value += step;
            break;
          case "decrement":
            value -= step;
            break;
          case "increment-jump":
            value += jump;
            break;
          case "decrement-jump":
            value -= jump;
            break;
        }

        value = Math.max(minValue, Math.min(maxValue, value));

        return index === 0 ? [value, thumb2Value] : [thumb1Value, value];
      });
    },
    [jump, max, min, step]
  );
  const increment = useCallback(
    (index: ThumbIndex) => update({ index, type: "increment" }),
    [update]
  );
  const incrementJump = useCallback(
    (index: ThumbIndex) => update({ index, type: "increment-jump" }),
    [update]
  );
  const decrement = useCallback(
    (index: ThumbIndex) => update({ index, type: "decrement" }),
    [update]
  );
  const decrementJump = useCallback(
    (index: ThumbIndex) => update({ index, type: "decrement-jump" }),
    [update]
  );
  const minimum = useCallback(
    (index: ThumbIndex) => update({ index, type: "min" }),
    [update]
  );
  const maximum = useCallback(
    (index: ThumbIndex) => update({ index, type: "max" }),
    [update]
  );

  const persist = useCallback(() => {
    const [prev1, prev2] = currentValue.current;
    if (prev1 === value[0] && prev2 === value[1]) {
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
    const steps = getSteps(min, max, step);
    const nextValue: RangeSliderValue = [
      nearest(value[0], min, max, steps),
      nearest(value[1], min, max, steps),
    ];
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
      minimum,
      maximum,
      increment,
      incrementJump,
      decrement,
      decrementJump,
      persist,
      setValue,
    },
  ];
}
