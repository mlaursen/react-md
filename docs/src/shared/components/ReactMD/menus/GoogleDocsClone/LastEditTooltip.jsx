import React, { PropTypes } from 'react';
import cn from 'classnames';
import injectTooltip from 'react-md/lib/Tooltips';

const LastEdit = ({ tooltip, className, ...props }) => (
  <li {...props} className={cn('md-text--secondary md-inline-block google-docs-dd-menu', className)}>
    {tooltip}
    Last edit was 1 hour ago.
  </li>
);

LastEdit.propTypes = {
  tooltip: PropTypes.node,
  className: PropTypes.string,
};

export default injectTooltip(LastEdit);
