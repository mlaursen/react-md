import React from 'react';

import './_text-fields.scss';
import FloatingLabelExamples from './FloatingLabelExamples';
import FloatingLabelExamplesRaw from '!!raw!./FloatingLabelExamples';

import SingleLineExamples from './SingleLineExamples';
import SingleLineExamplesRaw from '!!raw!./SingleLineExamples';

import StatefulExamples from './StatefulExamples';
import StatefulExamplesRaw from '!!raw!./StatefulExamples';

import InfoExamples from './InfoExamples';
import InfoExamplesRaw from '!!raw!./InfoExamples';

import FullWidthExamples from './FullWidthExamples';
import FullWidthExamplesRaw from '!!raw!./FullWidthExamples';

import FormExample from './FormExample';
import FormExampleRaw from '!!raw!./FormExample';

export default [{
  title: 'Floating Label Examples',
  description: `
A text field can contain a floating label by providing the \`label\` prop. When the
user focuses on the text field, the label will float above the text field and the
optional placeholder will be visible.
  `,
  code: FloatingLabelExamplesRaw,
  children: <FloatingLabelExamples />,
}, {
  title: 'Single Line Label Examples',
  description: `
When there is no floating label in a text field, it is considered to be a single line
text field. It is preferable to use floating label text fields when room is available.
  `,
  code: SingleLineExamplesRaw,
  children: <SingleLineExamples />,
}, {
  title: 'With icons / Stateful Examples',
  description: `
Text fields are also able to display an icon to the left or right of the text field. If
the user clicks on the icon, the text field will be focused.

Text fields can also gain error states with form validation. If an icon is provided, it will
also gain the error state. The error state can be triggered by either providing a prop
\`error={true}\`, the user passes the \`maxLength\`, or having a required text field and the user
blurs without having any input.

Required text fields will automatically inject a '*' into the label or placeholder.
  `,
  code: StatefulExamplesRaw,
  children: <StatefulExamples />,
}, {
  title: 'With Info/Error Text',
  description: `
Text fields can also display help or error text with the text field. The help text can either always
be displayed, or only visible when the text field has been focused. The error text will only be displayed
if the \`error\` prop is \`true\`, the user passes the \`maxLength\` prop, or a required field is blurred
with no input.

When a text field has additional help or error text, it is recommended to place the text fields in the \`.md-grid\`
and have each text field cell aligned to the top.
  `,
  code: InfoExamplesRaw,
  children: <InfoExamples />,
}, {
  title: 'Full Width Examples',
  description: `
A \`block\` text fields is equivalent to the \`full width\` text field
in the Material Design specifications. A \`block\`-ed text field will
have not have the focus indicator divider below the text field and only
allows single line labels. Since this is handled by the component, if you
give a \`label\` prop, it will be used as the placeholder instead.
`,
  code: FullWidthExamplesRaw,
  children: <FullWidthExamples />,
}, {
  title: 'Form Example',
  code: FormExampleRaw,
  children: <FormExample />,
}];
