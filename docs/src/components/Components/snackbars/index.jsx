import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import Interactive from './Interactive';
import InteractiveRaw from '!!raw-loader!./Interactive.jsx';

const examples = [{
  title: 'Simple Examples',
  description: `
To create a new toast in the snackbar, you must create an object for displaying the toast. The object
**must** contain a \`text\` key and then an optional \`action\` key. The action can either be a string,
number, or an object of props to provide to a button.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Interactive Demo',
  description: `
This following example will allow you to set different props on the Snackbar and see how it affects the
resulting toast.
  `,
  code: InteractiveRaw,
  children: <Interactive />,
}];

const Snackbars = () => <ExamplesPage description={README} examples={examples} />;
export default Snackbars;
