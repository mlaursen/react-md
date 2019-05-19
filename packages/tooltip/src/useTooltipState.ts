import { useCallback, useEffect, useRef } from "react";
import { useInteractionModeContext } from "@react-md/states";
import { SimplePosition, useToggle } from "@react-md/utils";

import { DEFAULT_DELAY, DEFAULT_THRESHOLD } from "./constants";
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

interface OtherInteractionsHideOptions {
  hideTooltip: () => void;
  visible: boolean;
}

/**
 * When the tooltip becomes visible, the tooltip should be hidden if any element
 * within the page is clicked, or the browser is blurred. This hook will just
 * add the required event listeners to hide the tooltip.
 *
 * Whent he entire window is blurred, we start a different flow to ensure that
 * a tooltip won't appear when the window is re-focused. Without this flow, a
 * keyboard user that had focused a tooltippable element will have the tooltip
 * appear again after `x`ms which is not wanted. The user will need to manually
 * re-focus the tooltippable element to show a tooltip again.
 */
export function useOtherInteractionDisable({
  visible,
  hideTooltip,
}: OtherInteractionsHideOptions) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    window.addEventListener("click", hideTooltip, true);
    return () => {
      window.removeEventListener("click", hideTooltip, true);
    };
  }, [visible, hideTooltip]);
}

export interface TooltipStateOptions
  extends MergableHandlers,
    Pick<TooltipProps, "position">,
    Pick<VisibilityChangeOptions, "onShow" | "onHide"> {
  /**
   * The threshold multiplier to apply to the entire viewheight to determine if the tooltip should be placed above or below
   * the container element.
   */
  positionThreshold?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the user keyboard
   * focuses the container element.
   */
  focusDelay?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the user hovers
   * the container element.
   */
  hoverDelay?: number;

  /**
   * The amount of time in ms to wait before triggering the exit animation after the user stops
   * touching the container element on mobile devices.
   */
  touchTimeout?: number;

  /**
   * The default position to use for the "auto" positioning mode.
   */
  defaultPosition: SimplePosition;

  /**
   * Bolean if the hover mode functionality should be disabled. When this is `undefined`, it will default to `false` if there is
   * no `ToolipHoverModeConfig` parent component of the current tooltip, otherwise it will be `true`. When this value is a boolean,
   * it will always be used instead.
   */
  disableHoverMode?: boolean;
}

/**
 * This is a reusable hook that allows you to have all the event listeners and visibility
 * logic of toolips so it can be used for any component. This is extremely helpful for when
 * you want to create more complex tooltips (like dialogs).
 *
 * The tooltip state flow is pretty complex, so here's a quick run down of some of the logic:
 * - the tooltip can only be shown by mouse, keyboard, or touch and can only be closed by the
 *   same "initiation" type. So basically if the tooltip was shown via mouse, it can only be
 *   closed by mouse as well.
 * - if the user resizes the window, scrolls the page, clicks anywhere on the page, switches tabs/
 *   blurs the browser window while the tooltip is visible, the tooltip will be hidden.
 * - a keyboard user can hide the tooltip by pressing the escape key after it was shown by focusing
 *   the element
 *
 * Since the tooltip can appear above or below the element, the position of the tooltip must be
 * determined before the tooltip becomes visible or else the animation will be in the wrong direction.
 * So when one of the starting interaction types happen to the container element, the initial position
 * is "guessed" based on the current viewport height and the position of the container element within
 * the viewport.
 */
export default function useTooltipState({
  position: propPosition,
  defaultPosition,
  positionThreshold = DEFAULT_THRESHOLD,
  hoverDelay = DEFAULT_DELAY,
  touchTimeout = DEFAULT_DELAY,
  focusDelay = DEFAULT_DELAY,
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
}: TooltipStateOptions) {
  const mode = useInteractionModeContext();
  const initiated = useRef<TooltipInitiated>(null);
  const setInitiated = useCallback((initiatedBy: TooltipInitiated) => {
    initiated.current = initiatedBy;
  }, []);

  const { toggled: visible, enable: showTooltip, disable: hide } = useToggle();
  const hideTooltip = useCallback(() => {
    initiated.current = null;
    hide();
  }, []);

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

  const { stopMouseTimer, mouseHandlers } = useMouseState({
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

  const { stopKeyboardTimer, keyboardHandlers } = useKeyboardState({
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

  const { stopTouchTimer, touchHandlers } = useTouchState({
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
  }, []);

  useOtherInteractionDisable({ visible, hideTooltip: hideAndReset });

  return {
    hide,
    visible,
    position,
    handlers: {
      ...mouseHandlers,
      ...keyboardHandlers,
      ...touchHandlers,
    },
  };
}
