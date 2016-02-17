import React from 'react';

import { IconButton } from 'react-md/lib/Buttons';
import Tooltip from 'react-md/lib/Tooltips';

const TooltipExamples = () => {
  return (
    <div>
      <p>
        The tooltip component can be used by having a focusable element and the tooltip in a container. There is a helper <pre>.md-tooltip-container</pre>
        which can be used. All you really need is some relative parent.
      </p>
      <div className="md-tooltip-container">
        <IconButton>print</IconButton>
        <Tooltip text="Print" />
      </div>
      <div className="md-tooltip-container">
        <a href="#">Some link</a>
        <Tooltip text="Some more text to display" />
      </div>
    </div>
  );
};

export default TooltipExamples;
