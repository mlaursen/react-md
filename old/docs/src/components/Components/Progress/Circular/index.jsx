import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import description from '../description';
import Indeterminate from './Indeterminate';
import IndeterminateRaw from '!!raw-loader!./Indeterminate.jsx';
import FakeFeedRaw from '!!raw-loader!components/Components/Progress/FakeFeed.jsx';
import styles from '!!raw-loader!components/Components/Progress/_fake-feed.scss';

import Determinate from './Determinate';
import DeterminateRaw from '!!raw-loader!./Determinate.jsx';

const fullDescription = `
${description}

\`CircularProgress\` bars come in two types: \`indeterminate\` and \`determinate\`. Indeterminate
progress bars should be used when it is unknown how long the action should take while the determinate
should be used when the action's progress is measurable.
`;

const examples = [{
  title: 'Indeterminate Example',
  description: `
As stated above, \`indeterminate\` progress bars should be used when an action's progress can not be measurable.
This example will show how you can create a fake feed of data and show a progress indicator while that data is
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
}];

const CircularProgress = () => <ExamplesPage description={fullDescription} examples={examples} />;
export default CircularProgress;
