import { FETCH_DOCGEN_REQUEST, FETCH_DOCGEN_SUCCESS, FETCH_DOCGEN_FAILURE } from 'constants/ActionTypes';
import reduceKey from 'utils/StateUtils/reduceKey';

function addDocgen(state, { id, data: docgens }) {
  if (reduceKey(state, id) === docgens) {
    return state;
  }

  return Object.assign({}, state, {
    [id]: docgens,
  });
}

const initialState = {};
export default function docgens(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCGEN_REQUEST:
      return state;
    case FETCH_DOCGEN_SUCCESS:
      return addDocgen(state, action);
    case FETCH_DOCGEN_FAILURE:
      return state;
    default:
      return state;
  }
}
