import { LOCATION_CHANGE } from 'state/routing';

function createKey(state, { pathname, search }) {
  const isRoutingExample = pathname.match(/routing-examples/);
  if (isRoutingExample && state) {
    return state;
  } else if (isRoutingExample) {
    return 'routing-example';
  }

  return `${pathname}${search}`;
}

const INITIAL_STATE = typeof window !== 'undefined' ? createKey(null, window.location) : '';

export default function animationKey(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return createKey(state, action.payload.location);
    default:
      return state;
  }
}
