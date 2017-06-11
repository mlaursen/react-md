/** @module utils/EventUtils/handleWindowClickListeners */
let mobileSafari;

/**
 * Since mobile safari doesn't delegate click events to the window (it only does touch events),
 * this utility function will hack a fix to allow the delegation by updaging the body's cursor
 * to be a pointer.
 *
 * Hopefully this can be removed one day....
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
 * @param {function} cb - the callback function to use for a window click event.
 * @param {boolean} enabled - boolean if the click event is enabled.
 */
export default function handleWindowClickListeners(cb, enabled = false) {
  if (typeof mobileSafari === 'undefined' && typeof window !== 'undefined') {
    const ua = window.navigator.userAgent;
    const iOS = ua.match(/iP(ad|hone)/i);
    const webkit = ua.match(/WebKit/i);
    mobileSafari = iOS && webkit && !ua.match(/CriOS/i);

    if (mobileSafari) {
      document.body.style.cursor = 'pointer';
    }
  }

  const listener = window[`${enabled ? 'add' : 'remove'}EventListener`];
  listener('click', cb);
}
