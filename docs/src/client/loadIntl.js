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
