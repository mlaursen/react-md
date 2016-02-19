import React from 'react';

import FontIcon from 'react-md/lib/FontIcons';
import Tooltip from 'react-md/lib/Tooltips';

const TooltipExamples = () => {
  return (
    <div>
      <div>
        The tooltip component can be used by having a focusable element and the tooltip in a container. There is a helper <pre>.md-tooltip-container</pre>
        which can be used. All you really need is some relative parent.
      </div>
      <div className="md-tooltip-container">
        <FontIcon>print</FontIcon>
        <Tooltip text="Print" direction="top" />
      </div>
      <div className="md-tooltip-container">
        <FontIcon>print</FontIcon>
        <Tooltip text="Print" direction="right" />
      </div>
      <div className="md-tooltip-container">
        <FontIcon>print</FontIcon>
        <Tooltip text="Print" />
      </div>
      <div className="md-tooltip-container">
        <FontIcon>print</FontIcon>
        <Tooltip text="Print" direction="left" />
      </div>
      <div className="md-tooltip-container">
        <a href="#">Some link</a>
        <Tooltip text="Some more text to display" />
      </div>
    </div>
  );
};

export default TooltipExamples;
