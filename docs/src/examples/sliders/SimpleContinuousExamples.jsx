import React from 'react';
import Slider from 'react-md/lib/Sliders';

const SimpleContinuousExamples = () => (
  <div>
    <Slider id="plainSlider" label="Plain Slider" />
    <Slider defaultValue={20} id="defaultValueSlider" label="Default Value Slider" />
    <Slider disabled id="disabledSlider" label="Disabled Slider" />
    <Slider disabled defaultValue={50} id="disabedDefault" label="Disabled Default Value Slider" />
  </div>
);

export default SimpleContinuousExamples;
