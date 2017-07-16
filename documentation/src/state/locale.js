export const UPDATE_LOCALE = 'UPDATE_LOCALE';

export function updateLocale(locale) {
  return { type: UPDATE_LOCALE, payload: { locale } };
}

/**
 * This is a very simple and probably unneded reducer to get the current locale
 * for SSR/client rendering. I really only support en-US, but the examples should
 * format date/time to the user's locale.
 */
export default function locale(state = 'en-US', action) {
  switch (action.type) {
    case UPDATE_LOCALE:
      return action.payload.locale;
    default:
      return state;
  }
}
