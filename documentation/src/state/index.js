import { combineReducers } from 'redux';

import media from './media';
import drawer from './drawer';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  media,
  drawer,
  routing,
});
