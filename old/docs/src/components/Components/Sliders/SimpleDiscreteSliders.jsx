import React from 'react';
import { Slider } from 'react-md';

const SimpleDiscreteSliders = () => (
  <div>
    <Slider id="discrete-plain-slider" discrete />
    <Slider id="discrete-default-value-slider" label="Default value slider" discrete defaultValue={20} />
    <Slider id="discrete-disabled-slider" label="Disabled slider" discrete disabled />
    <Slider id="discrete-disabled-default-value-slider" label="Disabled slider" discrete disabled defaultValue={50} />
  </div>
);

export default SimpleDiscreteSliders;
