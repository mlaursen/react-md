import { Fieldset, Form, Legend, Slider, useRangeSlider } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleHorizontalRangeSliderExample(): ReactElement {
  const slider = useRangeSlider();

  // The slider hook returns the current values and a React.useState setter if
  // you need to control the value manually
  // const { rangeValue, setRangeValue } = slider;
  // const [minValue, maxValue] = rangeValue;

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Fieldset>
        <Legend>Horizontal</Legend>
        <Slider {...slider} />
      </Fieldset>
    </Form>
  );
}
