import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import routes from './Routes.jsx';

ReactDOM.render((
  <Router history={createHashHistory()}>
    {routes}
  </Router>
), document.getElementById('app'));
