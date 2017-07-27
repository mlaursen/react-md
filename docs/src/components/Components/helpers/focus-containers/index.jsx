import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import ContainedFormExample from './ContainedFormExample';
import ContainedFormExampleRaw from '!!raw-loader!./ContainedFormExample.jsx';

const examples = [{
  title: 'Contained Form Example',
  description: `
This example will show how you can trap keyboard focus inside of a form. The tab focus will
only be allowed on non-disabled cells and components that are considered tabbable.

> A few components use this behind the scenes for keyboard accessibility.
  `,
  code: ContainedFormExampleRaw,
  children: <ContainedFormExample />,
}];

const FocusContainers = () => <ExamplesPage description={README} examples={examples} />;
export default FocusContainers;
