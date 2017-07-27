import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  default: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
});
