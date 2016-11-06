import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';
import FakeSCSS from '!!raw!./_fake.scss';

export default [{
  title: 'Simple Examples',
  code: `
/* SimpleExamples.jsx */
${SimpleExamplesRaw}
\`\`\`

\`\`\`scss
/* _fake.scss */
${FakeSCSS}
`,
  children: <SimpleExamples />,
}];
