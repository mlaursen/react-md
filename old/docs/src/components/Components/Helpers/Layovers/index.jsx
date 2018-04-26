import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import ContextMenuLayover from './ContextMenuLayover';
import ContextMenuLayoverRaw from '!!raw-loader!./ContextMenuLayover.jsx';

const examples = [{
  title: 'Context Menu Layover',
  code: ContextMenuLayoverRaw,
  children: <ContextMenuLayover />,
}];

const Layovers = () => <ExamplesPage description={README} examples={examples} />;
export default Layovers;
