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
  description: `
Unfortunately the \`Radio\` selection control must always be controlled because the icon
changes depending on the \`checked\` state, and by default there is no behind-the-scenes
prevention of multiple radio components with the same name to be selected.

A helper component \`SelectionControlGroup\` can be used to manage the state of the radio
group or checkboxes.
  `,
  code: SimpleSelectionControlGroupExampleRaw,
  children: <SimpleSelectionControlGroupExample />,
}];
