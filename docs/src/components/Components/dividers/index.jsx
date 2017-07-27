import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import StylesOnly from './StylesOnly';
import StylesOnlyRaw from '!!raw-loader!./StylesOnly.jsx';

const examples = [{
  title: 'Simple Examples',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Using Styles Only',
  description: `
Since it can sometimes be useful to have borders without requiring a \`div\` or \`hr\`, dividers
can also be created by just using the provided class names.
  `,
  code: StylesOnlyRaw,
  children: <StylesOnly />,
}];

const Dividers = () => <ExamplesPage description={README} examples={examples} />;
export default Dividers;
