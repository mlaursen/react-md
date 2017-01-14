import React from 'react';
import Slider from 'react-md/lib/Sliders';

const SimpleDiscreteExamples = () => (
  <div>
    <Slider discrete id="plainDiscrete" label="Plain" />
    <Slider
      discrete
      id="discreteDefault"
      defaultValue={0.25}
      label="Default Value With Ticks and Precision"
      max={0.25}
      step={0.01}
      discreteTicks={0.01}
      valuePrecision={2}
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
