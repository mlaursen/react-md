import React from 'react';

import ContextMenuLayover from './ContextMenuLayover';
import ContextMenuLayoverRaw from '!!raw!./ContextMenuLayover';

import LayoverPlayground from './LayoverPlayground';
import LayoverPlaygroundRaw from '!!raw!./LayoverPlayground';
import PlaygroundFormRaw from '!!raw!./PlaygroundForm';

import LayoverPlaygroundStyles from '!!raw!./_layovers.scss';

export default [{
  title: 'Context Menu Layover',
  code: ContextMenuLayoverRaw,
  children: <ContextMenuLayover />,
}, {
  title: 'Layover Playground',
  description: `
Here is a little playground where you can try some of the different
use cases of the layover.
  `,
  code: `
/* LayoverPlayground.jsx */
${LayoverPlaygroundRaw}
\`\`\`

\`\`\`js
${PlaygroundFormRaw}
\`\`\`

\`\`\`scss
${LayoverPlaygroundStyles}
`,
  children: <LayoverPlayground />,
}];
