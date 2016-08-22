import React from 'react';

import IndeterminateExample from './IndeterminateExample';
import IndeterminateExampleRaw from '!!raw!./IndeterminateExample';
import DeterminateExample from './DeterminateExample';
import DeterminateExampleRaw from '!!raw!./DeterminateExample';

export default [{
  title: 'Indeterminate Example',
  code: IndeterminateExampleRaw,
  children: <IndeterminateExample />,
}, {
  title: 'Determinate Example',
  code: DeterminateExampleRaw,
  children: <DeterminateExample />,
}];
