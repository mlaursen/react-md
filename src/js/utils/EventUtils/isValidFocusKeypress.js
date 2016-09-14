import { TAB } from '../../constants/keyCodes';

/**
 * Checks if a keydown or keyup event's key was the TAB key or any additional valid
 * keys that were passed in.
 *
 * @param {Object} event - The event to check.
 * @param {Array.<number>=} additionalKeys - An optional array of additional key codes
 *    that are considered valid for a focus event.
 */
export default function isValidFocusKeypress(event, additionalKeys) {
  const key = event.which || event.keyCode;
  return key === TAB ||
    (additionalKeys && additionalKeys.indexOf(key) !== -1);
}
