import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';
import ChipsWithTextField from './ChipsWithTextField';
import ChipsWithTextFieldRaw from '!!raw!./ChipsWithTextField';
import StateChipRaw from '!!raw!./StateChip';

import './_chips.scss';

export default [{
  title: 'Simple Examples',
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Chips with a Text Field',
  code: `
/* ChipsWithTextField.jsx */
${ChipsWithTextFieldRaw}
\`\`\`

\`\`\`js
/* StateChip.jsx */
${StateChipRaw}
`,
  children: <ChipsWithTextField />,
}];
