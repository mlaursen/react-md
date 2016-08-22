import React, { PropTypes } from 'react';
import classnames from 'classnames';

import injectTooltip from 'react-md/lib/Tooltips';

const TooltipLink = injectTooltip(({ tooltip, children, className, ...props }) => (
  <a
    {...props}
    className={classnames(className, 'inline-rel-container')}
  >
    {children}
    {tooltip}
  </a>
));

TooltipLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string.isRequired,

  // Injected from injectTooltip only when
  // the tooltipLabel prop is not blank.
  tooltip: PropTypes.node,
};

export default TooltipLink;
