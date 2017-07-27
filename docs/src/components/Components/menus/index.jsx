import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import MenuButtonExamples from './MenuButtonExamples';
import MenuButtonExamplesRaw from '!!raw-loader!./MenuButtonExamples.jsx';
import DropdownMenuExamples from './DropdownMenuExamples';
import DropdownMenuExamplesRaw from './DropdownMenuExamples/code';
import GoogleDocsClone from './GoogleDocsClone';
import GoogleDocsCloneRaw from './GoogleDocsClone/code';

const examples = [{
  title: 'Menu Button Examples',
  description: `
The \`MenuButton\` and \`DropdownMenu\` components require a list of \`menuItems\` to display as \`ListItem\`.
The menu items can either be:
- \`number\`
- \`string\`
- \`object\`
- \`ListItem\`

If the item is a \`number\` or a \`string\`, it will be displayed as a \`ListItem\`'s \`primaryText\`.
If the item is an \`object\`, it will consider it an object of \`ListItem\` \`props\` and just pass it
to the \`ListItem\` component. Finally, if it is the \`ListItem\`, it will be displayed as-is.
  `,
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}, {
  title: 'Dropdown Menu Examples',
  description: `
The \`DropdownMenu\` component is a bit lower level than the \`MenuButton\` because you will need to create
your own \`toggle\` component for the \`Menu\` to attach to. It is useful since it allows you to create
some more interesting components than what is only available with the \`MenuButton\`.
  `,
  code: DropdownMenuExamplesRaw,
  children: <DropdownMenuExamples />,
}, {
  title: 'Google Docs Clone',
  description: `
The following example is a Google docs clone with about 0.01% of the functionality! It is quite amazing
if I do say so myself. The main purpose of this demo is to show how you can create cascading menus and
custom context menus.

> NOTE: This is a **very complex** example and there is a lot of code (1500+ lines). This should really only
be viewed if you have a good understanding of the majority of the components in react-md
  `,
  code: GoogleDocsCloneRaw,
  children: <GoogleDocsClone />,
}];

const Menus = () => <ExamplesPage description={README} examples={examples} />;
export default Menus;
