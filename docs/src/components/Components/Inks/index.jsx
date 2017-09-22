import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import DisablingInk from './DisablingInk';
import DisablingInkRaw from '!!raw-loader!./DisablingInk.jsx';

const examples = [{
  title: 'Simple Examples',
  description: `
Ink can be created with the HOC (higher order component) that will provide
an \`ink\` prop to the child component. If the component is \`disabled\` or
\`inkDisabled\` is provided to the component, the ink will not be injected.
In addition, the 'touch', 'mouse', and/or 'keyboard' triggers can be disabled.

To get an ink displayed correctly, your component **must** specify \`position: relative\`
so that the ink will be contained.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Disabling Ink',
  description: `
This example will show how you can disable ink at an application level by defining context that will
disable it. This can not be done dynamically since there are many ways to block context updates on
child components. When the ink is disabled, most of the components will have no keyboard indication
that it is focused, so it is up to you to display something.
  `,
  code: DisablingInkRaw,
  children: <DisablingInk />,
}];

const Inks = () => <ExamplesPage description={README} examples={examples} />;
export default Inks;
