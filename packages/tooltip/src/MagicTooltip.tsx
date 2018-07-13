import * as React from "react";

import { ITooltipProps } from "./Tooltip";
import MagicTooltipConsumer from "./MagicTooltipConsumer";
import { Consumer } from "./MagicTooltipContext";

const MagicTooltip: React.SFC<ITooltipProps> = props => (
  <Consumer>
    {({ dense, spacing, denseSpacing, ...context }) => (
      <MagicTooltipConsumer
        spacing={spacing}
        dense={dense}
        denseSpacing={denseSpacing}
        {...props}
        {...context}
      />
    )}
  </Consumer>
);

export default MagicTooltip;
