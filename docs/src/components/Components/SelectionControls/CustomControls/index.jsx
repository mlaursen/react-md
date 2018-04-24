import React from 'react';
import { SelectionControlGroup } from 'react-md';

import CustomControl from './CustomControl';

const controls = Array.from(new Array(10)).map((_, i) => ({
  label: `Item ${i + 1}`,
  value: `${i}`,
}));

const CustomControls = () => (
  <SelectionControlGroup
    id="custom-controls"
    name="custom-controls"
    type="radio"
    controlComponent={CustomControl}
    controls={controls}
  />
);

export default CustomControls;
