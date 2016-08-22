import React from 'react';

import ContinuousExample from './ContinuousExample';
import ContinuousExampleRaw from '!!raw!./ContinuousExample';

import DiscreteExample from './DiscreteExample';
import DiscreteExampleRaw from '!!raw!./DiscreteExample';

export default [{
  title: 'Continuous Example',
  code: ContinuousExampleRaw,
  children: <ContinuousExample />,
}, {
  title: 'Discrete Example',
  code: DiscreteExampleRaw,
  children: <DiscreteExample />,
}];
