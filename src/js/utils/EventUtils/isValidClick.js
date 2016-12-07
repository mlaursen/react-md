import { LEFT_MOUSE } from '../../constants/keyCodes';

/**
 * Checks if an event is a valid click event by ignoring
 * any clisk that are not the left mouse button and not
 * clicks that involve the shift key.
 *
 * @param {Object} e - the event to check
 * @return {Boolean} true if the event is valid.
 */
export default function isValidClick(e) {
  return e.button === LEFT_MOUSE
    && !e.shiftKey;
}
