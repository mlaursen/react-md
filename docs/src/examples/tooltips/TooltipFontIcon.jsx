import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';
import injectTooltip from 'react-md/lib/Tooltips';

// Material icons shouldn't have any other children other than the child string and
// it gets converted into a span if the tooltip is added, so we add a container
// around the two.
const TooltipFontIcon = injectTooltip(({ tooltip, children, iconClassName, className, ...props }) => (
  <div {...props} className={classnames(className, 'inline-rel-container')}>
    <FontIcon iconClassName={iconClassName} children={children} />
    {tooltip}
  </div>
));

TooltipFontIcon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,

  // Injected from injectTooltip only when
  // the tooltipLabel prop is not blank.
  tooltip: PropTypes.node,
};

export default TooltipFontIcon;
