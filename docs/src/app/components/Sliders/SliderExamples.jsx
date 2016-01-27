import React from 'react';

import Slider from 'react-md/Sliders';

export default function SliderExamples() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider min={1} max={10} step={1} />
    </div>
  );
}
