"use client";
import { Fieldset, Form, Legend, Slider, box, useSlider } from "@react-md/core";
import { useId, type ReactElement } from "react";

export default function SliderStates(): ReactElement {
  const legendId1 = useId();
  const legendId2 = useId();
  const slider = useSlider();
  // const { value, setValue, min, max, step } = slider;

  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset fullWidth>
        <Legend id={legendId1}>Horizontal Slider</Legend>
        <Slider aria-labelledby={legendId1} {...slider} disabled />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId2}>Vertical Slider</Legend>
        <Slider aria-labelledby={legendId2} {...slider} disabled vertical />
      </Fieldset>
    </Form>
  );
}
