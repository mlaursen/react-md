import { PropTypes } from 'react';

export default {
  inkDisabled: PropTypes.bool,
  inkDisabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'mouse', 'touch'])),
};
