import React from 'react';

import SimpleMobileExample from './SimpleMobileExample';
import SimpleMobileExampleRaw from '!!raw!./SimpleMobileExample';

import ScrollableTabsExample from './ScrollableTabsExample';
import ScrollableTabsExampleRaw from '!!raw!./ScrollableTabsExample';

export default [{
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
