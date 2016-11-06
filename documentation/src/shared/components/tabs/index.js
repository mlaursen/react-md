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
  code: MusicTabExampleRaw,
  children: <MusicTabExample />,
}];
