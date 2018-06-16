/** @module Helpers/Positions */

/**
 * An enum for all the animation positions for a layover appearing.
 *
 * @readonly
 * @enum {string}
 */
const Positions = {
  /**
   * The layover will appear by transitioning from the top left and expand
   * down right.
   */
  TOP_LEFT: 'tl',

  /**
   * The layover will appear by transitioning from the top right and expand
   * down left.
   */
  TOP_RIGHT: 'tr',

  /**
   * The layover will appear by transitioning from the bottom left and expand
   * top right.
   */
  BOTTOM_LEFT: 'bl',

  /**
   * The layover will appear by transitioning from the bottom right and expand
   * top left.
   */
  BOTTOM_RIGHT: 'br',

  /**
   * The layover will appear by just transitioning downwards from the bottom
   * of the toggle component.
   */
  BELOW: 'below',
};

export default Positions;
