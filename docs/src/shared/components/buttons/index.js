import React from 'react';

import './_buttons.scss';
import FlatButtonExamples from './FlatButtonExamples';
import FlatButtonExamplesRaw from '!!raw!./FlatButtonExamples';

import RaisedButtonExamples from './RaisedButtonExamples';
import RaisedButtonExamplesRaw from '!!raw!./RaisedButtonExamples';

import IconButtonExamples from './IconButtonExamples';
import IconButtonExamplesRaw from '!!raw!./IconButtonExamples';

import FloatingButtonExamples from './FloatingButtonExamples';
import FloatingButtonExamplesRaw from '!!raw!./FloatingButtonExamples';

import FixedFloatingButtonExample from './FixedFloatingButtonExample';
import FixedFloatingButtonExampleRaw from '!!raw!./FixedFloatingButtonExample';

export default [{
  title: 'Flat Buttons',
  code: FlatButtonExamplesRaw,
  children: <FlatButtonExamples />,
}, {
  title: 'Raised Buttons',
  code: RaisedButtonExamplesRaw,
  children: <RaisedButtonExamples />,
}, {
  title: 'Icon Buttons',
  code: IconButtonExamplesRaw,
  children: <IconButtonExamples />,
}, {
  title: 'Floating Buttons',
  code: FloatingButtonExamplesRaw,
  children: <FloatingButtonExamples />,
}, {
  title: 'Fixed Floating Button Example',
  description: `
The most common use of a floating button is to fix it to the page or some other element. When the
FAB is fixed, it _should_ also be styled as \`secondary\` to show prominence.

To fix a FAB, provide \`fixed\` and optionally \`fixedPosition\` to your floating button. This will
apply the correct styles and fix your button to either the top left, the top right, the bottom left,
or the bottom right.
`,
  code: FixedFloatingButtonExampleRaw,
  children: <FixedFloatingButtonExample />,
}];
