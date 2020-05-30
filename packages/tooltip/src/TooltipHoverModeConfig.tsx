import React, { ReactElement, ReactNode, useMemo } from "react";

import { DEFAULT_TOOLTIP_DELAY } from "./constants";
import {
  HoverModeActions,
  HoverModeDelay,
  HoverModeEnabled,
  useTooltipHoverModeState,
} from "./useTooltipHoverMode";

interface TooltipHoverModeConfigProps {
  children: ReactNode;
  enabled?: boolean;
  delayTimeout?: number;
  defaultDelay?: number;
}

/**
 * This component is used so that tooltips can gain the "hover mode"
 * functionality in that once a tooltip has become visible by hover, all other
 * tooltips will become visible immediately until 3 seconds have passed.
 */
function TooltipHoverModeConfig({
  defaultDelay = DEFAULT_TOOLTIP_DELAY,
  delayTimeout = DEFAULT_TOOLTIP_DELAY,
  enabled = true,
  children,
}: TooltipHoverModeConfigProps): ReactElement {
  const { delay, enable, startDisableTimer } = useTooltipHoverModeState(
    defaultDelay,
    delayTimeout
  );

  const actions = useMemo(
    () => ({
      enable,
      startDisableTimer,
    }),
    [enable, startDisableTimer]
  );

  return (
    <HoverModeDelay.Provider value={delay}>
      <HoverModeActions.Provider value={actions}>
        <HoverModeEnabled.Provider value={enabled}>
          {children}
        </HoverModeEnabled.Provider>
      </HoverModeActions.Provider>
    </HoverModeDelay.Provider>
  );
}

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TooltipHoverModeConfig.propTypes = {
      enabled: PropTypes.bool,
      delayTimeout: PropTypes.number,
      defaultDelay: PropTypes.number,
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}

export default TooltipHoverModeConfig;
