import { combineReducers } from 'redux';

import helmet from './helmet';
import theme from './theme';
import media from './media';
import drawer from './drawer';
import examples from './examples';
import quickNav from './quickNav';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  helmet,
  theme,
  examples,
  media,
  drawer,
  quickNav,
  routing,
});
