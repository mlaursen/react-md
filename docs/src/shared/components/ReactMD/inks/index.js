import React from 'react';
import InkExamples from './InkExamples';
import InkExamplesRaw from '!!raw!./InkExamples';
import TerriblyInaccessibleFakeButtonRaw from '!!raw!./TerriblyInaccessibleFakeButton';
import SCSS from '!!raw!./_terribly-inaccessible-fake-button.scss';

const description = `
In react-md, most of the components that will need an ink interaction will already have been
created for you. However if you need to create a custom component that has ink, there is a
publically facing (and internally used) higher order component for injecting ink as a prop.

By default, an ink will be created when:
- A user touches the component
- A user clicks the component
- A user focuses the component

The ink creation can be disabled by one of the following:
- passing disabled to your custom component
- passing inkDisabled to your custom component
- passing an array of \`['keyboard', 'touch', 'mouse']\` to the component where the array contains
the ink creation to ignore.
`;

const code = `
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
`;

export default [{
  code,
  description,
  title: 'Simple Examples',
  children: <InkExamples />,
}];
