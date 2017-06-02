import { combineReducers } from 'redux';

import media from './media';
import drawer from './drawer';
import examples from './examples';
import quickNav from './quickNav';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  examples,
  media,
  drawer,
  quickNav,
  routing,
});
