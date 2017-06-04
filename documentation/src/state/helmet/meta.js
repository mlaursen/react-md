export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const DEFAULT_DESCRIPTION = 'Google\'s Material Design UI Components built with accessibility in mind, Sass, And React.';

export function updateDescription(description) {
  return {
    type: UPDATE_DESCRIPTION,
    payload: { description: description || DEFAULT_DESCRIPTION },
  };
}

export const UPDATE_KEYWORDS = 'UPDATE_KEYWORDS';
export const DEFAULT_KEYWORDS = 'react-md,material design,react,components,material ui';

export function updateKeywords(keywords) {
  return {
    type: UPDATE_KEYWORDS,
    payload: { keywords: keywords || DEFAULT_KEYWORDS },
  };
}

export const INITIAL_STATE = [{
  name: 'description',
  content: DEFAULT_DESCRIPTION,
}, {
  name: 'keywords',
  content: DEFAULT_KEYWORDS,
}];

function handleDescriptionChange(state, { description }) {
  const [existing] = state;
  if (existing.content === description) {
    return state;
  }

  const nextState = state.slice();
  nextState[0] = { name: 'description', content: description };
  return nextState;
}

function handleKeywordsChange(state, { keywords }) {
  const [, existing] = state;
  if (existing.content === keywords) {
    return state;
  }

  const nextState = state.slice();
  nextState[1] = { name: 'keywords', content: keywords };
  return nextState;
}

export default function meta(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_DESCRIPTION:
      return handleDescriptionChange(state, action.payload);
    case UPDATE_KEYWORDS:
      return handleKeywordsChange(state, action.payload);
    default:
      return state;
  }
}
