import React from 'react';

import OrientationExamples from './OrientationExamples';
import OrientationExamplesRaw from '!!raw!./OrientationExamples';
import InlineExamples from './InlineExamples';
import InlineExamplesRaw from '!!raw!./InlineExamples';
import LocaleExamples from './LocaleExamples';
import LocaleExamplesRaw from '!!raw!./LocaleExamples';
import ControlledExample from './ControlledExample';
import ControlledExampleRaw from '!!raw!./ControlledExample';

export default [{
  title: 'Orientation Examples',
  description: `
Time pickers will attempt to follow the correct display mode of the current
screen size through the media queries. You can also force a display mode if
you want.

> Forcing a display mode is not enabled by default since it is recommended to
always allow the orientation to determine the display mode. However it can be
enabled by setting \`$md-picker-include-forceful-classes: true\`.
`,
  code: OrientationExamplesRaw,
  children: <OrientationExamples />,
}, {
  title: 'Inline Example',
  description: 'A Time Picker can also appear inline.',
  code: InlineExamplesRaw,
  children: <InlineExamples />,
}, {
  title: 'Different Locales Examples',
  description: `
Time pickers will also use the browser's locale by default to format the time.
You can also manually force a locale.
`,
  code: LocaleExamplesRaw,
  children: <LocaleExamples />,
}, {
  title: 'Controlled Example',
  description: `
A time picker can be controlled as well. The \`onChange\` function will only
be triggered when the user hits the OK button.
  `,
  code: ControlledExampleRaw,
  children: <ControlledExample />,
}];
