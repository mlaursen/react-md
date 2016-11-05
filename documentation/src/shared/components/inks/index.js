import React from 'react';
import InkExamples from './InkExamples';
import InkExamplesRaw from '!!raw!./InkExamples';
import TerriblyInaccessibleFakeButtonRaw from '!!raw!./TerriblyInaccessibleFakeButton';
import SCSS from '!!raw!./_terribly-inaccessible-fake-button.scss';

export default [{
  code: `
/* TerriblyInaccessibleFakeButton.jsx */
${TerriblyInaccessibleFakeButtonRaw}
\`\`\`

\`\`\`scss
/* terribly-inaccessbile-fake-button.scss */
${SCSS}
\`\`\`

\`\`\`js
/* InkExamples.jsx */
${InkExamplesRaw}
`,
  children: <InkExamples />,
}];
