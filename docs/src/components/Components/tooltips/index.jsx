import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import ButtonExamples from './ButtonExamples';
import ButtonExamplesRaw from '!!raw-loader!./ButtonExamples.jsx';
import CustomExamples from './CustomExamples';
import CustomExamplesRaw from '!!raw-loader!./CustomExamples.jsx';

const examples = [{
  title: 'Button Examples',
  description: `
Tooltips are automatically built in to the \`Button\` component and will be displayed
if the \`tooltipLabel\` prop is defined.
  `,
  code: ButtonExamplesRaw,
  children: <ButtonExamples />,
}, {
  title: 'Custom Examples',
  description: `
This example will show how you can create your own versions of tooltipped components
with the usage of the \`injectTooltip\` HOC.
  `,
  code: CustomExamplesRaw,
  children: <CustomExamples />,
}];

const Tooltips = () => <ExamplesPage description={README} examples={examples} />;
export default Tooltips;
