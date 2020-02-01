import { useEffect } from "react";
import { useRefCache, UserInteractionMode } from "@react-md/utils";

import { TooltipInitiated } from "./useHandlers";

export interface VisibilityChangeOptions {
  /**
   * An optional function to call after the tooltip becomes visible. You will be
   * provided the user interaction mode that caused the tooltip to become
   * visible.
   */
  onShow?: (mode: UserInteractionMode) => void;

  /**
   * An optional function to call after the tooltip becomes visible.
   */
  onHide?: () => void;

  mode: TooltipInitiated;
  visible: boolean;
}

/**
 * This hook will call the `onShow` and `onHide` functions as needed based on
 * the current interaction mode and the visibility of the tooltip.
 *
 * @private
 */
export default function useVisiblityChange({
  onShow,
  onHide,
  visible,
  mode,
}: VisibilityChangeOptions): void {
  const handlers = useRefCache({ onShow, onHide });

  useEffect(() => {
    if (!visible || mode === null) {
      return;
    }

    const { onShow, onHide } = handlers.current;
    if (onShow) {
      onShow(mode);
    }

    return () => {
      if (onHide) {
        onHide();
      }
    };
    // only want to trigger on visibility changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
}
