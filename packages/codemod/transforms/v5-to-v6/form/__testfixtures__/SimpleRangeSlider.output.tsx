// TODO: Unable to automatically convert the `Slider` label prop
import { type ReactElement } from "react";
import { Slider, useRangeSlider } from "react-md";


export default function SimpleRangeSlider(): ReactElement | null {
  const controls = useRangeSlider({
    defaultValue: [10, 20],
    min: 0,
    max: 50
  });
  const [minValue, maxValue] = controls.rangeValue;
  return (
    <>
      <Slider id="range-slider-1" {...controls} label="Horizontal" />
    </>
  );
}

