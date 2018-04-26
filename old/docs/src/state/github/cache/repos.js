import { GITHUB_SUCCESS } from './';

function updateRepos(state, { data, endpoint }) {
  const matches = endpoint.match(/\/users\/(.*)\/repos/);
  if (!matches) {
    return state;
  }

  const [, username] = matches;
  if (!username) {
    return state;
  }

  return { ...state, [username]: data };
}

export default function repos(state = {}, action) {
  switch (action.type) {
    case GITHUB_SUCCESS:
      return updateRepos(state, action.payload);
    default:
      return state;
  }
}
