export const ASYNC_CONTENT_LOADING = 'ASYNC_CONTENT_LOADING';
export const ASYNC_CONTENT_LOADED = 'ASYNC_CONTENT_LOADED';

export function asyncContentLoading() {
  return { type: ASYNC_CONTENT_LOADING };
}

export function asyncContentLoaded() {
  return { type: ASYNC_CONTENT_LOADED };
}

export const ACCESSIBILITY_PROPS = {
  'aria-busy': true,
  'aria-describedby': 'loading-content',
};

export default function contentProps(state = null, action) {
  switch (action.type) {
    case ASYNC_CONTENT_LOADING:
      return ACCESSIBILITY_PROPS;
    case ASYNC_CONTENT_LOADED:
      return null;
    default:
      return state;
  }
}
