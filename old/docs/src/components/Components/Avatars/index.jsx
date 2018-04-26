import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import Random from './Random';
import RandomRaw from '!!raw-loader!./Random.jsx';

const examples = [{
  title: 'Simple',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Random',
  code: RandomRaw,
  children: <Random />,
}];

const Avatars = () => <ExamplesPage description={README} examples={examples} />;

export default Avatars;
