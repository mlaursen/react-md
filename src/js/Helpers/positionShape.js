import PropTypes from 'prop-types';

export const Positions = {
  TOP_LEFT: 'tl',
  TOP_RIGHT: 'tr',
  BOTTOM_LEFT: 'bl',
  BOTTOM_RIGHT: 'br',
  BELOW: 'below',
};

export default PropTypes.oneOfType([
  PropTypes.oneOf([
    Positions.TOP_LEFT,
    Positions.TOP_RIGHT,
    Positions.BOTTOM_LEFT,
    Positions.BOTTOM_RIGHT,
    Positions.BELOW,
  ]),
  PropTypes.string,
]);
