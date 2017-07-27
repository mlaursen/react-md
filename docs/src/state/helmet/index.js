import { combineReducers } from 'redux';

export { updateDescription, updateKeywords } from './meta';
export { updateCustomTheme } from './link';

import meta from './meta';
import link from './link';

export default combineReducers({
  meta,
  link,
});
