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
import CountersAndText from './CountersAndText';
import CountersAndTextRaw from '!!raw-loader!./CountersAndText.jsx';
import AutoResizing from './AutoResizing';
import AutoResizingRaw from '!!raw-loader!./AutoResizing.jsx';
import BlockedFields from './BlockedFields';
import BlockedFieldsRaw from '!!raw-loader!./BlockedFields.jsx';
import FormExample from './FormExample';
import FormExampleRaw from '!!raw-loader!./FormExample.jsx';

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
The user can touch the text field or the icon to focus the text field.

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
}, {
  title: 'Counters and Help/Error Text',
  description: `
Text fields can be updated to display a counter when the \`maxLength\` prop has been specified. The
counter will update when the user types to display the remaining characters available for the field.
When the \`maxLength\` has been exceeded, the field will gain the error state.

Sometimes it is helpful to add additional information about a field for the user, so you can apply some
additional \`helpText\` that will appear below the field. The text should automatically wrap to be the
same size as the field. It is also possible to hide the help text until the user focuses the field by
enabling the \`helpOnFocus\` prop.

The text field can gain the error state either by:
- being \`required\` and the user blurs the text field without adding any content
- the \`maxLength\` prop is provided and the user types more characters than the length
- the \`error\` prop is enabled.

When the text field gains the \`error\` state via props or internally, it will attempt to display the
\`errorText\` prop and it will apply the error status color to the floating label, text field underline,
and the error text if it exists.

The text field can display help/error text along with a counter.
  `,
  code: CountersAndTextRaw,
  children: <CountersAndText />,
}, {
  title: 'Auto Resizing Examples',
  description: `
The \`TextField\` can be updated to automatically resize its width to be the size of its text content. It will
be a tiny bit off for some browsers (2-3 pixels) because of how they calculate text width, but it should be fairly
accurate.

When the user types, the text field should automatically expand to match the text and when the user removes text,
the width will shrink.
  `,
  code: AutoResizingRaw,
  children: <AutoResizing />,
}, {
  title: 'Blocked Fields',
  description: `
Blocked text fields are called the full-width fields in the material design spec. They are mostly used on
mobile devices along with the \`Divider\` component. The blocked text field removes the underline and only
allows placeholder text to be displayed.
  `,
  code: BlockedFieldsRaw,
  children: <BlockedFields />,
}, {
  title: 'Form Example and misc.',
  description: `
This is just a simple example showcasing a simple form using text fields and selection controls to submit some
new item to an application. This example shows off two new features of the text field:
- custom sizing
- limiting the max rows for a multiline text field.

Text fields can be updated to use custom font sizes by either updating the \`$md-text-field-custom-sizes\` map
or the provided mixins. Once the styles have been created, you can use the \`customSize\` prop to apply that
size to the field. By default, there will be a "title" text field included. See the [SassDoc tab](/components/text-fields?tab=2)
for more information.

Mutliline text fields automatically grow to display all the content by default. In some cases, it can be helpful to allow it to
grown to a certain point and then stop growing. This can be accomplished by providing a \`maxRows\` prop.
  `,
  code: FormExampleRaw,
  children: <FormExample />,
}];

const TextFields = () => <ExamplesPage description={README} examples={examples} />;
export default TextFields;
