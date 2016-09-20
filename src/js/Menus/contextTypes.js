import { PropTypes } from 'react';

import Positions from './Positions';

export default {
  menuCascading: PropTypes.bool,
  menuPosition: PropTypes.oneOf([
    Positions.TOP_LEFT,
    Positions.TOP_RIGHT,
    Positions.BOTTOM_LEFT,
    Positions.BOTTOM_RIGHT,
    Positions.CONTEXT,
    Positions.BELOW,
  ]),
  listLevel: PropTypes.number,
};
