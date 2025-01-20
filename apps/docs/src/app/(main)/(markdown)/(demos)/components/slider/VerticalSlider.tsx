"use client";

import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useSlider } from "@react-md/core/form/useSlider";
import { type ReactElement, useId } from "react";

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
