import React, { PropTypes } from 'react';
import classnames from 'classnames';

import injectTooltip from 'react-md/lib/Tooltips';

const TooltipLink = injectTooltip(({ children, className, tooltip, ...props }) => (
  <a
    {...props}
    className={classnames(className, 'inline-rel-container')}
  >
    {tooltip}
    {children}
  </a>
));

TooltipLink.propTypes = {
  tooltip: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

export default TooltipLink;
