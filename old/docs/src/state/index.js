import { combineReducers } from 'redux';

import airQuality from './airQuality';
import helmet from './helmet';
import docgens from './docgens';
import search from './search';
import theme from './theme';
import media from './media';
import drawer from './drawer';
import messages from './messages';
import github from './github';
import locale from './locale';
import quickNav from './quickNav';
import sassdocs from './sassdocs';
import sassdocFab from './sassdocFab';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  airQuality,
  docgens,
  helmet,
  locale,
  theme,
  search,
  github,
  media,
  messages,
  drawer,
  quickNav,
  sassdocs,
  sassdocFab,
  routing,
});
