import { LOCATION_CHANGE } from 'state/routing';
import { DOCGEN_SUCCESS } from 'state/docgens';
import { SASSDOC_SUCCESS } from 'state/sassdocs';
import { ASYNC_CONTENT_LOADED } from 'state/drawer/contentProps';
import scrollTo from 'utils/scrollTo';

const scrolling = store => next => (action) => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case LOCATION_CHANGE:
    case DOCGEN_SUCCESS:
    case SASSDOC_SUCCESS:
    case ASYNC_CONTENT_LOADED:
      scrollTo();
      break;
    default:
  }
  next(action);
};

export default scrolling;
