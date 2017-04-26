import { PropTypes } from 'react';

export default PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.shape({
    x: PropTypes.object,
    y: PropTypes.object,
  }),
]);
