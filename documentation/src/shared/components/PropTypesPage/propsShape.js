import { PropTypes } from 'react';

export default PropTypes.shape({
  propName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
});
