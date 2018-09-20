import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import description from '../description';
import OrientationExamples from './OrientationExamples';
import OrientationExamplesRaw from '!!raw-loader!./OrientationExamples.jsx';
import InlineExample from './InlineExample';
import InlineExampleRaw from '!!raw-loader!./InlineExample.jsx';
import CustomDateRenderingExample from './CustomDateRenderingExample';
import CustomDateRenderingExampleRaw from '!!raw-loader!./CustomDateRenderingExample.jsx';
import AdditionalDisplaySettings from './AdditionalDisplaySettings';
import AdditionalDisplaySettingsRaw from '!!raw-loader!./AdditionalDisplaySettings.jsx';
import Formatting from './Formatting';
import FormattingRaw from '!!raw-loader!./Formatting.jsx';
import TextFieldStyling from './TextFieldStyling';
import TextFieldStylingRaw from '!!raw-loader!./TextFieldStyling.jsx';
import Controlled from './Controlled';
import ControlledRaw from '!!raw-loader!./Controlled.jsx';
import IntlPolyfill from '../IntlPolyfill';

const examples = [{
  title: 'Orientation Examples',
  description: `
Date pickers will attempt to follow the correct display mode of the current
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
  title: 'Custom Date Rendering Example',
  description: `
DatePicker can be used as static month calendar with custom date rendering.
  `,
  code: CustomDateRenderingExampleRaw,
  children: <CustomDateRenderingExample />,
}, {
  title: 'Additional Display Settings',
  description: `
The Calendar can be updated with some additional display settings to disable dates,
show dates from other months, and setting a custom first day of the week. In addition,
you can specify a min and max date for the picker to display. The user can navigate
through the months like normal until the min or max date is reached. The invalid dates
will be disabled and dulled to prevent selection as well as preventing the user from
seeing any other months that are past the min or max dates. Combine these props as much
as you desire.
  `,
  code: AdditionalDisplaySettingsRaw,
  children: <AdditionalDisplaySettings />,
}, {
  title: 'Formatting',
  description: `
As stated above, the date and time formatting is done with the \`Intl.DateTimeFormat\`
formatter. The examples below will show the default formatting differences between:
- the browser's locale
- an en-US locale
- a da-DK locale

The \`DatePicker\` can also be updated with any of the
[configuration options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters)
  `,
  code: FormattingRaw,
  children: <Formatting />,
}, {
  title: 'Text Field Styling',
  description: `
Since the \`DatePicker\` uses the \`TextField\` component behind the scenes, the \`DatePicker\` will pass most of the text field
props to the \`TextField\` itself so you can add error messages, help text, line directions, etc to the \`DatePicker\`.
  `,
  code: TextFieldStylingRaw,
  children: <TextFieldStyling />,
}, {
  title: 'Controlled',
  description: `
There are times where it is helpful to fully control all aspects of the \`DatePicker\` (\`visibility\`, \`value\`). This can be done by
providing the \`value\` prop and an \`onChange\` prop or \`visible\` with \`onVisibilityChange\`.
  `,
  code: ControlledRaw,
  children: <Controlled />,
}, {
  title: 'Intl Polyfill',
  code: null,
  children: <IntlPolyfill />,
}];

const DatePickers = () => <ExamplesPage description={description} examples={examples} />;
export default DatePickers;
