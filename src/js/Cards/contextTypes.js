import { PropTypes } from 'react';

export default {
  onExpandClick: PropTypes.func,
  isExpanded: PropTypes.bool,
  iconClassName: PropTypes.string,
  iconChildren: PropTypes.string,
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipLabel: PropTypes.string,
};
