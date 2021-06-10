import {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useUserInteractionMode } from "../mode";
import { useOnUnmount } from "../useOnUnmount";
import { DEFAULT_HOVER_MODE_STICKY_EXIT_TIME } from "./constants";
import { HoverModeActions, useHoverModeContext } from "./useHoverModeContext";

/**
 * An object of event handlers that should be provided to a component to enable
 * and disable the visibility of a temporary element while hovering over that
 * component.
 *
 * @remarks \@since 2.8.0
 */
export interface HoverModeEventHandlers<E extends HTMLElement> {
  /**
   * An optional event handler to merge with the hover mode visibility hander.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onClick?: MouseEventHandler<E>;

  /**
   * An optional event handler to merge with the hover mode visibility hander.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onMouseEnter?: MouseEventHandler<E>;

  /**
   * An optional event handler to merge with the hover mode visibility hander.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onMouseLeave?: MouseEventHandler<E>;
}

/** @remarks \@since 2.8.0 */
export interface HoverModeOnlyOptions<E extends HTMLElement>
  extends HoverModeEventHandlers<E> {
  /**
   * Boolean if the hover mode functionality should be disabled.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Boolean if the element should start visible.
   *
   * @defaultValue `false`
   */
  defaultVisible?: boolean;

  /**
   * The amount of time to wait once the mouse has left the element before
   * setting the visibility to `false`.
   *
   * This will default to `0` if the `sticky` option is omitted or `false`.
   *
   * @defaultValue `0` or {@link DEFAULT_HOVER_MODE_STICKY_EXIT_TIME}
   */
  exitVisibilityDelay?: number;
}

/** @remarks \@since 2.8.0 */
export interface HoverModeOptions<E extends HTMLElement>
  extends HoverModeOnlyOptions<E>,
    HoverModeEventHandlers<E> {
  /**
   * Boolean if the hover mode should also provide a "sticky" mode which allows
   * the exit behavior to be disabled if the element is clicked.
   */
  sticky?: boolean;
}

/** @remarks \@since 2.8.0 */
export interface HoverModeOnlyReturnValue<E extends HTMLElement>
  extends HoverModeActions {
  /**
   * Boolean if the hover mode is currently working.
   */
  active: boolean;

  /**
   * Boolean if the temporary element should be visible.
   */
  visible: boolean;

  /** {@inheritDoc HoverModeEventHandlers} */
  handlers: Required<HoverModeEventHandlers<E>>;

  /**
   * A function to manually set the visibility state if you need even more
   * custom behavior.
   */
  setVisible: Dispatch<SetStateAction<boolean>>;
}

/** @remarks \@since 2.8.0 */
export interface HoverModeReturnValue<E extends HTMLElement>
  extends HoverModeOnlyReturnValue<E> {
  /**
   * Boolean if the the `visible` state is `true` because the user clicked an
   * element with the `stickyHandlers`.
   */
  stuck?: boolean;

  /** {@inheritDoc StickyHoverModeEventHandlers} */
  stickyHandlers?: Required<HoverModeEventHandlers<E>>;
}

/**
 * This hook is used to add the hover mode functionality to any component.
 *
 * @example
 * Displaying a Color Preview when hovering a Hex Code
 * ```tsx
 * interface Props {
 *   value: string;
 * }
 *
 * export default function Color({ value }: Props): ReactElement {
 *   const { visible, handlers } = useHoverMode();
 *
 *   return (
 *     <>
 *       <span
 *         {...handlers}
 *         style={{
 *           // pretend styles
 *         }}
 *       >
 *         {value}
 *       </span>
 *       <CSSTransition
 *         in={visible}
 *         classNames="opacity-change"
 *         timeout={150}
 *         mountOnEnter
 *         unmountOnExit
 *       >
 *         <span
 *           style={{
 *             backgroundColor: value,
 *             // other styles
 *           }}
 *         />
 *      </CSSTransition>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Sticky Usage with a Fixed Dialog
 * ```tsx
 * const {
 *   stuck,
 *   active,
 *   visible,
 *   setVisible,
 *   handlers,
 *   stickyHandlers,
 * } = useHoverMode({ sticky: true });
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * return (
 *   <>
 *     <Button ref={buttonRef} {...stickyHandlers}>
 *       Click Me
 *     </Button>
 *     <FixedDialog
 *       {...handlers}
 *       aria-labelledby="dialog-title-id"
 *       id="dialog-id"
 *       visible={visible}
 *       onRequestClose={() => setVisible(false)}
 *       fixedTo={buttonRef}
 *       anchor={BELOW_CENTER_ANCHOR}
 *       options={{ preventOverlap: true }}
 *       // this allows the close on outside click"" behavior" to work
 *       overlay={!stuck && active ? false : undefined}
 *       disableScrollLock={active}
 *     >
 *       <YourDialogContent />
 *    </FixedDialog>
 *   </>
 * );
 * ```
 *
 * @remarks \@since 2.8.0
 * @param options - An optional object of options to use. See
 * {@link HoverModeOnlyOptions} and {@link HoverModeOptions} for more details.
 * @returns either the {@link HoverModeReturnValue} or {@link HoverModeReturnValue}
 */
export function useHoverMode<E extends HTMLElement>(
  options?: HoverModeOnlyOptions<E>
): HoverModeOnlyReturnValue<E>;
export function useHoverMode<E extends HTMLElement>(
  options: HoverModeOptions<E> & {
    sticky?: false;
  }
): HoverModeOnlyReturnValue<E>;
export function useHoverMode<E extends HTMLElement>(
  options: HoverModeOptions<E> & { sticky: true }
): HoverModeReturnValue<E> & {
  stuck: boolean;
  stickyHandlers: Required<HoverModeEventHandlers<E>>;
};
export function useHoverMode<E extends HTMLElement>({
  disabled = false,
  sticky = false,
  onClick: propOnClick,
  onMouseEnter: propOnMouseEnter,
  onMouseLeave: propOnMouseLeave,
  defaultVisible = false,
  exitVisibilityDelay = sticky ? DEFAULT_HOVER_MODE_STICKY_EXIT_TIME : 0,
}: HoverModeOptions<E> = {}): HoverModeReturnValue<E> {
  const mode = useUserInteractionMode();
  const isTouch = mode === "touch";
  const [visible, setVisible] = useState(defaultVisible);
  const [stuck, setStuck] = useState(false);
  const timeoutRef = useRef<number>();
  const skipReset = useRef(defaultVisible);
  const {
    visibleInTime,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
  } = useHoverModeContext();
  const active = visibleInTime === 0;

  useEffect(() => {
    if (sticky && !visible) {
      setStuck(false);
    }
  }, [visible, sticky]);

  useOnUnmount(() => {
    window.clearTimeout(timeoutRef.current);
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    const reset = (): void => {
      setVisible(false);
      disableHoverMode();
      window.clearTimeout(timeoutRef.current);
    };

    // this is just used so the `defaultOption` can be used
    if (!skipReset.current) {
      reset();
    }
    skipReset.current = false;

    window.addEventListener("mousedown", reset);
    return () => {
      window.removeEventListener("mousedown", reset);
    };
  }, [disableHoverMode, mode, disabled]);

  const onMouseEnter = useCallback(
    (event: MouseEvent<E>) => {
      propOnMouseEnter?.(event);
      if (stuck || disabled || isTouch || event.isPropagationStopped()) {
        return;
      }

      window.clearTimeout(timeoutRef.current);
      if (visibleInTime === 0) {
        enableHoverMode();
        setVisible(true);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        enableHoverMode();
        setVisible(true);
      }, visibleInTime);
    },
    [disabled, enableHoverMode, isTouch, propOnMouseEnter, stuck, visibleInTime]
  );

  const onMouseLeave = useCallback(
    (event: MouseEvent<E>) => {
      propOnMouseLeave?.(event);
      if (stuck || disabled || isTouch || event.isPropagationStopped()) {
        return;
      }

      startDisableTimer();
      window.clearTimeout(timeoutRef.current);
      if (exitVisibilityDelay === 0) {
        setVisible(false);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        setVisible(false);
      }, exitVisibilityDelay);
    },
    [
      disabled,
      exitVisibilityDelay,
      isTouch,
      propOnMouseLeave,
      startDisableTimer,
      stuck,
    ]
  );

  const onClick = useCallback(
    (event: MouseEvent<E>) => {
      propOnClick?.(event);
      if (event.isPropagationStopped() || disabled) {
        return;
      }

      startDisableTimer();
      window.clearTimeout(timeoutRef.current);
    },
    [disabled, propOnClick, startDisableTimer]
  );

  const onStickyClick = useCallback(
    (event: MouseEvent<E>) => {
      propOnClick?.(event);
      if (event.isPropagationStopped() || disabled) {
        return;
      }

      if (!stuck) {
        setStuck(true);
        setVisible(true);
        disableHoverMode();
      } else {
        setStuck(false);
        setVisible((prevVisible) => !prevVisible);
      }
    },
    [disableHoverMode, disabled, propOnClick, stuck]
  );

  const handlers: Required<HoverModeEventHandlers<E>> = {
    onClick,
    onMouseEnter,
    onMouseLeave,
  };

  let stickyHandlers: Required<HoverModeEventHandlers<E>> | undefined;
  if (sticky) {
    stickyHandlers = {
      ...handlers,
      onClick: onStickyClick,
    };
  }

  return {
    active,
    stuck: sticky ? stuck : undefined,
    visible,
    setVisible,
    handlers,
    stickyHandlers,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
  };
}
