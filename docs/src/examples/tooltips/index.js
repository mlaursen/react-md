import React from 'react';

import './_tooltips.scss';
import CustomExamples from './CustomExamples';
import CustomExamplesRaw from '!!raw!./CustomExamples';
import TooltipFontIconRaw from '!!raw!./TooltipFontIcon';
import TooltipLinkRaw from '!!raw!./TooltipLink';

import ButtonExamples from './ButtonExamples';
import ButtonExamplesRaw from '!!raw!./ButtonExamples';

export default [{
  title: 'On Custom Components',
  code: `
/* CustomExamples.jsx */
${CustomExamplesRaw}
\`\`\`

\`\`\`js
/* TooltpFontIcon.jsx */
${TooltipFontIconRaw}
\`\`\`

\`\`\`js
/* TooltipLink.jsx */
${TooltipLinkRaw}
`,
  children: <CustomExamples />,
}, {
  title: 'On Icon/Floating Buttons',
  description: `
Tooltips are automatically built into \`FloatingButton\`s and \`IconButton\`s.
The only thing required is to add the props \`tooltipLabel\` and \`tooltipPosition\`
(optional) to have them appear.
  `,
  code: ButtonExamplesRaw,
  children: <ButtonExamples />,
}];
