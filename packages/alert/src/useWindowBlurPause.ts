import { useEffect } from "react";

import { Message } from "./MessageQueueContext";

interface Options {
  startTimer: () => void;
  stopTimer: () => void;
  visible: boolean;
  message: Message | undefined;
  disabled?: boolean;
}

/**
 * This hook is used to pause the exit timeout if the user blurs the window
 * while a toast is visible and the autohide functionality is not disabled. If
 * this functionality is not added, messages and alerts might be missed by the
 * user since they minimized the browser or viewing something on a second
 * screen.
 *
 * @internal
 */
export function useWindowBlurPause({
  startTimer,
  stopTimer,
  visible,
  message,
  disabled = false,
}: Options): void {
  useEffect(() => {
    if (disabled || !visible || !message || message.disableAutohide) {
      return;
    }

    const handleFocusEvent = (event: Event): void => {
      if (event.type === "focus") {
        startTimer();
      } else {
        stopTimer();
      }
    };

    window.addEventListener("blur", handleFocusEvent);
    window.addEventListener("focus", handleFocusEvent);
    return () => {
      window.removeEventListener("blur", handleFocusEvent);
      window.removeEventListener("focus", handleFocusEvent);
    };
  }, [disabled, startTimer, stopTimer, visible, message]);
}
