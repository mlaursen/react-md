import React, { ReactElement, useRef, useState } from "react";
import {
  SimpleSlider,
  SimpleSliderRequiredProps,
  TextField,
} from "@react-md/form";
import { SrOnly, Text } from "@react-md/typography";
import { nearest } from "@react-md/utils";

import styles from "./ColorSlider.module.scss";

export interface ColorSliderProps extends SimpleSliderRequiredProps {
  value: number;
  type: "r" | "g" | "b";
}

export default function ColorSlider({
  value,
  type,
  ...controls
}: ColorSliderProps): ReactElement | null {
  const { min, max, step, setValue } = controls;

  const id = `color-${type}`;
  const labelId = `${id}-label`;
  const [fieldValue, setFieldValue] = useState(`${value}`);
  const prevValue = useRef(value);
  if (prevValue.current !== value) {
    prevValue.current = value;
    setFieldValue(`${value}`);
  }

  return (
    <SimpleSlider
      baseId={id}
      aria-labelledby={labelId}
      value={value}
      {...controls}
      className={styles.slider}
      beforeAddon={
        <Text id={labelId} component="span">
          {type.toUpperCase()}
        </Text>
      }
      afterAddon={
        <TextField
          id={`${id}-field`}
          aria-labelledby={labelId}
          type="number"
          className={styles.field}
          min={min}
          max={max}
          step={step}
          value={fieldValue}
          onChange={(event) => {
            const { valueAsNumber } = event.currentTarget;
            if (
              !Number.isNaN(valueAsNumber) &&
              valueAsNumber >= min &&
              valueAsNumber <= max
            ) {
              setValue(valueAsNumber);
            }

            setFieldValue(event.currentTarget.value);
          }}
          onBlur={() => {
            const parsed = parseInt(fieldValue, 10);
            if (Number.isNaN(parsed)) {
              setFieldValue(`${value}`);
            } else {
              const inRange =
                fieldValue === "" ? 0 : nearest(min, max, parsed, max);
              setValue(inRange);
              setFieldValue(`${inRange}`);
            }
          }}
        />
      }
    />
  );
}
