import {
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInteractionModeContext } from "@react-md/states";
import { UserInteractionMode } from "@react-md/states/types/useModeDetection";
import { getViewportSize, useTimeout, useToggle } from "@react-md/utils";
import { TooltipPosition, TooltipProps } from "./Tooltip";
import { DEFAULT_DELAY, DEFAULT_THRESHOLD } from "./constants";

type TooltipInitiated = UserInteractionMode | "window";

interface HandlersBaseOptions {
  mode: UserInteractionMode;
  showTooltip: () => void;
  hideTooltip: () => void;
  /**
   * This is _normally_ triggered at when a timeout starts to help determine what the
   * animation position for the tooltip should be. If this isn't set before the animation
   * starts, the tooltip will animate weirdly.
   */
  setEstimatedPosition: (container: HTMLElement) => void;

  /**
   * The type of interaction that initiated the tooltip. When this value is `null`,
   * the tooltip hasn't been initiated yet and _should_ not be visible within the
   * page as well.
   *
   * When this is set to "window", it means that the tooltip was visible when the entire
   * window was blurred. Check out the keyboard `onFocus` comment for more info about
   * this flow.
   */
  initiated: MutableRefObject<TooltipInitiated | null>;

  /**
   * A small callback that will set the current initiation type for the tooltip.
   */
  setInitiated: (mode: TooltipInitiated) => void;

  /**
   * The amount of delay to wait before showing the tooltip for the mouse and keyboard
   * flows. In the touch flow, this is the amount of time before the tooltip will hide
   * after the user releases their finger from the phone.
   */
  delay: number;
}

type MergableMouseHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onMouseEnter" | "onMouseLeave"
>;

interface MouseOptions extends MergableMouseHandlers, HandlersBaseOptions {}

/**
 * This handles creating and returning the required mouse event listeners
 * to show and hide tooltips as needed. If there were any mouse event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 */
export function useMouseState({
  mode,
  showTooltip,
  hideTooltip,
  initiated,
  setInitiated,
  delay,
  onMouseEnter,
  onMouseLeave,
  setEstimatedPosition,
}: MouseOptions) {
  const handlers = useRef({ onMouseEnter, onMouseLeave });
  useEffect(() => {
    handlers.current = { onMouseEnter, onMouseLeave };
  });

  const { start, stop } = useTimeout(() => {
    if (initiated.current === "mouse") {
      showTooltip();
    }
  }, delay);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseEnter } = handlers.current;
      if (onMouseEnter) {
        onMouseEnter(event);
      }

      if (initiated.current !== null) {
        return;
      }

      setInitiated("mouse");
      setEstimatedPosition(event.currentTarget);
      start();
    },
    []
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseLeave } = handlers.current;
      if (onMouseLeave) {
        onMouseLeave(event);
      }

      if (initiated.current !== "mouse") {
        return;
      }

      stop();
      hideTooltip();
    },
    []
  );

  return {
    stopMouseTimer: stop,
    mouseHandlers: {
      // the mouse flows should not be returned for the touch mode since
      // the mouseenter event is still triggered after a touch
      onMouseEnter: mode !== "touch" ? handleMouseEnter : onMouseEnter,
      onMouseLeave: mode !== "touch" ? handleMouseLeave : onMouseLeave,
    },
  };
}

type MergableKeyboardHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onFocus" | "onKeyDown"
>;

interface KeyboardOptions
  extends MergableKeyboardHandlers,
    HandlersBaseOptions {}

/**
 * This handles creating and returning the required keyboard event listeners
 * to show and hide tooltips as needed. If there were any keyboard event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 */
export function useKeyboardState({
  mode,
  showTooltip,
  hideTooltip,
  delay,
  initiated,
  setInitiated,
  onFocus,
  onKeyDown,
  setEstimatedPosition,
}: KeyboardOptions) {
  const handlers = useRef({ onFocus, onKeyDown });
  useEffect(() => {
    handlers.current = { onFocus, onKeyDown };
  });

  const { start, stop } = useTimeout(() => {
    if (initiated.current === "keyboard") {
      showTooltip();
    }
  }, delay);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const { onFocus } = handlers.current;
    if (onFocus) {
      onFocus(event);
    }

    // if the entire browser window was blurred, we don't want to show the tooltip
    // on the next focus event since it is confusing to see a tooltip appear again
    // after re-focusing a window.
    if (initiated.current === "window") {
      initiated.current = null;
      return;
    }

    setInitiated("keyboard");
    setEstimatedPosition(event.currentTarget);
    start();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const { onKeyDown } = handlers.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      stop();
      if (initiated.current === "keyboard" && event.key === "Escape") {
        hideTooltip();
      }
    },
    []
  );

  return {
    stopKeyboardTimer: stop,
    keyboardHandlers: {
      onFocus: mode === "keyboard" ? handleFocus : onFocus,
      onKeyDown: mode === "keyboard" ? handleKeyDown : onKeyDown,
    },
  };
}

type MergableTouchHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onTouchStart" | "onTouchMove" | "onContextMenu"
>;

interface TouchOptions extends MergableTouchHandlers, HandlersBaseOptions {
  visible: boolean;
}

/**
 * This handles creating and returning the required touch event listeners
 * to show and hide tooltips as needed. If there were any touch event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 *
 * Tooltips on touch devices are a bit different than mouse and keyboard. Since tooltips
 * appear after a long press on mobile and long presses on mobile cause a context menu
 * to appear, no timeouts for showing the tooltip are started after a touchstart event.
 * The tooltip will only appear after a contextmenu event which has the default behavior
 * prevented so the tooltip appears instead. After the tooltip appears, it will stay
 * visible as long as the user keeps their finter on their phone. Once they remove their
 * finger, the tooltip will be visible for another `x`ms to make it easier to read without
 * their finter in the way and finally hide.
 */
export function useTouchState({
  mode,
  visible,
  showTooltip,
  hideTooltip,
  delay,
  setInitiated,
  onTouchStart,
  onTouchMove,
  onContextMenu,
  setEstimatedPosition,
}: TouchOptions) {
  const touched = useRef(false);
  const handlers = useRef({ onTouchStart, onTouchMove, onContextMenu });
  useEffect(() => {
    handlers.current = { onTouchStart, onTouchMove, onContextMenu };
  });

  const { start, stop } = useTimeout(() => {
    touched.current = false;
    hideTooltip();
  }, delay);

  useEffect(() => {
    if (!visible || mode !== "touch") {
      touched.current = false;
      return;
    }

    const cb = () => {
      start();
      window.removeEventListener("touchend", cb, true);
    };

    window.addEventListener("touchend", cb, true);
    return () => {
      window.removeEventListener("touchend", cb, true);
    };
  }, [visible, mode]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchStart } = handlers.current;
      if (onTouchStart) {
        onTouchStart(event);
      }

      touched.current = true;
      stop();
      setEstimatedPosition(event.currentTarget);
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchMove } = handlers.current;
      if (onTouchMove) {
        onTouchMove(event);
      }

      touched.current = false;
    },
    []
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onContextMenu } = handlers.current;
      if (onContextMenu) {
        onContextMenu(event);
      }

      if (!touched.current) {
        return;
      }

      // need to prevent the context menu from appearing and instead show the tooltip
      event.preventDefault();

      // since the context menu might also select text by default, we want to deselect any
      // selected text if it is within the container element
      const selection = window.getSelection();
      const selectionNode =
        selection && selection.anchorNode && selection.anchorNode.parentElement;
      if (
        selection &&
        selectionNode &&
        event.currentTarget.contains(selectionNode)
      ) {
        selection.empty();
      }

      setInitiated("touch");
      showTooltip();
    },
    []
  );

  return {
    stopTouchTimer: stop,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onContextMenu: mode === "touch" ? handleContextMenu : onContextMenu,
    },
  };
}

interface OtherInteractionsHideOptions
  extends Pick<HandlersBaseOptions, "hideTooltip" | "setInitiated"> {
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
  setInitiated,
}: OtherInteractionsHideOptions) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleWindowBlur = (event: FocusEvent) => {
      if (event.target === window) {
        setInitiated("window");
      }

      hideTooltip();
    };

    window.addEventListener("click", hideTooltip, true);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("click", hideTooltip, true);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [visible, hideTooltip]);
}

interface PositionOptions {
  position?: TooltipPosition;
  defaultPosition: TooltipPosition;
  threshold: number;
}

const NOOP = () => {};

/**
 * A small hook that will set the tooltip position automatically based on the container
 * element's location within the viewport. However, if the `position` option/prop was
 * provided, that value will always be used instead.
 */
export function useTooltipPosition({
  position: determinedPosition,
  defaultPosition,
  threshold,
}: PositionOptions) {
  const [position, setPosition] = useState(defaultPosition);
  const prevPosition = useRef(position);
  useEffect(() => {
    prevPosition.current = position;
  });

  const setEstimatedPosition = useCallback((container: HTMLElement) => {
    const { top } = container.getBoundingClientRect();
    const vh = getViewportSize("height");
    const nextPosition = top > vh * threshold ? "above" : "below";
    if (prevPosition.current !== nextPosition) {
      setPosition(nextPosition);
    }
  }, []);

  const isDeterminedPosition = typeof determinedPosition !== "undefined";

  return {
    position: isDeterminedPosition ? determinedPosition : position,
    setEstimatedPosition: isDeterminedPosition ? NOOP : setEstimatedPosition,
  };
}

export type MergableHandlers = MergableMouseHandlers &
  MergableKeyboardHandlers &
  MergableTouchHandlers;

export interface TooltipStateOptions
  extends MergableHandlers,
    Pick<TooltipProps, "position"> {
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
  positionThreshold = DEFAULT_THRESHOLD,
  hoverDelay = DEFAULT_DELAY,
  touchTimeout = DEFAULT_DELAY,
  focusDelay = DEFAULT_DELAY,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onKeyDown,
}: TooltipStateOptions) {
  const mode = useInteractionModeContext();
  const initiated = useRef<TooltipInitiated | null>(null);
  const setInitiated = useCallback((initiatedBy: TooltipInitiated) => {
    initiated.current = initiatedBy;
  }, []);

  const { toggled: visible, enable: showTooltip, disable: hide } = useToggle();
  const hideTooltip = useCallback(() => {
    initiated.current = null;
    hide();
  }, []);

  const { position, setEstimatedPosition } = useTooltipPosition({
    position: propPosition,
    defaultPosition: "below",
    threshold: positionThreshold,
  });

  const { stopMouseTimer, mouseHandlers } = useMouseState({
    mode,
    showTooltip,
    hideTooltip,
    delay: hoverDelay,
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

  useOtherInteractionDisable({
    visible,
    hideTooltip: hideAndReset,
    setInitiated,
  });

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
