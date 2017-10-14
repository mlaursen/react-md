import { combineReducers } from 'redux';

import animationKey from './animationKey';
import toolbarTitle from './toolbarTitle';
import toolbarProminent from './toolbarProminent';
import visibleBoxShadow from './visibleBoxShadow';
import contentProps from './contentProps';

export default combineReducers({
  animationKey,
  toolbarTitle,
  toolbarProminent,
  visibleBoxShadow,
  contentProps,
});
