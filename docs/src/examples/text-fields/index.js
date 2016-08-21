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

import InToolbarExample from './InToolbarExample';
import InToolbarExampleRaw from '!!raw!./InToolbarExample';

export default [{
  title: 'Floating Label Examples',
  code: FloatingLabelExamplesRaw,
  children: <FloatingLabelExamples />,
}, {
  title: 'Single Line Label Examples',
  code: SingleLineExamplesRaw,
  children: <SingleLineExamples />,
}, {
  title: 'With icons / Stateful Examples',
  code: StatefulExamplesRaw,
  children: <StatefulExamples />,
}, {
  title: 'With Info/Error Text',
  code: InfoExamplesRaw,
  children: <InfoExamples />,
}, {
  title: 'Full Width Examples',
  description: `
A \`block\` text fields is equivalent to the \`full width\` text field
in the Material Design specifications. A \`block\`-ed text field will
have not have the focus indicator divider below the text field and only
allows single line labels. This is handled by the component itself, so
specifically stating \`floatingLabel={false}\` is unnecessary if the \`block\`
prop is enabled.

The reason it is named \`block\` is because it is a bit more accurate of a
description of what the text field will look like. If the \`fullWidth\` prop
is set to true, the text field will just span the entire width.
`,
  code: FullWidthExamplesRaw,
  children: <FullWidthExamples />,
}, {
  title: 'In Toolbars',
  code: InToolbarExampleRaw,
  children: <InToolbarExample />,
}];
