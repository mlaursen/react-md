import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import PageLayoutAndIcons from './PageLayoutAndIcons';
import PageLayoutAndIconsRaw from './PageLayoutAndIcons/code';

import DocumentationTabsRaw from '!!raw-loader!components/DocumentationTabs/index.jsx';
import DocumentationTabsStyles from '!!raw-loader!components/DocumentationTabs/_styles.scss';

const examples = [{
  title: 'Simple Example',
  description: `
This will be the most simple example of showing how you can use the \`TabsContainer\`, \`Tabs\`, and \`Tab\`
components together to display some content. When using tabs, you need to provide a unique id to each \`Tab\`
or provide a \`tabId\` to the \`Tabs\` component. These ids are required for accessibility and help when
you need additional control of the content (see next example).
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'As a Page Layout (and icons)',
  description: `
Since \`Tabs\` _normally_ are a full page layout type of thing, the \`TabsContainer\` can be updated to include
a toolbar and be fixed to the top of the page. This will apply some additional styles and class names to offset
the tab panels and fix the toolbar + tabs to the top of the page.
  `,
  code: PageLayoutAndIconsRaw,
  children: <PageLayoutAndIcons />,
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
