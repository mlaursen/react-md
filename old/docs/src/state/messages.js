export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const REFRESH_MESSAGE = 'New content is available; please refresh';

export function createMessage(message) {
  if (typeof message === 'string') {
    message = { text: message };
  }

  return { type: CREATE_MESSAGE, payload: { message } };
}

export function removeMessage() {
  return { type: REMOVE_MESSAGE };
}

export function createRefreshMessage() {
  return createMessage({
    text: REFRESH_MESSAGE,
    action: {
      label: 'Reload',
      onClick: () => {
        window.location.reload();
      },
    },
  });
}

function push(state, message) {
  const nextState = state.slice();
  nextState.push(message);
  return nextState;
}

function pop(state) {
  if (!state.length) {
    return state;
  }

  const [, ...nextState] = state;
  return nextState;
}

export default function messages(state = [], action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return push(state, action.payload.message);
    case REMOVE_MESSAGE:
      return pop(state);
    default:
      return state;
  }
}
