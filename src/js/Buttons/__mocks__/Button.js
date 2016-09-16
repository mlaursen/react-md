/* eslint-env jest */
import React from 'react';

export default jest.fn(({ label, iconClassName, children, ...props }) => {
  delete props.iconBefore;
  delete props.fixedPosition;
  delete props.flat;
  delete props.floating;
  delete props.raised;
  delete props.icon;
  delete props.mini;
  delete props.fixed;
  delete props.primary;
  delete props.secondary;
  delete props.tooltip;
  delete props.tooltipDelay;
  delete props.tooltipLabel;
  delete props.tooltipPosition;
  delete props.tooltipTouchTimeout;
  delete props.waitForInkTransition;

  return (
    <button {...props}>
      {label}
      {(children || iconClassName) && <i className={iconClassName || 'material-icons'}>{children}</i>}
    </button>
  );
});
