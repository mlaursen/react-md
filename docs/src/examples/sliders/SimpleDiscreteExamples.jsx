import React from 'react';
import Slider from 'react-md/lib/Sliders';

const SimpleDiscreteExamples = () => {
  return (
    <div>
      <Slider discrete id="plainDiscrete" label="Plain" />
      <Slider
        discrete
        id="discreteDefault"
        defaultValue={30}
        label="Default Value"
        discreteTicks={20}
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
};
export default SimpleDiscreteExamples;
