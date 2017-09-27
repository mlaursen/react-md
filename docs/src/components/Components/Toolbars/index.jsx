import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithTitleMenus from './WithTitleMenus';
import WithTitleMenusRaw from '!!raw-loader!./WithTitleMenus.jsx';
import FixedToolbar from './FixedToolbar';
import FixedToolbarRaw from '!!raw-loader!./FixedToolbar.jsx';

import NavRaw from '!!raw-loader!./common/Nav.jsx';
import KebabMenuRaw from '!!raw-loader!./common/KebabMenu.jsx';
import TitleMenuRaw from '!!raw-loader!./common/TitleMenu.jsx';

const examples = [{
  title: 'Simple Examples',
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
  title: 'Fixed Toolbars',
  description: `
This example shows how you can update toolbars to be considered "App Bars" by fixing them to the top of the page.
There are some positioning CSS classes provided by react-md to help with this.

### Positioning CSS
Since the toolbar is normally used as a fixed component, some additional helper class names have been
created to help position content relative to a toolbar.

#### \`md-toolbar-relative\`
This class name will apply a \`margin-top\` to whatever element or component it has been applied to for the current
media's toolbar height.

#### \`md-toolbar-relative--prominent\`
This class name is similar to the \`md-toolbar-relative\` except that it is used with prominent toolbars instead.

#### \`md-btn--toolbar\`
This applies additional margin to buttons to center them vertically in the toolbar. This should only be used if
the buttons are not occurring in the \`actions\` or \`nav\` props.

#### \`md-toolbar--action-left\`
This applies additional \`margin-left\` to any elements to position to the left keyline in a toolbar. This should really
only be used if not using the \`nav\` and \`title\` props in a toolbar.

#### \`md-toolbar--action-right\`
This applies additional \`margin-right\` to any elements to position to the left keyline in a toolbar. This should really
only be used if not using the \`actions\` props in a toolbar.

#### \`md-title--toolbar\`
This applies additional styles for a title in the toolbar. This should only be used if not using the \`title\` prop
on a toolbar.

#### \`md-title--toolbar-offset\`
This applies additional margin-left to the title in the toolbar to match the current keyline. This should probably
only be used if not using the \`title\` prop on a toolbar.

#### \`md-title--toolbar-prominent\`
This applies additional styles to move the title to a more prominent section in the toolbar. This should probably
only be used if not using the \`title\` prop on a toolbar.
  `,
  code: FixedToolbarRaw,
  children: <FixedToolbar />,
}];

const Toolbars = () => <ExamplesPage description={README} examples={examples} />;
export default Toolbars;
