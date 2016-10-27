import { combineReducers } from 'redux';

import docgens from './docgens';
import sassdocs from './sassdocs';
import notifications from './notifications';

export default combineReducers({
  notifications,
  documentation: combineReducers({
    docgens,
    sassdocs,
  }),
});
