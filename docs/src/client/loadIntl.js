/**
 * This will polyfill intl with the current locale only when required. To keep the
 * total bundle size small, the intl module as well as locale data will be code-split
 * and only imported when needed.
 *
 * @param {String} locale - The current user's locale
 * @return {Array.<Promise>} a list of import promises or null.
 */
export default function loadIntl(locale) {
  if (!global.Intl) {
    const imports = [import('intl')];
    if (__DEV__) {
      // Only include the minimal polyfills in dev mode to save some time
      imports.push(
        import('intl/locale-data/jsonp/en-US'),
        import('intl/locale-data/jsonp/da-DK'),
      );
    } else {
      imports.push(`intl/locale-data/jsonp/${locale}`);
    }

    return Promise.all(imports);
  }

  return null;
}
