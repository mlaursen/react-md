import { FETCH_SASSDOC_REQUEST, FETCH_SASSDOC_SUCCESS, FETCH_SASSDOC_FAILURE } from 'constants/ActionTypes';

function request(state, { id }) {
  const doc = state[id] || {};
  if (doc.fetching === true) {
    return state;
  }

  return Object.assign({}, state, { [id]: { fetching: true } });
}

function success(state, { id, data }) {
  if (state[id].data === data && state[id].fetching) {
    return state;
  }

  return Object.assign({}, state, { [id]: { fetching: false, sassdoc: data } });
}

function failure(state, { id }) {
  if (state[id].fetching === false) {
    return state;
  }

  return Object.assign({}, state, { [id]: { fetching: false, sassdoc: [] } });
}


const initialState = {};

export default function sassdocs(state = initialState, action) {
  switch (action.type) {
    case FETCH_SASSDOC_REQUEST:
      return request(state, action);
    case FETCH_SASSDOC_SUCCESS:
      return success(state, action);
    case FETCH_SASSDOC_FAILURE:
      return failure(state, action);
    default:
      return state;
  }
}
