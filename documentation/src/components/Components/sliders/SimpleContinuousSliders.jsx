import React from 'react';
import Slider from 'react-md/lib/Sliders';

const SimpleContinuousSliders = () => (
  <div>
    <Slider id="continuous-plain-slider" />
    <Slider id="continuous-default-value-slider" label="Default value slider" defaultValue={20} />
    <Slider id="continuous-disabled-slider" label="Disabled slider" disabled />
    <Slider id="continuous-disabled-default-value-slider" label="Disabled slider" disabled defaultValue={50} />
  </div>
);

export default SimpleContinuousSliders;
