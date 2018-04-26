import PropTypes from 'prop-types';

export default PropTypes.shape({
  propName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
});
