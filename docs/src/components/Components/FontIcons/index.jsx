import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithColors from './WithColors';
import WithColorsRaw from '!!raw-loader!./WithColors.jsx';

const examples = [{
  title: 'Simple Examples',
  description: `
The \`FontIcon\` component is used to work with _hopefully_ all existing font icon
libraries. By default every icon in this library will user material-icons to be
displayed but you can change the icon with the \`iconClassName\` prop.

To be able to display any icons at all, you will need to manually include the font library
with a \`<link>\` or anything else for it to be displayed.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'With Colors',
  description: `
The \`FontIcon\` also has support to gain theme, disabled, or error colors as well as inheriting
colors from its parents.
  `,
  code: WithColorsRaw,
  children: <WithColors />,
}];

const FontIcons = () => <ExamplesPage description={README} examples={examples} />;
export default FontIcons;
