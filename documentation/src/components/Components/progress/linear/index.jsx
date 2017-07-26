import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import description from '../description';
import Indeterminate from './Indeterminate';
import IndeterminateRaw from '!!raw-loader!./Indeterminate.jsx';
import FakeFeedRaw from '!!raw-loader!components/Components/progress/FakeFeed.jsx';
import styles from '!!raw-loader!components/Components/progress/_fake-feed.scss';

import Determinate from './Determinate';
import DeterminateRaw from '!!raw-loader!./Determinate.jsx';
import QueryIndeterminate from './QueryIndeterminate';
import QueryIndeterminateRaw from '!!raw-loader!./QueryIndeterminate.jsx';

const fullDescription = `
${description}

\`LinearProgress\` bars come in three types: \`indeterminate\`, \`determinate\`, and \`query-indeterminate\`.
Indeterminate progress bars should be used when it is unknown how long the action should take while the determinate
should be used when the action's progress is measurable. Query Indeterminate progress bars are used when the action
happens in two stages, one where the action length is not measurable and then the second part is measurable;
`;

const examples = [{
  title: 'Inderterminate Example',
  description: `
As stated above, \`indeterminate\` progress bars should be used when an action's progress can not be measurable.
This examle will show how you can create a fake feed of data and show a progress indicator while that data is
being "fetched" from a server or if the page was refreshed.
  `,
  code: `/* Indeterminate.jsx */
${IndeterminateRaw}
\`\`\`

\`\`\`jsx
/* FakeFeed.jsx */
${FakeFeedRaw}
\`\`\`

\`\`\`scss
/* _fake-feed.scss */
${styles}
  `,
  children: <Indeterminate />,
}, {
  title: 'Determinate',
  description: `
This example is basically the same as above. The only difference is that the progress will now be "measurable". This
will update the progress so that it does not spin infinitely and will grow related to its \`value\` prop.
  `,
  code: DeterminateRaw,
  children: <Determinate />,
}, {
  title: 'Query Indeterminate',
  description: `
The query indeterminate progress is only available on \`LinearProgress\`. It will display a "reverse" loading indicator
until a progress value has been applied to the progress bar.

Since the example below isn't really the best example of a real world exmple, here are the steps that are happening:
1. Render the \`LinearProgress\` with \`query={true}\` and the \`value\` prop to either \`null\` or \`undefined\`
2. Once the "measurable" progress can begin, set the \`value\` prop to your progress amount and keep
incrementing until it reaches \`100\`.
  `,
  code: QueryIndeterminateRaw,
  children: <QueryIndeterminate />,
}];

const LinearProgress = () => <ExamplesPage description={fullDescription} examples={examples} />;
export default LinearProgress;
