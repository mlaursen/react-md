import PropTypes from 'prop-types';

export default PropTypes.shape({
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  returns: PropTypes.shape({
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
});
