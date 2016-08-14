import { MEDIA_CHANGE } from 'constants/ActionTypes';

function createMedia(min, max, orientation = '') {
  return `only screen and (min-width: ${min}px) and (max-width: ${max})${orientation && ` and (orientation: ${orientation})`}`;
}

function handleMediaChange(state) {
  const mobile = window.matchMedia(createMedia(320, 1024)).matches;
  const tablet = window.matchMedia(createMedia(768, 1024, 'landscape')).matches;
  const desktop = !mobile && !tablet;

  if (state.mobile === mobile && state.tablet === tablet && state.desktop === desktop) {
    return state;
  } else {
    return {
      mobile,
      tablet,
      desktop,
    };
  }
}

const initialState = {
  mobile: false,
  tablet: false,
  desktop: true,
};

export default function media(state = initialState, action) {
  switch (action.type) {
    case MEDIA_CHANGE:
      return handleMediaChange(state);
    default:
      return state;
  }
}
