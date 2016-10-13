import { PropTypes } from 'react';

export default {
  onExpandClick: PropTypes.func,
  expanded: PropTypes.bool,
  iconClassName: PropTypes.string,
  iconChildren: PropTypes.string,
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipLabel: PropTypes.string,
  tooltipDelay: PropTypes.number,
};
