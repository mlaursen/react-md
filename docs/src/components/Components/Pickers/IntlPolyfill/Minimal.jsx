import React from 'react';
import Markdown from 'components/Markdown';

const markdown = `
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

This example will use the browser's locale to determine the current user's locale. Once the locale
has been determined, the intl polyfill will be loaded as well as the corresponding locale data. Once
all the required data has been loaded, the default React application will render.
`;

const Minimal = () => <Markdown markdown={markdown} />;
export default Minimal;
