import React from 'react';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

const RadioExample = () => (
  <SelectionControlGroup
    id="selection-control-group-radios"
    name="radio-example"
    type="radio"
    label="SelectionControl Group"
    defaultValue="B"
    controls={[{
      label: 'What a Save!',
      value: 'A',
    }, {
      label: 'No problem.',
      value: 'B',
    }, {
      label: 'I got it!',
      value: 'C',
    }]}
  />
);
export default RadioExample;
