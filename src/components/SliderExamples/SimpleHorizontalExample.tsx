import { Fieldset, Form, Legend, Slider, useSlider } from "@react-md/form";
import type { ReactElement } from "react";
import { useId } from "react";

export function SimpleHorizontalExample(): ReactElement {
  const legendId = useId();
  const slider = useSlider();

  // The slider hook returns the current value and a React.useState setter if
  // you need to control the value manually
  // const { value, setValue } = slider;

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Fieldset>
        <Legend id={legendId}>Horizontal</Legend>
        <Slider aria-labelledby={legendId} {...slider} />
      </Fieldset>
    </Form>
  );
}
