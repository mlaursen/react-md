import * as React from "react";

import { TooltipPosition } from "./constants";
import { IMagicTooltipProps } from "./types";
import { ITooltipProps } from "./Tooltip";
import MagicTooltipConsumer from "./MagicTooltipConsumer";
import { Consumer } from "./MagicTooltipContext";

const MagicTooltip: React.SFC<IMagicTooltipProps> = props => (
  <Consumer>
    {({ dense, spacing, denseSpacing, portalInto, portalIntoId, ...context }) => (
      <MagicTooltipConsumer
        spacing={spacing}
        dense={dense}
        denseSpacing={denseSpacing}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
        {...props}
        {...context}
      />
    )}
  </Consumer>
);

export default MagicTooltip;
