"use client";
import {
  Fieldset,
  Form,
  Legend,
  Slider,
  box,
  useRangeSlider,
  useSlider,
  type SliderValueMark,
} from "react-md";
import { useId, type ReactElement } from "react";
import styles from "./CustomizingSliderMarks.module.scss";

const marks: readonly SliderValueMark[] = [
  { value: 0, label: `0°` },
  { value: 10, label: `10°` },
  { value: 20, label: `20°` },
  { value: 30, label: `30°` },
  { value: 40, label: `40°` },
  { value: 50, label: `50°` },
  { value: 60, label: `60°` },
  { value: 70, label: `70°` },
  { value: 80, label: `80°` },
  { value: 90, label: `90°` },
  { value: 100, label: `100°` },
];

const vertical = false;

export default function CustomizingSliderMarks(): ReactElement {
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
        <Legend id={legendId1}>Custom marks</Legend>
        <Slider
          aria-labelledby={legendId1}
          discrete
          {...slider}
          marks={marks}
          vertical={vertical}
          getTooltipChildren={(value) => `${value}°`}
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId2}>Range custom marks</Legend>
        <Slider
          aria-labelledby={legendId2}
          discrete
          {...rangeSlider}
          marks
          vertical={vertical}
          getMarkLabelProps={({ value, offset: _offset, active: _active }) => {
            if (value % 20 !== 0) {
              return;
            }

            return {
              children: `${value}°`,
            };
          }}
        />
      </Fieldset>
    </Form>
  );
}
