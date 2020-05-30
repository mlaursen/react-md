import { HTMLAttributes, useCallback, useEffect, useRef } from "react";
import {
  SimplePosition,
  useToggle,
  useUserInteractionMode,
} from "@react-md/utils";

import { DEFAULT_TOOLTIP_DELAY, DEFAULT_TOOLTIP_THRESHOLD } from "./constants";
import { TooltipProps } from "./Tooltip";
import {
  MergableHandlers,
  TooltipInitiated,
  useKeyboardState,
  useMouseState,
  useTouchState,
} from "./useHandlers";
import usePosition from "./usePosition";
import useVisiblityChange, {
  VisibilityChangeOptions,
} from "./useVisibilityChange";

interface ReturnValue {
  hide: () => void;
  visible: boolean;
  position: SimplePosition;
  handlers: Pick<
    HTMLAttributes<HTMLElement>,
    | "onMouseEnter"
    | "onMouseLeave"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onTouchStart"
    | "onTouchMove"
    | "onContextMenu"
  >;
}

/**
 * When the tooltip becomes visible, the tooltip should be hidden if any element
 * within the page is clicked, or the browser is blurred. This hook will just
 * add the required event listeners to hide the tooltip.
 *
 * Whent he entire window is blurred, we start a different flow to ensure that a
 * tooltip won't appear when the window is re-focused. Without this flow, a
 * keyboard user that had focused a tooltippable element will have the tooltip
 * appear again after `x`ms which is not wanted. The user will need to manually
 * re-focus the tooltippable element to show a tooltip again.
 */
export function useOtherInteractionDisable(
  initiated: TooltipInitiated,
  hideTooltip: () => void
): void {
  useEffect(() => {
    if (!initiated) {
      return;
    }

    window.addEventListener("mousedown", hideTooltip, true);
    window.addEventListener("click", hideTooltip, true);
    return () => {
      window.removeEventListener("mousedown", hideTooltip, true);
      window.removeEventListener("click", hideTooltip, true);
    };
  }, [initiated, hideTooltip]);
}

export interface TooltipStateOptions
  extends MergableHandlers,
    Pick<TooltipProps, "position">,
    Pick<VisibilityChangeOptions, "onShow" | "onHide"> {
  /**
   * The threshold multiplier to apply to the entire viewheight to determine if
   * the tooltip should be placed above or below the container element.
   */
  positionThreshold?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the
   * user keyboard focuses the container element.
   */
  focusDelay?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the
   * user hovers the container element.
   */
  hoverDelay?: number;

  /**
   * The amount of time in ms to wait before triggering the exit animation after
   * the user stops touching the container element on mobile devices.
   */
  touchTimeout?: number;

  /**
   * The default position to use for the "auto" positioning mode.
   */
  defaultPosition: SimplePosition;

  /**
   * Bolean if the hover mode functionality should be disabled. When this is
   * `undefined`, it will default to `false` if there is no
   * `ToolipHoverModeConfig` parent component of the current tooltip, otherwise
   * it will be `true`. When this value is a boolean, it will always be used
   * instead.
   */
  disableHoverMode?: boolean;
}

/**
 * This is a reusable hook that allows you to have all the event listeners and
 * visibility logic of toolips so it can be used for any component. This is
 * extremely helpful for when you want to create more complex tooltips (like
 * dialogs).
 *
 * The tooltip state flow is pretty complex, so here's a quick run down of some
 * of the logic:
 * - the tooltip can only be shown by mouse, keyboard, or touch and can only be
 *   closed by the same "initiation" type. So basically if the tooltip was shown
 *   via mouse, it can only be closed by mouse as well.
 * - if the user resizes the window, scrolls the page, clicks anywhere on the
 *   page, switches tabs/ blurs the browser window while the tooltip is visible,
 *   the tooltip will be hidden.
 * - a keyboard user can hide the tooltip by pressing the escape key after it
 *   was shown by focusing the element
 *
 * Since the tooltip can appear above or below the element, the position of the
 * tooltip must be determined before the tooltip becomes visible or else the
 * animation will be in the wrong direction.  So when one of the starting
 * interaction types happen to the container element, the initial position is
 * "guessed" based on the current viewport height and the position of the
 * container element within the viewport.
 */
export default function useTooltipState({
  position: propPosition,
  defaultPosition,
  positionThreshold = DEFAULT_TOOLTIP_THRESHOLD,
  hoverDelay = DEFAULT_TOOLTIP_DELAY,
  touchTimeout = DEFAULT_TOOLTIP_DELAY,
  focusDelay = DEFAULT_TOOLTIP_DELAY,
  disableHoverMode,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onBlur,
  onKeyDown,
  onShow,
  onHide,
}: TooltipStateOptions): ReturnValue {
  const mode = useUserInteractionMode();
  const initiated = useRef<TooltipInitiated>(null);
  const setInitiated = useCallback((initiatedBy: TooltipInitiated) => {
    initiated.current = initiatedBy;
  }, []);

  const [visible, showTooltip, hide] = useToggle(false);
  const hideTooltip = useCallback(() => {
    initiated.current = null;
    hide();
  }, [hide]);

  useVisiblityChange({
    visible,
    onShow,
    onHide,
    mode: initiated.current,
  });

  const { position, setEstimatedPosition } = usePosition({
    position: propPosition,
    defaultPosition,
    threshold: positionThreshold,
  });

  const [stopMouseTimer, handleMouseEnter, handleMouseLeave] = useMouseState({
    mode,
    showTooltip,
    hideTooltip,
    delay: hoverDelay,
    disableHoverMode,
    initiated,
    setInitiated,
    onMouseEnter,
    onMouseLeave,
    setEstimatedPosition,
  });

  const [
    stopKeyboardTimer,
    handleFocus,
    handleBlur,
    handleKeyDown,
  ] = useKeyboardState({
    mode,
    showTooltip,
    hideTooltip,
    delay: focusDelay,
    initiated,
    setInitiated,
    onFocus,
    onBlur,
    onKeyDown,
    setEstimatedPosition,
  });

  const [
    stopTouchTimer,
    handleTouchStart,
    handleTouchMove,
    handleContextMenu,
  ] = useTouchState({
    mode,
    visible,
    showTooltip,
    hideTooltip,
    delay: touchTimeout,
    initiated,
    setInitiated,
    onTouchStart,
    onTouchMove,
    setEstimatedPosition,
  });

  const hideAndReset = useCallback(() => {
    stopMouseTimer();
    stopKeyboardTimer();
    stopTouchTimer();
    hide();
  }, [stopMouseTimer, stopKeyboardTimer, stopTouchTimer, hide]);

  useOtherInteractionDisable(initiated.current, hideAndReset);

  return {
    hide,
    visible,
    position,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onContextMenu: handleContextMenu,
    },
  };
}
