"use client";
import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";

import {
  // getRangeDefaultValue,
  useSlider,
} from "@react-md/core/form/useSlider";

import { useId, type ReactElement } from "react";

// these are the defaults
const min = 0;
const max = 100;
const step = 1;

export default function ConfiguringUseSlider(): ReactElement {
  const legendId = useId();
  const slider = useSlider({
    min,
    max,
    step,
    defaultValue: 30,
    // this is the default.. defaultValue
    // defaultValue: () =>
    //   getRangeDefaultValue({
    //     min: 0,
    //     max: 100,
    //     step: 1,
    //   }),
  });
  // const { value, setValue, min, max, step } = slider;

  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset fullWidth>
        <Legend id={legendId}>Slider</Legend>
        <Slider aria-labelledby={legendId} {...slider} />
      </Fieldset>
    </Form>
  );
}
