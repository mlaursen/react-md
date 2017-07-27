import { get } from 'lodash/object';
import { isEqual } from 'lodash/lang';

export const DOCGEN_REQUEST = 'DOCGEN_REQUEST';

export function docgenRequest(component, section) {
  const ids = [section, component].filter(id => !!id);

  return { type: DOCGEN_REQUEST, payload: { ids } };
}

export const DOCGEN_SUCCESS = 'DOCGEN_SUCCESS';

export function docgenSuccess(ids, data) {
  return { type: DOCGEN_SUCCESS, payload: { ids, data } };
}

export const DOCGEN_FAILURE = 'DOCGEN_FAILURE';

export function docgenFailure(ids, error) {
  return { type: DOCGEN_FAILURE, payload: { ids, error } };
}

function updateDocgens(state, { ids, data }) {
  const existing = get(state, ids.join('.'), null);
  if (isEqual(data, existing)) {
    return state;
  }

  const [section, component] = ids;
  if (component) {
    return {
      ...state,
      [section]: {
        ...state[section],
        [component]: data,
      },
    };
  }

  return { ...state, [section]: data };
}

export default function docgens(state = {}, action) {
  switch (action.type) {
    case DOCGEN_SUCCESS:
      return updateDocgens(state, action.payload);
    default:
      return state;
  }
}
