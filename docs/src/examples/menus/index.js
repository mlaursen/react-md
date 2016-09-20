import React from 'react';

import MenuExamples from './MenuExamples';
import MenuExamplesRaw from '!!raw!./MenuExamples';

import MenuButtonExamples from './MenuButtonExamples';
import MenuButtonExamplesRaw from '!!raw!./MenuButtonExamples';

import ContextMenuExample from './ContextMenuExample';
import ContextMenuExampleRaw from '!!raw!./ContextMenuExample';

import './_menus.scss';

export default [{
  title: 'Static Examples',
  code: MenuExamplesRaw,
  children: <MenuExamples />,
}, {
  title: 'Menu Button Examples',
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}, {
  title: 'Context Menu Example',
  description: `
> This is an example replacing the default context menu with the \`Menu\` component. The
items will be visible if you right click anywhere in the Lorem Ipsum text below.
`,
  code: ContextMenuExampleRaw,
  children: <ContextMenuExample />,
}];
