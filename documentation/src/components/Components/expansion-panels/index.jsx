import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';

const examples = [{
  title: 'Simple Example',
  code: SimpleRaw,
  children: <Simple />,
}];

const ExpansionPanels = () => <ExamplesPage description={README} examples={examples} />;
export default ExpansionPanels;
