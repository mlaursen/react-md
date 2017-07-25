import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithIcons from './WithIcons';
import WithIconsRaw from '!!raw-loader!./WithIcons.jsx';

import DocumentationTabsRaw from '!!raw-loader!components/DocumentationTabs/index.jsx';
import DocumentationTabsStyles from '!!raw-loader!components/DocumentationTabs/_styles.scss';

const examples = [{
  title: 'Simple Example',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'With Icons',
  code: WithIconsRaw,
  children: <WithIcons />,
}, {
  title: 'Custom Usage',
  description: `
There are times where you don't need the \`TabsContainer\` component to handle selecting
active tab content for you and adding swiping. For these cases, you can just use the \`Tabs\`
with a list of \`Tab\` that have no children. For this documentation site, I am using
the \`Tabs\` component with \`react-router\` to change the route and display different
content in the \`NavigationDrawer\`'s content.

Check out the source code in this card to see how the \`DocumentationTabs\` was added.
  `,
  code: `/* DocumentationTabs.jsx */
${DocumentationTabsRaw}
\`\`\`

\`\`\`scss
${DocumentationTabsStyles}
  `,
  children: null,
}];

const Tabs = () => <ExamplesPage description={README} examples={examples} />;
export default Tabs;
