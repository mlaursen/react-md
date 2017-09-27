import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';

import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithTextFields from './WithTextFields';
import WithTextFieldsRaw from './WithTextFields/code';

const examples = [{
  title: 'Simple',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'With Text Fields',
  code: WithTextFieldsRaw,
  children: <WithTextFields />,
}];

const Chips = () => <ExamplesPage description={README} examples={examples} />;
export default Chips;
