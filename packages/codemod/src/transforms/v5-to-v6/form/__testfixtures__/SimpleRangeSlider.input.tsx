import { type ReactElement } from "react";
import { RangeSlider, useRangeSlider } from "react-md";


export default function SimpleRangeSlider(): ReactElement | null {
  const [[minValue, maxValue], controls] = useRangeSlider([10, 20], { min: 0, max: 50 });
  return (
    <>
      <RangeSlider baseId="range-slider-1" {...controls} label="Horizontal" />
    </>
  );
}

