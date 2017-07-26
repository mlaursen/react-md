import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithTitleMenus from './WithTitleMenus';
import WithTitleMenusRaw from '!!raw-loader!./WithTitleMenus.jsx';
import SimpleSearch from './SimpleSearch';
import SimpleSearchRaw from '!!raw-loader!./SimpleSearch.jsx';

import NavRaw from '!!raw-loader!./common/Nav.jsx';
import KebabMenuRaw from '!!raw-loader!./common/KebabMenu.jsx';
import TitleMenuRaw from '!!raw-loader!./common/TitleMenu.jsx';

const examples = [{
  title: 'Simple Exmaples',
  description: `
This will showcase some of the styling that you can apply to a toolbar and example usage
of adding a navigation button or additional actions.

When the \`nav\` prop is provided, a positioning \`className\` will be cloned into your element,
so if your component does not accept and apply a \`className\` prop, it might display weirdly.
If you use any component in \`react-md\`, this should not be a problem. It will only be for custom
components.

The same happens to the \`actions\` prop.
  `,
  code: `/* Simple.jsx */
${SimpleRaw}
\`\`\`

\`\`\`jsx
/* Nav.jsx */
${NavRaw}
\`\`\`

\`\`\`jsx
/* KebabMenu.jsx */
${KebabMenuRaw}
  `,
  children: <Simple />,
}, {
  title: 'Using a Title Menu',
  description: `
There are cases where the main title should be a dropdown menu of different actions instead of some
plain text. If you supply a \`titleMenu\` instead of \`title\`, you can get some additional styling
to get these menus to work.
  `,
  code: `/* WithTitleMenus.jsx */
${WithTitleMenusRaw}
\`\`\`

\`\`\`jsx
/* Nav.jsx */
${NavRaw}
\`\`\`

\`\`\`jsx
/* KebabMenu.jsx */
${KebabMenuRaw}
\`\`\`

\`\`\`jsx
/* TitleMenuRaw.jsx */
${TitleMenuRaw}
  `,
  children: <WithTitleMenus />,
}, {
  title: 'Simple Search',
  description: `
This is just a simple example of adding search functionality into a toolbar.
  `,
  code: SimpleSearchRaw,
  children: <SimpleSearch />,
}];

const Toolbars = () => <ExamplesPage description={README} examples={examples} />;
export default Toolbars;
