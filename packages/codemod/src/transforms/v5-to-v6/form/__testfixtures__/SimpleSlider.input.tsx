import { type ReactElement } from "react";
import { Slider, useSlider } from "react-md";


export default function SimpleSlider(): ReactElement | null {
  const [value, controls] = useSlider(0, {
    min: 0,
    max: 10,
    step: 0.5,
  });

  return (
    <>
      <Slider baseId="slider-1-id" label="Horizontal" {...controls} />
    </>
  );
}

