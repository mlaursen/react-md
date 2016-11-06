import React from 'react';
import Slider from 'react-md/lib/Sliders';

const incrementalStep = 50 / 6;

const SimpleDiscreteExamples = () => (
  <div>
    <Slider discrete id="plainDiscrete" label="Plain" />
    <Slider
      discrete
      id="discreteDefault"
      defaultValue={incrementalStep * 2}
      label="Default Value With Ticks and Precision"
      max={50}
      step={incrementalStep}
      discreteTicks={incrementalStep}
      valuePrecision={1}
    />
    <Slider
      discrete
      disabled
      id="discreteDisabled"
      label="Disabled"
    />
    <Slider
      discrete
      disabled
      id="discreteDisabledDefault"
      defaultValue={30}
      label="Disabled Default Value"
    />
  </div>
);

export default SimpleDiscreteExamples;
