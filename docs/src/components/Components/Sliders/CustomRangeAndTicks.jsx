import React from 'react';
import { Slider } from 'react-md';

const CustomRangeAndTicks = () => (
  <div>
    <Slider
      id="custom-range-continuous-slider"
      label="Min = 1, Max = 3, Step = 0.5"
      min={1}
      max={3}
      step={0.5}
    />
    <Slider
      id="disctete-ticks-slider"
      label="Discrete with ticks and precision"
      discrete
      max={0.25}
      step={0.01}
      discreteTicks={0.01}
      valuePrecision={2}
    />
  </div>
);

export default CustomRangeAndTicks;
