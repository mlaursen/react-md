"use client";
import {
  Fieldset,
  Form,
  Legend,
  Slider,
  box,
  useRangeSlider,
} from "@react-md/core";
import { useId, type ReactElement } from "react";

export default function RangeSlider(): ReactElement {
  const legendId = useId();
  const slider = useRangeSlider();

  // these are the defaults
  // const min = 0;
  // const max = 100;
  // const step = 1;
  // const slider = useRangeSlider({
  //   min,
  //   max,
  //   step,
  //   defaultValue: [min, max],
  // });
  // const { rangeValue, min, max, step, setRangeValue } = slider;
  // const [minPrice, maxPrice] = rangeValue;

  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset fullWidth>
        <Legend id={legendId}>Slider</Legend>
        <Slider aria-labelledby={legendId} {...slider} />
      </Fieldset>
    </Form>
  );
}
