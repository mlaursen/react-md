import React, { useState, useCallback, useEffect } from "react";

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;
interface Options {
  defaultValue?: number;
  onChange?: ChangeEventHandler;
  min?: number;
  max?: number;
  step?: number;
}

type CurrentValue = number;

export interface NumberFieldProps {
  onChange: ChangeEventHandler;
  value: string;
  min?: number;
  max?: number;
  step?: number;
  type: "number";
}

type ReturnValue = [CurrentValue, NumberFieldProps];

function withinRange(
  value: number,
  min: number | undefined,
  max: number | undefined
): number {
  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}

export default function useNumberField({
  defaultValue = 0,
  onChange,
  min,
  max,
  step,
}: Options): ReturnValue {
  const [value, setValue] = useState(() => withinRange(defaultValue, min, max));

  useEffect(() => {
    const nextValue = withinRange(value, min, max);
    if (nextValue !== value) {
      setValue(nextValue);
    }

    // only want to trigger on min or max changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  const handleChange = useCallback<ChangeEventHandler>(
    (event) => {
      if (onChange) {
        onChange(event);
      }

      const currentValue = event.currentTarget.value;
      let nextValue =
        typeof step === "number" && parseInt(`${step}`, 10) === step
          ? parseFloat(currentValue)
          : parseInt(currentValue, 10);
      if (Number.isNaN(nextValue)) {
        nextValue = min === 0 || min ? min : value;
      }

      setValue(withinRange(nextValue, min, max));
    },
    [onChange, min, max, step, value]
  );

  return [
    value,
    { onChange: handleChange, value: `${value}`, min, max, type: "number" },
  ];
}
