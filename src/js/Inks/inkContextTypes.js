import PropTypes from 'prop-types';

export default {
  inkDisabled: PropTypes.bool,
  inkDisabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'mouse', 'touch'])),
};
