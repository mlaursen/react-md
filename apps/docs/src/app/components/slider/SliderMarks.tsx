"use client";
import {
  Fieldset,
  Form,
  Legend,
  Slider,
  box,
  useRangeSlider,
  useSlider,
} from "@react-md/core";
import { useId, type ReactElement } from "react";
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
