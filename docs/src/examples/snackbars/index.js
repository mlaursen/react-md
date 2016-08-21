import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import MobileFabExample from './MobileFabExample';
import MobileFabExampleRaw from '!!raw!./MobileFabExample';

export default [{
  title: 'Simple Examples',
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Mobile Example with FAB',
  code: MobileFabExampleRaw,
  children: <MobileFabExample />,
}];
