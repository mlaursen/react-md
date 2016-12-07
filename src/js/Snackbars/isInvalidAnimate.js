const gcc = 'getComposedComponent';

/**
 * Just checks if the fab is actually a ref to the FAB Button.
 */
export default function isInvalidAnimate(fab) {
  return typeof fab[gcc] !== 'function' ||
    typeof fab[gcc]()[gcc] !== 'function' ||
    typeof fab[gcc]()[gcc]()._animateForSnackbar !== 'function';
}
