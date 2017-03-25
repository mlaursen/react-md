import Drawer from 'react-md/lib/Drawers';

export const UPDATE_MEDIA = 'UPDATE_MEDIA';

export function updateMedia(drawerType, media) {
  return { type: UPDATE_MEDIA, payload: { drawerType, media } };
}

const { mobile, tablet, desktop } = Drawer.getCurrentMedia(Drawer.defaultProps);
let defaultMedia = 'desktop';
if (mobile) {
  defaultMedia = 'mobile';
} else if (tablet) {
  defaultMedia = 'tablet';
}

const INITIAL_STATE = { mobile, tablet, desktop, defaultMedia };

export default function media(state = INITIAL_STATE, action) {
  if (action.type === UPDATE_MEDIA) {
    return { ...state, media: action.payload.media };
  }

  return state;
}
