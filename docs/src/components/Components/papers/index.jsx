import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';

const examples = [{
  title: 'Simple Examples',
  code: SimpleRaw,
  children: <Simple />,
}];

const Papers = () => <ExamplesPage description={README} examples={examples} />;
export default Papers;
