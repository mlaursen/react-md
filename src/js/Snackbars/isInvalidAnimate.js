const gcc = 'getComposedComponent';
export default function isInvalidAnimate(fab) {
  return typeof fab[gcc] !== 'function' ||
    typeof fab[gcc]()[gcc] !== 'function' ||
    typeof fab[gcc]()[gcc]()._animateForSnackbar !== 'function';
}
