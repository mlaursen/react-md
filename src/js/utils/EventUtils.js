import { LEFT_MOUSE } from '../constants/keyCodes';

/**
 * Checks if an event is a valid click event by ignoring
 * any clisk that are not the left mouse button and not
 * clicks that involve the shift key.
 *
 * @param {Object} e - the event to check
 * @param {string=} type - an optional click event type to
 *    verify
 * @return {Boolean} true if the event is valid.
 */
export function isValidClick(e, type) {
  return (type ? e.type === type : true)
    && e.button === LEFT_MOUSE
    && !e.shiftKey;
}
