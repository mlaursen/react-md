import React, { ReactNode, FunctionComponent, useMemo } from "react";
import { DEFAULT_DELAY } from "./constants";
import {
  HoverModeDelay,
  HoverModeActions,
  HoverModeEnabled,
  useTooltipHoverModeState,
} from "./useTooltipHoverMode";

interface TooltipHoverModeConfigProps {
  children: ReactNode;
  enabled?: boolean;
  delayTimeout?: number;
  defaultDelay?: number;
}

type DefaultProps = Required<
  Pick<TooltipHoverModeConfigProps, "defaultDelay" | "delayTimeout" | "enabled">
>;
type WithDefaultProps = TooltipHoverModeConfigProps & DefaultProps;

/**
 * This component is used so that tooltips can gain the "hover mode"
 * functionality in that once a tooltip has become visible by hover,
 * all other tooltips will become visible immediately until 3 seconds
 * have passed.
 */
const TooltipHoverModeConfig: FunctionComponent<
  TooltipHoverModeConfigProps
> = props => {
  const {
    defaultDelay,
    delayTimeout,
    enabled,
    children,
  } = props as WithDefaultProps;
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
};

const defaultProps: DefaultProps = {
  enabled: true,
  delayTimeout: DEFAULT_DELAY,
  defaultDelay: DEFAULT_DELAY,
};

TooltipHoverModeConfig.defaultProps = defaultProps;

export default TooltipHoverModeConfig;
