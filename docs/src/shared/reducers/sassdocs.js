import { FETCH_SASSDOC_REQUEST, FETCH_SASSDOC_SUCCESS, FETCH_SASSDOC_FAILURE } from 'constants/ActionTypes';
import reduceKey from 'utils/StateUtils/reduceKey';

const DEFAULT_STATE = {
  placeholders: [],
  variables: [],
  functions: [],
  mixins: [],
};

function request(state, { id }) {
  const doc = state[id] || {};
  if (doc.fetching === true) {
    return state;
  }

  return Object.assign({}, state, { [id]: { fetching: true, ...DEFAULT_STATE } });
}

function success(state, { id, data: sassdocs }) {
  if (reduceKey(state, id) === sassdocs) {
    return state;
  } else if (Array.isArray(id)) {
    const [section, component] = id;
    return Object.assign({}, state, Object.assign({}, state[section], {
      [section]: {
        [component]: { fetching: false, ...sassdocs },
      },
    }));
  }

  return Object.assign({}, state, {
    [id]: { fetching: false, ...sassdocs },
  });
}

function failure(state, { id }) {
  if (state[id].fetching === false) {
    return state;
  }

  return Object.assign({}, state, { [id]: { fetching: false, ...DEFAULT_STATE } });
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
