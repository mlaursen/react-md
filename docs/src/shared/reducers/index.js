import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import documentation from './documentation';
import drawer from './drawer';
import media from './media';
import overlay from './overlay';
import quickNav from './quickNav';
import quickSearch from './quickSearch';
import snackbar from './snackbar';
import theme from './theme';

export default combineReducers({
  documentation,
  quickSearch,
  routing,
  ui: combineReducers({
    drawer,
    media,
    overlay,
    quickNav,
    snackbar,
    theme,
  }),
});
