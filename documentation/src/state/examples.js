import { createSelector } from 'reselect';

export const LOAD_README_REQUEST = 'LOAD_README_REQUEST';
export const LOAD_README_SUCCESS = 'LOAD_README_SUCCESS';
export const LOAD_README_FAILURE = 'LOAD_README_FAILURE';
export const LOAD_EXAMPLES_REQUEST = 'LOAD_EXAMPLES_REQUEST';
export const LOAD_EXAMPLES_SUCCESS = 'LOAD_EXAMPLES_SUCCESS';
export const LOAD_EXAMPLES_FAILURE = 'LOAD_EXAMPLES_FAILURE';

function getRoute(component, section) {
  return `${section ? `${section}/` : ''}${component}`;
}

export function loadExamples(component, section) {
  const route = getRoute(component, section);
  return (dispatch, getState) => {
    if (!__DEV__ || getState().examples.examples) {
      return null;
    }
    dispatch({ type: LOAD_EXAMPLES_REQUEST });

    return System.import(`components/Components/${route}/index.jsx`)
      .then(({ default: examples }) => {
        dispatch({ type: LOAD_EXAMPLES_SUCCESS, payload: { examples, route } });
      }).catch((error) => {
        dispatch({ type: LOAD_EXAMPLES_FAILURE, payload: error });
      });
  };
}

function getExamplesForParams(examples, component, section) {
  const route = getRoute(component, section);

  return examples[route] || { readme: '', examples: [] };
}

export const getExamples = createSelector(getExamplesForParams, examples => examples);

export default function examples(state = {}, action) {
  if (action.type === LOAD_EXAMPLES_SUCCESS) {
    const { route, examples } = action.payload;
    return { ...state, [route]: examples };
  }

  return state;
}
