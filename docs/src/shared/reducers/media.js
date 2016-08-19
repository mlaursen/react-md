import { MEDIA_CHANGE } from 'constants/ActionTypes';
import { isMobile, isTablet } from 'utils/MediaUtils';

function handleMediaChange(state) {
  const mobile = isMobile();
  const tablet = isTablet();
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
  mobile: isMobile(),
  tablet: isTablet(),
  desktop: !isMobile() && !isTablet(),
};

export default function media(state = initialState, action) {
  switch (action.type) {
    case MEDIA_CHANGE:
      return handleMediaChange(state);
    default:
      return state;
  }
}
