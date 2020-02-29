const {
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} = require('@react-md/utils/lib/sizing/constants');

if (typeof window.matchMedia !== 'function') {
  window.matchMedia = query => ({
    media: query,
    matches:
      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof window.screen.orientation === 'undefined') {
  // required for the AppSizeListener / useOrientation hook
  window.screen.orientation = {
    type: 'landscape-primary',
  };
}
