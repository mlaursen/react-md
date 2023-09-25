"use client";
import { Fieldset, Form, Legend, Slider, useRangeSlider } from "@react-md/core";
import { useId, type ReactElement } from "react";

export function RangeSliderExample(): ReactElement {
  const legendId = useId();
  const slider = useRangeSlider({
    step: 10,
    defaultValue: [20, 80],
  });

  const { rangeValue, setRangeValue } = slider;
  const [minTemp, maxTemp] = rangeValue;

  return (
    <Form style={{ width: "30rem" }}>
      <Fieldset>
        <Legend id={legendId}>Temperature</Legend>
        <Slider
          aria-labelledby={legendId}
          {...slider}
          marks
          discrete
          tooltipVisibility="hover"
          getMarkLabelProps={({ value }) => {
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
