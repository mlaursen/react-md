import { Fieldset, Legend, Slider, useRangeSlider } from "@react-md/form";
import type { ReactElement } from "react";
import { useId } from "react";

export function DiscreteVerticalRangeSliderExample(): ReactElement {
  const legendId = useId();
  const slider = useRangeSlider({
    defaultValue: [20, 40],
  });

  // The slider hook returns the current values and a React.useState setter if
  // you need to control the value manually
  // const { rangeValue, setRangeValue } = slider;
  // const [minValue, maxValue] = rangeValue;

  return (
    <Fieldset style={{ maxWidth: "30rem", width: "100%" }}>
      <Legend id={legendId}>Vertical Discrete Range Slider</Legend>
      <Slider {...slider} discrete vertical />
    </Fieldset>
  );
}
