import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as components from './components';

import App from './App';
import Home from './Home';
import { toDashedName } from './Documentation/utils';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    {Object.keys(components).map(k => {
      const component = components[k];
      if(!component.name) {
        return;
      }
      const path = toDashedName(component.name);
      return <Route key={path} path={`components/${path}`} component={component} />;
    })}
  </Route>
);
