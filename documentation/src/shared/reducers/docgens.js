import { FETCH_DOCGEN_REQUEST, FETCH_DOCGEN_SUCCESS, FETCH_DOCGEN_FAILURE } from 'constants/ActionTypes';
const initialState = {};

export default function docgens(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCGEN_REQUEST:
      console.log(action);
      return state;
    case FETCH_DOCGEN_SUCCESS:
      console.log(action);
      return state;
    case FETCH_DOCGEN_FAILURE:
      return state;
    default:
      return state;
  }
}
