import React from 'react';

import SimpleTabs from './SimpleTabs';
import SimpleTabsRaw from '!!raw!./SimpleTabs';

import TabbedToolbarExample from './TabbedToolbarExample';
import TabbedToolbarExampleRaw from '!!raw!./TabbedToolbarExample';

import SimpleMobileExample from './SimpleMobileExample';
import SimpleMobileExampleRaw from '!!raw!./SimpleMobileExample';

import ScrollableTabsExample from './ScrollableTabsExample';
import ScrollableTabsExampleRaw from '!!raw!./ScrollableTabsExample';

export default [{
  title: 'Simple Tabs',
  code: SimpleTabsRaw,
  children: <SimpleTabs />,
}, {
  title: 'Tabbed Toolbar',
  code: TabbedToolbarExampleRaw,
  children: <TabbedToolbarExample />,
}, {
  title: 'Mobile Tabs',
  code: SimpleMobileExampleRaw,
  children: <SimpleMobileExample />,
}, {
  title: 'Scollable Tabs',
  code: ScrollableTabsExampleRaw,
  children: <ScrollableTabsExample />,
}];

// import SimpleExample from './SimpleExample';
// import SimpleExampleRaw from '!!raw!./SimpleExample';
//
// import InToolbarExample from './InToolbarExample';
// import InToolbarExampleRaw from '!!raw!./InToolbarExample';
//
// export default [{
//   title: 'Simple Example',
//   code: SimpleExampleRaw,
//   children: <SimpleExample />,
// }, {
//   title: 'In a Toolbar Example',
//   code: InToolbarExampleRaw,
//   children: <InToolbarExample />,
// }];
