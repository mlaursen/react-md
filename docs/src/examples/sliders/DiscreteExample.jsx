import React from 'react';
import Slider from 'react-md/lib/Sliders';

const DiscreteExample = () => (
  <div>
    <Slider min={1} max={10} step={1} />
    <Slider min={1} max={100} step={2} disabled />
  </div>
);

export default DiscreteExample;
