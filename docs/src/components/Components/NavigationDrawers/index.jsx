import React from 'react';
import { Link } from 'react-router-dom';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';

import AppRaw from '!!raw-loader!components/App/index.jsx';
import RoutingExampleRaw from '!!raw-loader!./RoutingExample/RoutingExample.jsx';

const examples = [{
  title: 'Simple Example',
  description: `
If you saw the [Drawer](/components/drawers) examples before this example, hopefully the
\`NavigationDrawer\` example will be simple since it is just a wrapper. It exposes props
to pass to both the \`Drawer\` and \`Toolbar\` components.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'This App\'s NavigationDrawer',
  description: `
You can also look at how this entire website was set up by checking the source code here. It
might be a bit more helpful to look through on GitHub though.
  `,
  code: AppRaw,
  children: null,
}, {
  title: 'React Router Example',
  description: `
This example will be almost exactly as the [Drawer](/components/drawers#react-router-example)
except it will show how much boilerplate the \`NavigationDrawer\` removes for you.

My site uses path params to fetch documentation/examples/SassDoc, you will need to navigate to a different
route to actually view the demo. Please click the link below to see this example in action. The code for the example
is still available here by clicking the code expander button.
  `,
  code: RoutingExampleRaw,
  children: <Link to="/discover-more/routing-examples/navigation-drawers">View Demo</Link>,
}];

const NavigationDrawers = () => <ExamplesPage description={README} examples={examples} />;
export default NavigationDrawers;
