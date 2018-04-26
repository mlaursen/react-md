import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SimpleListControls from './SimpleListControls';
import SimpleListControlsRaw from '!!raw-loader!./SimpleListControls.jsx';

const examples = [{
  title: 'Simple Examples',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Simple List Controls',
  description: `
Sometimes you want to have an additional action built into your \`ListItem\`. This
can be accomplished with the \`ListItemControl\` component that will accept a
\`primaryAction\` or a \`secondaryAction\` and inject additional props into it.
  `,
  code: SimpleListControlsRaw,
  children: <SimpleListControls />,
}];

const Lists = () => <ExamplesPage description={README} examples={examples} />;
export default Lists;
