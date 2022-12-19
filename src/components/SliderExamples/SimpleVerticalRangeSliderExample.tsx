import { Fieldset, Form, Legend, Slider, useRangeSlider } from "@react-md/form";
import type { ReactElement } from "react";

export function SimpleVerticalRangeSliderExample(): ReactElement {
  const slider = useRangeSlider();

  // The slider hook returns the current values and a React.useState setter if
  // you need to control the value manually
  // const { rangeValue, setRangeValue } = slider;
  // const [minValue, maxValue] = rangeValue;

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Fieldset>
        <Legend>Vertical</Legend>
        <Slider {...slider} vertical />
      </Fieldset>
    </Form>
  );
}
