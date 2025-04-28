// TODO: Unable to automatically convert the `Slider` label prop
import { type ReactElement } from "react";
import { Slider, useSlider } from "react-md";


export default function SimpleSlider(): ReactElement | null {
  const controls = useSlider({
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 0.5
  });

  const value = controls.value;

  return (
    <>
      <Slider id="slider-1-id" label="Horizontal" {...controls} />
    </>
  );
}

