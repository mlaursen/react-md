/** @module Helpers/VerticalAnchors */

/**
 * An enum for all the different types of horizontal anchors on a layover.
 *
 * @readonly
 * @enum {string}
 */
const VerticalAnchors = {
  /**
   * Positions the layover to be placed over the toggle component so that
   * it will never overlay the toggle component.
   */
  TOP: 'top',

  /**
   * Positions the layover so that it will be centered over the toggle component
   * based on the layover's height.
   */
  CENTER: 'center',

  /**
   * Positions the layover so that it will overlap the toggle component by
   * fixing to the top of the toggle.
   */
  OVERLAP: 'overlap',

  /**
   * Positions the layover to be placed below the toggle component so that
   * it will never overlay the toggle component.
   */
  BOTTOM: 'bottom',
};

export default VerticalAnchors;
