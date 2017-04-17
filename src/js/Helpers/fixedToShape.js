import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.shape({
    x: PropTypes.object,
    y: PropTypes.object,
  }),
]);
