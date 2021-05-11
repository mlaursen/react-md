/* istanbul ignore file */
import React, { ReactElement, ReactNode } from "react";
import { HoverModeProvider } from "@react-md/utils";

import { DEFAULT_TOOLTIP_DELAY } from "./constants";

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
 *
 * @deprecated \@since 2.8.0 Use the {@link HoverModeProvider} instead.
 */
export function TooltipHoverModeConfig({
  defaultDelay = DEFAULT_TOOLTIP_DELAY,
  delayTimeout = DEFAULT_TOOLTIP_DELAY,
  enabled = true,
  children,
}: TooltipHoverModeConfigProps): ReactElement {
  return (
    <HoverModeProvider
      disabled={!enabled}
      defaultVisibleInTime={defaultDelay}
      deactivateTime={delayTimeout}
    >
      {children}
    </HoverModeProvider>
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
