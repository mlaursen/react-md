import React from 'react';
import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import SimpleControlsExamples from './SimpleControlsExamples';
import SimpleControlsExamplesRaw from '!!raw!./SimpleControlsExamples';

export default [{
  title: 'Simple Example',
  description: `
Lists can contain text, icons, avatars, and up to two additional lines of text.
  `,
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Simple Controls Example',
  description: `
If you want to have a list that uses a \`SelectionControl\` component, use the \`ListItemControl\`
component instead of \`ListItem\`. This will extract the \`label\` from the \`SelectionControl\` and
inject it as the \`primaryText\` of the list item.
`,
  code: SimpleControlsExamplesRaw,
  children: <SimpleControlsExamples />,
}];
