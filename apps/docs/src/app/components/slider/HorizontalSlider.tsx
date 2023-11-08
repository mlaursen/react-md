"use client";
import { Fieldset, Form, Legend, Slider, box, useSlider } from "@react-md/core";
import { useId, type ReactElement } from "react";

export default function HorizontalSlider(): ReactElement {
  const legendId = useId();
  const slider = useSlider();
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
