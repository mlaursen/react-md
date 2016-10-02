import { PropTypes } from 'react';

export default PropTypes.shape({
  default: PropTypes.string,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
