import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import routes from './Routes.jsx';

ReactDOM.render((
  <Router history={createHashHistory({ queryKey: false })} onUpdate={() => window.scrollTo(0, 0)}>
    {routes}
  </Router>
), document.getElementById('app'));
