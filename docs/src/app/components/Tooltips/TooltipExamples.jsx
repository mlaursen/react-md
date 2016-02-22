import React from 'react';

import { IconButton, FloatingButton } from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import Tooltip from 'react-md/lib/Tooltips';

const TooltipExamples = () => {
  return (
    <div>
      <div>
        The tooltip component can be used by having a focusable element and the tooltip in a container. There is a helper <pre>.md-tooltip-container</pre>
        which can be used. All you really need is some relative parent.
      </div>
      <Tooltip text="Print" position="top">
        <FontIcon>print</FontIcon>
      </Tooltip>
      <Tooltip text="Print" position="right">
        <FontIcon>print</FontIcon>
      </Tooltip>
      <Tooltip text="Print" position="bottom">
        <FontIcon>print</FontIcon>
      </Tooltip>
      <Tooltip text="Print" position="left">
        <FontIcon>print</FontIcon>
      </Tooltip>
      <IconButton tooltip="Help! I need somebody">help</IconButton>
      <Tooltip text="Add some new feature">
        <FloatingButton>add</FloatingButton>
      </Tooltip>
    </div>
  );
};

export default TooltipExamples;
