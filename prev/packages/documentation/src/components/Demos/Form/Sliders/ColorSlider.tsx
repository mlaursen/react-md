import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import type { SliderRequiredProps } from "@react-md/form";
import { Slider, TextField, useNumberField } from "@react-md/form";
import { Typography } from "@react-md/typography";

import styles from "./ColorSlider.module.scss";

export interface ColorSliderProps extends SliderRequiredProps {
  value: number;
  type: "r" | "g" | "b";
}

export default function ColorSlider({
  value,
  type,
  ...controls
}: ColorSliderProps): ReactElement | null {
  const id = `color-${type}`;
  const labelId = `${id}-label`;
  const { min, max, step, setValue } = controls;

  // it's probably not a good idea to use this hook here because of the `useRef`
  // usage below, but I really wanted the number validation part.
  const [numberValue, fieldProps, { setNumber }] = useNumberField({
    id: `${id}-field`,
    defaultValue: value,
    min,
    max,
    step,
    disableMessage: true,
    errorIcon: null,
  });

  // these refs are used to track changes between the `value` from the slider
  // and the `numberValue` from the text field and keep them in sync. So:
  // - whenever the slider value changes because the user is interacting with
  //   it, need to also update the text field number value
  // - whenever the text field value changes because the user is interacting
  //   with it, need to also update the slider number value
  const prevValue = useRef(value);
  const prevNumberValue = useRef(numberValue);
  useEffect(() => {
    if (prevValue.current !== value && prevNumberValue.current !== value) {
      prevValue.current = value;
      prevNumberValue.current = value;
      setNumber(value);
    } else if (prevNumberValue.current !== numberValue) {
      prevValue.current = numberValue;
      prevNumberValue.current = numberValue;
      setValue(numberValue);
    }
  }, [value, numberValue, setNumber, setValue]);

  return (
    <Slider
      baseId={id}
      thumbLabelledBy={labelId}
      value={value}
      {...controls}
      className={styles.slider}
      beforeAddon={
        <Typography id={labelId} component="span">
          {type.toUpperCase()}
        </Typography>
      }
      afterAddon={
        <TextField
          {...fieldProps}
          aria-labelledby={labelId}
          className={styles.field}
        />
      }
    />
  );
}
