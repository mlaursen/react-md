import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import FloatingLabels from './FloatingLabels';
import FloatingLabelsRaw from '!!raw-loader!./FloatingLabels.jsx';
import PlaceholderOnly from './PlaceholderOnly';
import PlaceholderOnlyRaw from '!!raw-loader!./PlaceholderOnly.jsx';
import InlineIcons from './InlineIcons';
import InlineIconsRaw from '!!raw-loader!./InlineIcons.jsx';
import DisabledFields from './DisabledFields';
import DisabledFieldsRaw from '!!raw-loader!./DisabledFields.jsx';

const examples = [{
  title: 'Floating Label Text Fields',
  description: `
When a \`TextField\` provides a \`label\` prop, the field will be updated with a label
that is displayed over the text field until the user focuses the field. Then the label
will float above the field to remind users of what they are filling out. If the \`TextField\`
also has a \`placeholder\`, it will now be visible. Once the user blurs the field, the label
will float back down if there is no content to indicate that it has not been filled. Otherwise
the label will remain above the input.
  `,
  code: FloatingLabelsRaw,
  children: <FloatingLabels />,
}, {
  title: 'Placeholder Only Text Fields',
  description: `
When you want the text fields to take up less space, you can omit the \`label\` prop and only
provide a \`placeholder\`. This will shrink the height of the text field by \`34px - 37px\`
(based on media size).

> NOTE: It has been proven that it is normally better to always display labels even if it takes
up more room as it makes it easier for the user to understand the content they have entered or
are entering.
  `,
  code: PlaceholderOnlyRaw,
  children: <PlaceholderOnly />,
}, {
  title: 'Text Fields with inline Icons',
  description: `
Text fields can be updated to provide additional visual cues by providing inline icons to be
displayed with the field. These icons can either be displayed to the left or right of the field.

The icon can also be displayed on the inner-left of the text field just like the password field
toggle button.
  `,
  code: InlineIconsRaw,
  children: <InlineIcons />,
}, {
  title: 'Disabled Text Fields',
  description: `
Text fields can be disabled as well. This will update the field to have different styles that tone
down the field to help show no interactions can happen.
  `,
  code: DisabledFieldsRaw,
  children: <DisabledFields />,
}];

const TextFields = () => <ExamplesPage description={README} examples={examples} />;
export default TextFields;
