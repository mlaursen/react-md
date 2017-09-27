import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import description from '../description';
import OrientationExamples from './OrientationExamples';
import OrientationExamplesRaw from '!!raw-loader!./OrientationExamples.jsx';
import InlineExample from './InlineExample';
import InlineExampleRaw from '!!raw-loader!./InlineExample.jsx';
import Formatting from './Formatting';
import FormattingRaw from '!!raw-loader!./Formatting.jsx';
import AutoOkAndHover from './AutoOkAndHover';
import AutoOkAndHoverRaw from '!!raw-loader!./AutoOkAndHover.jsx';
import TextFieldStyling from './TextFieldStyling';
import TextFieldStylingRaw from '!!raw-loader!./TextFieldStyling.jsx';
import Controlled from './Controlled';
import ControlledRaw from '!!raw-loader!./Controlled.jsx';

const examples = [{
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
  description: `
When the user is primarily using a desktop display, it might be better to display
an inline picker instead of opening a full dialog. This can be accomplished by
providing the \`inline\` prop to the picker.
  `,
  code: InlineExampleRaw,
  children: <InlineExample />,
}, {
  title: 'Formatting',
  description: `
As stated above, the date and time formatting is done with the \`Intl.DateTimeFormat\`
formatter. The examples below will show the default formatting differences between:
- the browser's locale
- an en-US locale
- a da-DK locale

The \`TimePicker\` can also be updated with any of the
[configuration options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters)
  `,
  code: FormattingRaw,
  children: <Formatting />,
}, {
  title: 'Auto OK and Hover Modes',
  description: `
The \`TimePicker\` can be updated so that when a user touches/clicks an hour, it will automatically select the hour
and switch to the minute view. When the user touches/clicks a minute, it will automatically select the minute and
call the "OK" action to close the dialog.

There is an additional "hover mode" that can be enabled for time pickers that will make it a bit simpler on desktop
screens so that hovering around the clock would be the same as dragging.
  `,
  code: AutoOkAndHoverRaw,
  children: <AutoOkAndHover />,
}, {
  title: 'Text Field Styling',
  description: `
Since the \`TimePicker\` uses the \`TextField\` component behind the scenes, the \`TimePicker\` will pass most of the text field
props to the \`TextField\` itself so you can add error messages, help text, line directions, etc to the \`TimePicker\`.
  `,
  code: TextFieldStylingRaw,
  children: <TextFieldStyling />,
}, {
  title: 'Controlled',
  description: `
There are times where it is helpful to fully control all aspects of the \`TimePicker\` (\`visibility\`, \`value\`). This can be done by
providing the \`value\` prop and an \`onChange\` prop or \`visible\` with \`onVisibilityChange\`.
  `,
  code: ControlledRaw,
  children: <Controlled />,
}];

const TimePickers = () => <ExamplesPage description={description} examples={examples} />;
export default TimePickers;
