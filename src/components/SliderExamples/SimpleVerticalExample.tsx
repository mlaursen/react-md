import { Fieldset, Form, Legend, Slider, useSlider } from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";

export function SimpleVerticalExample(): ReactElement {
  const legendId = useId();
  const slider = useSlider();

  // The slider hook returns the current value and a React.useState setter if
  // you need to control the value manually
  // const { value, setValue } = slider;

  return (
    <Form>
      <Fieldset>
        <Legend id={legendId} style={{ marginBottom: "1rem" }}>
          Volume
        </Legend>
        <Slider aria-labelledby={legendId} {...slider} vertical />
      </Fieldset>
    </Form>
  );
}