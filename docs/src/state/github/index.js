import { combineReducers } from 'redux';
import cache from './cache';
import rateLimits from './rateLimits';

export * from './cache';
export * from './rateLimits';

export default combineReducers({
  cache,
  rateLimits,
});
