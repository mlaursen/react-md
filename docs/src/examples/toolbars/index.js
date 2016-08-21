import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import ToolbarWithTabsExample from './ToolbarWithTabsExample';
import ToolbarWithTabsExampleRaw from '!!raw!./ToolbarWithTabsExample';

export default [{
  title: 'Simple Example',
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'Toolbar With Tabs Example',
  code: ToolbarWithTabsExampleRaw,
  children: <ToolbarWithTabsExample />,
}];
