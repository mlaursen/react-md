import { DEFAULT_STATE, handleLocationChange } from 'reducers/quickNavigation';

export default function getInitialQuickNavigationState(req) {
  return handleLocationChange(DEFAULT_STATE, { pathname: req.url });
}
