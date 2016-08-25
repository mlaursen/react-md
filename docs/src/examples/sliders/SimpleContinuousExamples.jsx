import React from 'react';
import Slider from 'react-md/lib/Sliders';
import FontIcon from 'react-md/lib/FontIcons';

const SimpleContinuousExamples = () => (
  <div>
    <Slider
      id="mediaVolume"
      label="Media volume"
      leftIcon={<FontIcon>volume_up</FontIcon>}
    />
    <Slider
      id="alarmVolume"
      label="Alarm Volume"
      defaultValue={3}
      max={10}
      leftIcon={<FontIcon>alarm</FontIcon>}
      rightIcon={<FontIcon>menu</FontIcon>}
    />
    <Slider disabled />
    <Slider disabled defaultValue={50} />
    <Slider
      leftIcon={<span className="md-slider-ind">R</span>}
      defaultValue={10}
      editable
      max={255}
    />
    <Slider
      leftIcon={<span className="md-slider-ind">G</span>}
      defaultValue={188}
      editable
      max={255}
    />
    <Slider
      leftIcon={<span className="md-slider-ind">B</span>}
      defaultValue={212}
      editable
      max={255}
    />
  </div>
);

export default SimpleContinuousExamples;
