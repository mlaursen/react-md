"use client";

import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useRangeSlider } from "@react-md/core/form/useRangeSlider";
import { useSlider } from "@react-md/core/form/useSlider";
import { type ReactElement, useId } from "react";

import styles from "./SliderMarks.module.scss";

const vertical = false;

export default function SliderMarks(): ReactElement {
  const legendId1 = useId();
  const legendId2 = useId();
  const slider = useSlider({ step: 10, defaultValue: 70 });
  const rangeSlider = useRangeSlider({ step: 10, defaultValue: [40, 70] });

  return (
    <Form
      className={box({
        align: "stretch",
        stacked: true,
        fullWidth: true,
        className: styles.form,
      })}
    >
      <Fieldset fullWidth>
        <Legend id={legendId1}>Slider marks</Legend>
        <Slider
          aria-labelledby={legendId1}
          discrete
          {...slider}
          marks
          vertical={vertical}
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId2}>Range marks</Legend>
        <Slider
          aria-labelledby={legendId2}
          discrete
          {...rangeSlider}
          marks
          vertical={vertical}
        />
      </Fieldset>
    </Form>
  );
}
