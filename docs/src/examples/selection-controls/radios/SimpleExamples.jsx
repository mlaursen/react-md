import React from 'react';
import RadioGroup from 'react-md/lib/SelectionControls/RadioGroup';
import Radio from 'react-md/lib/SelectionControls/Radio';

// or
// import { Radio, RadioGroup } from 'react-md/lib/SelectionControls';

const SimpleExamples = () => (
  <div>
    <h3 className="md-subheading-1">Stacked Radios</h3>
    <RadioGroup name="stacked-uncontrolled" defaultValue="C">
      <Radio value="A" label="Item one" />
      <Radio value="B" label="Item two" />
      <Radio value="C" label="Item three" />
      <Radio value="D" label="Item four" />
      <Radio value="E" label="Item five" />
    </RadioGroup>
    <h3 className="md-subheading-1">Inline Radios</h3>
    <RadioGroup name="inline-uncontrolled" inline>
      <Radio value="A" label="Item one" />
      <Radio value="B" label="Item two" />
      <Radio value="C" label="Item three" />
    </RadioGroup>
  </div>
);

export default SimpleExamples;
