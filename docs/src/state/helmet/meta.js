export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const DEFAULT_DESCRIPTION = 'Google\'s Material Design UI Components built with accessibility in mind, Sass, And React.';

export function updateDescription(description) {
  return {
    type: UPDATE_DESCRIPTION,
    payload: { description: description || DEFAULT_DESCRIPTION },
  };
}

export const UPDATE_KEYWORDS = 'UPDATE_KEYWORDS';
export const DEFAULT_KEYWORDS = 'react-md,material design,react material design,material ui,react components';

export function updateKeywords(keywords = null, merge = true) {
  return {
    type: UPDATE_KEYWORDS,
    payload: { keywords, merge },
  };
}

export const INITIAL_STATE = [{
  name: 'description',
  content: DEFAULT_DESCRIPTION,
}, {
  name: 'keywords',
  content: DEFAULT_KEYWORDS,
}, {
  name: 'theme-color',
  content: '#0277bd',
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

function handleKeywordsChange(state, { keywords, merge }) {
  const [, existing] = state;
  let content = keywords;
  if (content === null) {
    content = DEFAULT_KEYWORDS;
  } else if (merge) {
    content = `${DEFAULT_KEYWORDS},${keywords}`;
  }

  if (existing.content === content) {
    return state;
  }

  const nextState = state.slice();
  nextState[1] = { name: 'keywords', content };
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
