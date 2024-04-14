"use client";
import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useRangeSlider } from "@react-md/core/form/useRangeSlider";
import { useId, type ReactElement } from "react";

// these are the defaults
const min = 0;
const max = 100;
const step = 1;
export default function VerticalRangeSlider(): ReactElement {
  const legendId = useId();

  const slider = useRangeSlider({
    min,
    max,
    step,
    defaultValue: [20, 75],
  });
  // const { rangeValue, min, max, step, setRangeValue } = slider;
  // const [minPrice, maxPrice] = rangeValue;

  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset fullWidth>
        <Legend id={legendId}>Slider</Legend>
        <Slider aria-labelledby={legendId} {...slider} vertical />
      </Fieldset>
    </Form>
  );
}
