import { combineReducers } from 'redux';

import toolbarTitle from './toolbarTitle';
import toolbarProminent from './toolbarProminent';
import visibleBoxShadow from './visibleBoxShadow';
import contentProps from './contentProps';

export default combineReducers({
  toolbarTitle,
  toolbarProminent,
  visibleBoxShadow,
  contentProps,
});
