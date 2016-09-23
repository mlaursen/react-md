import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';
import InteractiveExample from './InteractiveExample';
import InteractiveExampleRaw from '!!raw!./InteractiveExample';

import MobileFabExample from './MobileFabExample';
import MobileFabExampleRaw from '!!raw!./MobileFabExample';

export default [{
  title: 'Simple Examples',
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Interactive Example',
  code: InteractiveExampleRaw,
  children: <InteractiveExample />,
}, {
  title: 'Mobile Example with FAB',
  code: MobileFabExampleRaw,
  children: <MobileFabExample />,
}];
