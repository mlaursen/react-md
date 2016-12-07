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
  description: `This example shows some static menus that are always open. To make the
menu accessible to screen readers, it is recommended to add an \`id\` prop.`,
  code: MenuExamplesRaw,
  children: <MenuExamples />,
}, {
  title: 'Menu Button Examples',
  description: `
The \`Menu\` component might not be used as much since it is generally used by existing components.
The \`Autocomplete\`, \`SelectField\` and \`MenuButton\` components use this behind the scene.

The example below shows how a menu can be linked together with a button.
  `,
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}, {
  title: 'Context Menu Example',
  description: `
###### This is an example replacing the default context menu with the \`Menu\` component. The items will be visible if you right click anywhere in the Lorem Ipsum text below.
`,
  code: ContextMenuExampleRaw,
  children: <ContextMenuExample />,
}];
