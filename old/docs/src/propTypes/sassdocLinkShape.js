import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  ref: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
