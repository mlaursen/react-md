import PropTypes from 'prop-types';

export default PropTypes.shape({
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
