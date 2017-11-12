import React from 'react';

import Markdown from 'components/Markdown';

import client from '!!raw-loader!client/index.jsx';
import loadIntl from '!!raw-loader!client/loadIntl.js';
import render from '!!raw-loader!client/render.ssr.jsx';

const markdown = `
If you want a more detailed example, here is how this documentation server is polyfilled:

\`\`\`jsx
/* src/client/index.jsx */
${client}
\`\`\`

\`\`\`jsx
/* src/client/loadIntl.js */
${loadIntl}
\`\`\`

\`\`\`jsx
/* src/client/render.jsx */
${render}
\`\`\`
`;

const Complex = () => <Markdown markdown={markdown} />;
export default Complex;
