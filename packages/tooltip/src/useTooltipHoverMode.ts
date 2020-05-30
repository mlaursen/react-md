import { createContext, useCallback, useContext, useState } from "react";
import { useRefCache, useTimeout } from "@react-md/utils";

import { DEFAULT_TOOLTIP_DELAY } from "./constants";

interface TooltipHoverModeState {
  /**
   * The current delay before a tooltip should become visible.
   */
  delay: number;

  /**
   * This will enable the immediate tooltip visibility functionality by updating
   * the `delay` state to be `0`. This should normally be called once a tooltip
   * becomes visible.
   */
  enable: () => void;

  /**
   * Whenever a tooltip loses its visibility, this function could be called to
   * start a timer that will disable the immediate tooltip visibility once
   * complete. If another tooltip becomes visible, this timeout is automatically
   * cleared by the `enable` function.
   */
  startDisableTimer: () => void;
}

/**
 * This is a private hook that is used to cache and update the tooltip delay
 * context state when needed.
 *
 * @param defaultDelay The default delay to use for all tooltips
 * @return the tooltip delay state
 */
export function useTooltipHoverModeState(
  defaultDelay: number,
  delayTimeout: number
): TooltipHoverModeState {
  const [delay, setDelay] = useState(defaultDelay);
  const delayRef = useRefCache(delay);

  const disable = useCallback(() => {
    if (delayRef.current === 0) {
      setDelay(defaultDelay);
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDelay]);

  const [start, stop] = useTimeout(disable, delayTimeout);
  const enable = useCallback(() => {
    stop();
    if (delayRef.current !== 0) {
      setDelay(0);
    }
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop]);

  return {
    delay,
    enable,
    startDisableTimer: start,
  };
}

/**
 * This keeps track of the current "immediate" delay to use for all child
 * tooltip components.  When the `enable` function is called, this is updated to
 * be `0` so tooltips can appear immediately on hover.
 */
export const HoverModeDelay = createContext(DEFAULT_TOOLTIP_DELAY);

interface HoverModeActionsContext {
  enable: () => void;
  startDisableTimer: () => void;
}

/**
 * Contains the actions to enable or start disabling the immediate mode for
 * tooltips.
 */
export const HoverModeActions = createContext<HoverModeActionsContext>({
  enable: () => {},
  startDisableTimer: () => {},
});

/**
 * Keeps track of if the immediate mode is enabled. This allows for easy
 * configuration of the app by automatically enabling hover mode functionality
 * if the `ImmediateTooltipConfig` is in your app.
 */
export const HoverModeEnabled = createContext(false);

/**
 * This hook returns the current delay timeout. This probably shouldn't be used
 * much outside of this package.
 * @private
 */
export function useTooltipHoverModeDelay(): number {
  return useContext(HoverModeDelay);
}

/**
 * This hook returns the actions to enable the hover mode as well as start a
 * timer to disable it.
 * @private
 */
export function useTooltipHoverModeActions(): HoverModeActionsContext {
  return useContext(HoverModeActions);
}

/**
 * @private
 */
export function useTooltipHoverModeEnabled(): boolean {
  return useContext(HoverModeEnabled);
}
