"use client";
import { Fieldset, Form, Legend, Slider, box, useSlider } from "@react-md/core";
import { useId, type ReactElement } from "react";

export default function VerticalSlider(): ReactElement {
  const slider = useSlider();
  const legendId = useId();

  return (
    <Form
      className={box({ fullWidth: true })}
      style={
        {
          // "--rmd-slider-vertical-size": "15rem",
        }
      }
    >
      <Fieldset fullWidth>
        <Legend id={legendId}>Slider</Legend>
        <Slider aria-labelledby={legendId} {...slider} vertical />
      </Fieldset>
    </Form>
  );
}
