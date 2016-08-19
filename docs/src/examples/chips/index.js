import React from 'react';
import ChipExamples from './ChipExamples';
import ChipExamplesRaw from '!!raw!./ChipExamples';

import ChipsWithTextField from './ChipsWithTextField';
import ChipsWithTextFieldRaw from '!!raw!./ChipsWithTextField';
import StateChipRaw from '!!raw!./StateChip';

import './_chips.scss';

export default [{
  code: ChipExamplesRaw,
  children: <ChipExamples />,
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
