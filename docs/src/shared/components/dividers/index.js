import React from 'react';
import DividerExamples from './DividerExamples';
import DividerExamplesRaw from '!!raw!./DividerExamples';

import './_styles.scss';

export default [{
  description: `
Dividers can be implemented by using the \`Divider\` component or by using the supplied class names.

When using the \`Divider\` component, you can make it \`inset\`. This basically means that it will be
styled so that it matches the keyline in a \`List\`.

To use the supplied class names, just apply \`md-divider-border md-divider-border--POSITION\`. So if
it is required to have a border above a component, here is how it would work:

\`\`\`js
<MyAwesomeComponent className="md-divider-border md-divider-border--below" />
\`\`\`
`,
  code: DividerExamplesRaw,
  children: <DividerExamples />,
}];
