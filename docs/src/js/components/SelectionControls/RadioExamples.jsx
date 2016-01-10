import React from 'react';
import { RadioGroup, Radio } from 'react-md/SelectionControls';

export default function RadioExamples() {
  return (
    <div>
      <h4 className="md-title">Inline</h4>
      <RadioGroup name="woop" inline>
        <Radio value="A" label="Click me for A" />
        <Radio value="B" label="Click me for B" />
        <Radio value="C" label="Click me for C" />
      </RadioGroup>

      <h4 className="md-title">Stacked</h4>
      <RadioGroup name="woop2" defaultValue="B">
        <Radio value="A" label="Click me for A" />
        <Radio value="B" label="Click me for B" />
        <Radio value="C" label="Click me for C" />
      </RadioGroup>
    </div>
  );
}
