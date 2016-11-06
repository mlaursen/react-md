import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import foodInspections from './foodInspections';
import docgens from './docgens';
import sassdocs from './sassdocs';
import drawer from './drawer';
import quickNavigation from './quickNavigation';
import notifications from './notifications';

export default combineReducers({
  entities: combineReducers({
    foodInspections,
  }),
  notifications,
  ui: combineReducers({
    drawer,
    quickNavigation,
  }),
  documentation: combineReducers({
    docgens,
    sassdocs,
  }),
  routing,
});
