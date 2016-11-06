import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';
import IconSCSS from '!!raw!./_icon-separators.scss';

export default [{
  title: 'Simple Examples',
  code: `
/* SimpleExamples.jsx */
${SimpleExamplesRaw}

\`\`\`

\`\`\`scss
/* _icon-separators.scss */
${IconSCSS}
`,
  children: <SimpleExamples />,
}];
