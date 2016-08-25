import { LOAD_DOCUMENTATION } from 'constants/ActionTypes';

function updateDocumentation(state, { name, docgens, description }) {
  if (state.name === name) {
    return state;
  }

  return {
    name,
    description,
    docgens,
  };
}

const initialState = {
  name: '',
  description: '',
  docgens: [],
};

export default function documentation(state = initialState, action) {
  switch (action.type) {
    case LOAD_DOCUMENTATION:
      return updateDocumentation(state, action.payload);
    default:
      return state;
  }
}
