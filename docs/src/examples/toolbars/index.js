import React from 'react';

import './_styles.scss';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import SearchToolbarExample from './SearchToolbarExample';
import SearchToolbarExampleRaw from '!!raw!./SearchToolbarExample';

import FlexibleSpaceExample from './FlexibleSpaceExample';
import FlexibleSpaceExampleRaw from '!!raw!./FlexibleSpaceExample';

// import ToolbarWithTabsExample from './ToolbarWithTabsExample';
// import ToolbarWithTabsExampleRaw from '!!raw!./ToolbarWithTabsExample';

export default [{
  title: 'Simple Example',
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'Toolbar with Search Example',
  code: SearchToolbarExampleRaw,
  children: <SearchToolbarExample />,
}, {
  title: 'Toolbar with Flexible Space',
  description: `
This example only works when scrolling with the mouse, (or Mac trackpad) and
touch devices because I was too lazy to implement keyboard and scrollback clicking.
Just scroll anywhere in the _phone container_ to see how the flexible space changes.
It actually really only looks nice on mobile devices or a Mac's trackpad... Sigh.
`,
  code: FlexibleSpaceExampleRaw,
  children: <FlexibleSpaceExample />,
}];
