import { PropTypes } from 'react';

export default PropTypes.shape({
  end: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
}).isRequired;
