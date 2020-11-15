import { useCallback, useState } from "react";

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
  SliderValueOptions,
  ThumbIndex,
} from "./types";

export interface RangeSliderRequiredProps
  extends RangeSliderControls,
    DefinedSliderValueOptions {
  value: RangeSliderValue;
}

export type RangeSliderValueReturnType = readonly [
  RangeSliderValue,
  RangeSliderRequiredProps
];

/**
 * This hook is used to controlt he values and behavior for the `Slider`
 * component when acting as a range slider.
 */
export function useRangeSlider(
  defaultValue?: RangeSliderDefaultValue,
  {
    min = DEFAULT_SLIDER_MIN,
    max = DEFAULT_SLIDER_MAX,
    step = DEFAULT_SLIDER_STEP,
  }: SliderValueOptions = {}
): RangeSliderValueReturnType {
  const [value, setValue] = useState<RangeSliderValue>(
    defaultValue ?? [min, max]
  );
  const update = useCallback(
    (index: ThumbIndex, increment: boolean, minMax: boolean) => {
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
            Math.min(maxValue, value + (increment ? step : -step))
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
  const decrement = useCallback(
    (index: ThumbIndex) => update(index, false, false),
    [update]
  );
  const minimum = useCallback(
    (index: ThumbIndex) => update(index, true, true),
    [update]
  );
  const maximum = useCallback(
    (index: ThumbIndex) => update(index, false, true),
    [update]
  );

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
      decrement,
      setValue,
    },
  ];
}
