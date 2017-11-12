import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';

const examples = [{
  title: 'Simple Example',
  description: `
This is a simple example that shows how you can hook into the \`ResizeObserver\` to watch and display
changes in \`height\` or \`width\` of a single element. The component below will randomly change
\`max-height\` and \`max-width\` values to show live updates. You can also manually resize the browser
to see how outside changes can also affect the size.

By default, the \`ResizeObserver\` **will not listen to any resize events**. You will need to enable \`watchHeight\`
and/or \`watchWidth\` for the \`onResize\` callback to be called.
  `,
  code: SimpleRaw,
  children: <Simple />,
}];

const ResizeObservers = () => <ExamplesPage description={README} examples={examples} />;
export default ResizeObservers;
