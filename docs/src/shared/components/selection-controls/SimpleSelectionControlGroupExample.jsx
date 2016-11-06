import React from 'react';
import { SelectionControlGroup } from 'react-md/lib/SelectionControls';

const SimpleSelectionControlGroupExample = () => (
  <div>
    <SelectionControlGroup
      type="checkbox"
      id="controlGroupCheckbox"
      name="simpleCheckboxGroup"
      label="Uncontrolled SelectionControl Group"
      defaultValue="A"
      controls={[{
        label: 'What',
        value: 'A',
      }, {
        label: 'No way!',
        value: 'B',
      }]}
    />
    <SelectionControlGroup
      id="controlGroupRadio"
      type="radio"
      name="simpleRadioGroup"
      label="Uncontrolled SelectionControl Group"
      defaultValue="A"
      controls={[{
        label: 'What',
        value: 'A',
      }, {
        label: 'No way!',
        value: 'B',
      }, {
        label: 'Something Else',
        value: 'C',
      }]}
    />
  </div>
);

export default SimpleSelectionControlGroupExample;
