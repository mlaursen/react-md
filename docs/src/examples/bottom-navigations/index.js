import React from 'react';

import FixedExample from './FixedExample';
import FixedExampleRaw from '!!raw!./FixedExample';

import ShiftingExample from './ShiftingExample';
import ShiftingExampleRaw from './ShiftingExample/code';

export default [{
  title: 'Fixed Example',
  code: FixedExampleRaw,
  children: <FixedExample />,
}, {
  title: 'Shifting Example',
  code: ShiftingExampleRaw,
  children: <ShiftingExample />,
}];
