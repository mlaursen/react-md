import PropTypes from 'prop-types';
import Positions from './Positions';

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
