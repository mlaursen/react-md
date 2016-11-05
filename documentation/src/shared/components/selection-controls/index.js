import React from 'react';

import SimpleCheckboxExamples from './SimpleCheckboxExamples';
import SimpleCheckboxExamplesRaw from '!!raw!./SimpleCheckboxExamples';

import SimpleSelectionControlGroupExample from './SimpleSelectionControlGroupExample';
import SimpleSelectionControlGroupExampleRaw from '!!raw!./SimpleSelectionControlGroupExample';

import SimpleSwitchExamples from './SimpleSwitchExamples';
import SimpleSwitchExamplesRaw from '!!raw!./SimpleSwitchExamples';

export default [{
  title: 'Simple Checkbox Examples',
  code: SimpleCheckboxExamplesRaw,
  children: <SimpleCheckboxExamples />,
}, {
  title: 'Simple Switch Examples',
  code: SimpleSwitchExamplesRaw,
  children: <SimpleSwitchExamples />,
}, {
  title: 'Simple Selection Control Group Example',
  code: SimpleSelectionControlGroupExampleRaw,
  children: <SimpleSelectionControlGroupExample />,
}];
