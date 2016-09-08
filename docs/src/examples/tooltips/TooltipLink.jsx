import React, { PropTypes } from 'react';
import classnames from 'classnames';

import injectTooltip from 'react-md/lib/Tooltips';

const TooltipLink = injectTooltip(({ children, className, ...props }) => (
  <a
    {...props}
    className={classnames(className, 'inline-rel-container')}
  >
    {children}
  </a>
));

TooltipLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

export default TooltipLink;
