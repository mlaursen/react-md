/** @module Helpers/HorizontalAnchors */

/**
 * An enum for all the different types of horizontal anchors on a layover.
 *
 * @readonly
 * @enum {string}
 */
const HorizontalAnchors = {
  /**
   * Positions the layover to the outside left on the toggle component
   * so that it does not overlap.
   */
  LEFT: 'left',

  /**
   * Positions the layover to the inner left of the toggle component so
   * that it will overlap.
   */
  INNER_LEFT: 'inner left',

  /**
   * Positions the layover so that it overlaps the toggle component
   * by positioning itself in the cetner of the toggle component's width.
   */
  CENTER: 'center',

  /**
   * Positions the layover to the outside right on the toggle component
   * so that it does not overlap.
   */
  RIGHT: 'right',

  /**
   * Positions the layover to the outside right on the toggle component
   * so that it will overlap.
   */
  INNER_RIGHT: 'inner right',
};

export default HorizontalAnchors;
