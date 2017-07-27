import client from '!!raw-loader!client/index.jsx';

export default `
Pickers provide a simple way to select a single value from a pre-determined set. Since
the material design spec requires the pickers to be formatted to the user's locale, the
\`Intl.DateTimeFormat\` is used for formatting. Unfortunately, this means it is kind of
hard to get custom formatting that does not adhere to that spec and that it must be polyfilled
in browsers that do not natively support it.


Here is a minimal intl polyfill example:

\`\`\`jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

if (!window.Intl) {
  const locale = window.navigator.userLanguage || window.navigator.language || 'en-US';
  Promise.all([
    import('intl'),
    import(\`intl/locale-data/jsonp/\${locale}\`)
  ]).then(() => {
    renderApp();
  });
} else {
  renderApp();
}
\`\`\`

If you want a more detailed example, here is how this documentation site is rendered:

\`\`\`jsx
${client}
\`\`\`
`;
