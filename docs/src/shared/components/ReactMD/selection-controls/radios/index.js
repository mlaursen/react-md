import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import StatefulExample from './StatefulExample';
import StatefulExampleRaw from '!!raw!./StatefulExample';

export default [{
  title: 'Simple Examples',
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Stateful Example',
  code: StatefulExampleRaw,
  children: <StatefulExample />,
}];
