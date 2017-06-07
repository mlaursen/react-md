import { get } from 'lodash/object';

export const SASSDOC_REQUEST = 'SASSDOC_REQUEST';

export function sassdocRequest(component, section) {
  let ids;
  if (section && section.match(/progress|selection-controls|pickers/)) {
    ids = [section];
  } else {
    ids = [section, component].filter(s => !!s);
  }

  return { type: SASSDOC_REQUEST, payload: { ids } };
}

export const SASSDOC_SUCCESS = 'SASSDOC_SUCCESS';

export function sassdocSuccess(ids, data) {
  return { type: SASSDOC_SUCCESS, payload: { ids, data } };
}

export const SASSDOC_FAILURE = 'SASSDOC_FAILURE';
export function sassdocFailure(ids, error) {
  return { type: SASSDOC_FAILURE, payload: { ids, error } };
}

function updateSassDocs(state, { ids, data }) {
  const existing = get(state, ids.join('.'), null);

  if (data === existing) {
    return state;
  }

  const [section, component] = ids;
  if (component) {
    return {
      ...state,
      [component]: {
        ...state[component],
        [section]: data,
      },
    };
  }

  return { ...state, [section]: data };
}

export default function sassdocs(state = {}, action) {
  switch (action.type) {
    case SASSDOC_SUCCESS:
      return updateSassDocs(state, action.payload);
    default:
      return state;
  }
}
