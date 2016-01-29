import React from 'react';

import Slider from 'react-md/Sliders';

export default function SliderExamples() {
  return (
    <div>
      <h5>Continuous slider</h5>
      <Slider defaultValue={30} />
      <h5>Discrete slider</h5>
      <Slider
        min={1}
        max={10}
        step={1}
        onChange={(value, e) => console.log('Changed slider to', value, e)}
        onDragChange={(value, e) => console.log('Sliding', value, e)}
      />
    </div>
  );
}
