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

const IconSeparators = () => <ExamplesPage description={README} examples={examples} />;
export default IconSeparators;
