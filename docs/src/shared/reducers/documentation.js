import { LOAD_DOCUMENTATION } from 'constants/ActionTypes';
import { capitalizeFirst } from 'utils/StringUtils';

function updateDocumentation(state, { component, section, examples, docgens, description }) {
  let name = capitalizeFirst(component);
  if (section) {
    name += ` ${capitalizeFirst(section)}`;
  }

  return {
    name,
    description,
    examples,
    docgens,
  };
}

const initialState = {
  name: '',
  description: '',
  examples: [],
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
