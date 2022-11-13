import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import type { SimpleHoverModeContext } from "./useHoverModeProvider";

export interface HoverModeOptions extends SimpleHoverModeContext {
  disabled?: boolean;
  /**
   * This can be used to override the `HoverModeContext`'s hover time.
   */
  hoverTime?: number;

  /**
   * This can be used to override the `HoverModeContext`'s leave time.
   */
  leaveTime?: number;
  defaultVisible?: UseStateInitializer<boolean>;
}

export interface HoverModeImplementation {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
  startShowFlow(id?: string | MouseEvent): void;
  startHideFlow(): void;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * \@since 6.0.0 Requires passing the custom hover mode context to
 * work.
 */
export function useHoverMode(
  options: HoverModeOptions
): HoverModeImplementation {
  const {
    disabled,
    hoverTime,
    hoverTimeoutRef,
    leaveTime,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
    defaultVisible = false,
  } = options;

  const [visible, setVisible] = useState(defaultVisible);
  const visibilityTimeout = useRef<number | undefined>();

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
    visible,
    setVisible,
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
      window.clearTimeout(visibilityTimeout.current);
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
      window.clearTimeout(visibilityTimeout.current);
      visibilityTimeout.current = window.setTimeout(() => {
        setVisible(false);
      }, leaveTime ?? leaveTimeoutRef.current);
    },
  };
}
