import { LOCATION_CHANGE } from 'state/routing';

import scrollRestoration from 'utils/scrollRestoration';

const scrolling = store => next => (action) => { // eslint-disable-line no-unused-vars
  if (action.type === LOCATION_CHANGE) {
    scrollRestoration();
  }

  next(action);
};

export default scrolling;
