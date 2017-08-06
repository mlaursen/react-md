import PropTypes from 'prop-types';

export default {
  onExpandClick: PropTypes.func,
  expanded: PropTypes.bool,
  icon: PropTypes.element,
  iconClassName: PropTypes.string,
  iconChildren: PropTypes.node,
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipLabel: PropTypes.node,
  tooltipDelay: PropTypes.number,
};
