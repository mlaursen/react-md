import type { SliderValueMark } from "@react-md/core";
import {
  Checkbox,
  Fieldset,
  Form,
  Legend,
  Slider,
  useRangeSlider,
  useSlider,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useId, useState } from "react";

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

export function DiscreteSliderMarks(): ReactElement {
  const sliderLegendId = useId();
  const rangeLegendId = useId();
  const slider = useSlider({ step: 10 });
  const rangeSlider = useRangeSlider({ step: 10 });
  const [vertical, setVertical] = useState(false);

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Checkbox
        label="Vertical"
        checked={vertical}
        onChange={(event) => setVertical(event.currentTarget.checked)}
      />
      <Fieldset style={{ paddingBottom: "3rem" }}>
        <Legend id={sliderLegendId}>Slider</Legend>
        <Slider
          aria-labelledby={sliderLegendId}
          vertical={vertical}
          discrete
          {...slider}
          marks={marks}
          getTooltipChildren={(value) => `${value}°`}
        />
      </Fieldset>
      <Fieldset>
        <Legend id={rangeLegendId}>Range Slider</Legend>
        <Slider
          aria-labelledby={rangeLegendId}
          vertical={vertical}
          discrete
          {...rangeSlider}
          marks
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
