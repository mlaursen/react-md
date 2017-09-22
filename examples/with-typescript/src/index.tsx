import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFontLoader from 'webfontloader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
