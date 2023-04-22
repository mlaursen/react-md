import { Fieldset, Legend, Slider, useSlider } from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";

export function DiscreteHorizontalSliderExample(): ReactElement {
  const legendId = useId();
  const slider = useSlider();

  // The slider hook returns the current value and a React.useState setter if
  // you need to control the value manually
  // const { value, setValue } = slider;

  return (
    <Fieldset style={{ maxWidth: "30rem", width: "100%" }}>
      <Legend id={legendId}>Horizontal Discrete Slider</Legend>
      <Slider {...slider} aria-labelledby={legendId} discrete />
    </Fieldset>
  );
}
