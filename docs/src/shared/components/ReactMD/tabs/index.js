import React from 'react';

import SimpleTabs from './SimpleTabs';
import SimpleTabsRaw from '!!raw!./SimpleTabs';

import MusicTabExample from './MusicTabExample';
import MusicTabExampleRaw from './MusicTabExample/code';

import IconTabs from './IconTabs';
import IconTabsRaw from '!!raw!./IconTabs';

export default [{
  title: 'Simple Tab Example',
  description: `
This example shows the basic usage of \`TabContainer\`, \`Tabs\`, and the
\`Tab\` component. Unfortunately because of how the components traverse
the \`children\` tree, these components must all be defined in the same file.
The tab's children can be extracted out though.
`,
  code: SimpleTabsRaw,
  children: <SimpleTabs />,
}, {
  title: 'Tabs with Labels and Icons',
  code: IconTabsRaw,
  children: <IconTabs />,
}, {
  title: 'Music Store Example',
  description: `
One of the problems of using \`react-swipeable-views\` for the sliding animation is that all the
tab panels (content) will be equal height. So if all the tabs do not contain the same amount of
content, there will be a lot of white-space at the end of the panel.

It is always possible to use the \`animateHeight\` prop on the swipeable views, but that adds heavy
performance impact and it does not work when doing async loading of content. The \`TabsContainer\`
component will instead manually calculate the height when the active tab index changes. If you are
doing async loading (last 3 tabs in this example), you will need to do a \`TabsContainer.forceUpdate()\`
once the content has been loaded to get the correct height applied.

The demo will be in a full screen dialog and allow you to see this in action by fetching additional
artists and albums.
  `,
  code: MusicTabExampleRaw,
  children: <MusicTabExample />,
}];
