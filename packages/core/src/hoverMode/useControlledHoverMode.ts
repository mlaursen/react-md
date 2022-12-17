import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import type { UseStateSetter } from "../types";
import type { SimpleHoverModeContext } from "./useHoverModeProvider";

/**
 * @remarks \@since 6.0.0
 */
export interface HoverModeConfigurationOptions extends SimpleHoverModeContext {
  disabled?: boolean;
  /**
   * This can be used to override the `HoverModeContext`'s hover time.
   */
  hoverTime?: number;

  /**
   * This can be used to override the `HoverModeContext`'s leave time.
   */
  leaveTime?: number;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ControlledHoverModeOptions
  extends HoverModeConfigurationOptions {
  setVisible: UseStateSetter<boolean>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface HoverModeFlowImplementation {
  startShowFlow(id?: string | MouseEvent): void;
  startHideFlow(): void;
  clearVisibilityTimeout(): void;
}

/**
 * @remarks \@since 6.0.0
 */
export function useControlledHoverMode(
  options: ControlledHoverModeOptions
): HoverModeFlowImplementation {
  const {
    setVisible,
    disabled,
    hoverTime,
    hoverTimeoutRef,
    leaveTime,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
  } = options;

  const visibilityTimeout = useRef<number | undefined>();
  const clearVisibilityTimeout = (): void => {
    window.clearTimeout(visibilityTimeout.current);
  };

  // if the element is near the viewport edge, the mouseleave event might not
  // trigger correctly. for these cases, just clear any timeouts to be safe.
  // do not hide the visibility so that you can still inspect things in the
  // devtools
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handler = (): void => {
      window.clearTimeout(visibilityTimeout.current);

      // might need to play with this more or make it configurable. if the mouse
      // leaves the window, you're _normally_ not interacting with the app
      // anymore and state should reset.
      disableHoverMode();
    };

    document.addEventListener("mouseleave", handler);
    return () => {
      document.removeEventListener("mouseleave", handler);
    };
  }, [disableHoverMode, disabled]);

  useEffect(() => {
    return () => {
      window.clearTimeout(visibilityTimeout.current);
    };
  }, []);

  return {
    startShowFlow(eventOrId) {
      const hoverTimeout = hoverTime ?? hoverTimeoutRef.current;
      if (disabled || typeof hoverTimeout === "undefined") {
        return;
      }

      let id: string;
      if (typeof eventOrId === "string" || typeof eventOrId === "undefined") {
        id = eventOrId || "";
      } else {
        id = eventOrId.currentTarget.id;
      }

      clearDisableTimer();
      clearVisibilityTimeout();
      visibilityTimeout.current = window.setTimeout(() => {
        enableHoverMode(id);
        setVisible(true);
      }, hoverTimeout);
    },
    startHideFlow() {
      if (disabled) {
        return;
      }

      startDisableTimer();
      clearVisibilityTimeout();
      visibilityTimeout.current = window.setTimeout(() => {
        setVisible(false);
      }, leaveTime ?? leaveTimeoutRef.current);
    },
    clearVisibilityTimeout,
  };
}
