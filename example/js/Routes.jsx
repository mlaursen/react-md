import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as components from './components';

import App from './App';
import Dashboard from './Dashboard';

export default (
  <Route path="/BASE_ROUTER_PATH" component={App}>
    <IndexRoute component={Dashboard} />
    {Object.keys(components).map(k => {
      const component = components[k];
      if(!component.name) {
        return;
      }
      const path = component.name.replace('Doc', '').split(/(?=[A-Z])/).map(c => c.toLowerCase()).join('-');
      return <Route key={path} path={path} component={component} />;
    })}
  </Route>
);
