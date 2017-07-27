export const UPDATE_FINDER_VISIBILITY = 'UPDATE_FINDER_VISIBILITY';

export function updateFinderVisibility(visible) {
  return { type: UPDATE_FINDER_VISIBILITY, payload: { visible } };
}

export default function sassdocFab(state = true, action) {
  switch (action.type) {
    case UPDATE_FINDER_VISIBILITY:
      return action.payload.visible;
    default:
      return state;
  }
}
