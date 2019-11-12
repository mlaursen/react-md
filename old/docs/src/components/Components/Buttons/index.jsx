import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Flat from './Flat';
import FlatRaw from '!!raw-loader!./Flat.jsx';
import Raised from './Raised';
import RaisedRaw from '!!raw-loader!./Raised.jsx';
import Icon from './Icon';
import IconRaw from '!!raw-loader!./Icon.jsx';
import Floating from './Floating';
import FloatingRaw from '!!raw-loader!./Floating.jsx';

const examples = [{
  title: 'Flat Buttons',
  code: FlatRaw,
  children: <Flat />,
}, {
  title: 'Raised Buttons',
  code: RaisedRaw,
  children: <Raised />,
}, {
  title: 'Icon Buttons',
  code: IconRaw,
  children: <Icon />,
}, {
  title: 'Floating Buttons',
  code: FloatingRaw,
  children: <Floating />,
}];

const Buttons = () => <ExamplesPage description={README} examples={examples} />;
export default Buttons;
