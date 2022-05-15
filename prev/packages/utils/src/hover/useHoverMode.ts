import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useUserInteractionMode } from "../mode";
import { useOnUnmount } from "../useOnUnmount";
import { DEFAULT_HOVER_MODE_EXIT_TIME } from "./constants";
import type { HoverModeActions } from "./useHoverModeContext";
import { useHoverModeContext } from "./useHoverModeContext";

/** @remarks \@since 5.0.0 */
export interface HoverModeHoverEventHandlers {
  /**
   * An optional event handler to merge with the hover mode visibility handler.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onMouseEnter<E extends HTMLElement>(event: MouseEvent<E>): void;

  /**
   * An optional event handler to merge with the hover mode visibility handler.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onMouseLeave<E extends HTMLElement>(event: MouseEvent<E>): void;
}

/**
 * An object of event handlers that should be provided to a component to enable
 * and disable the visibility of a temporary element while hovering over that
 * component.
 *
 * @remarks \@since 2.8.0
 * @remarks \@since 5.0.0 The `HTMLElement` type will be correctly inferred when
 * using them on multiple components.
 */
export interface HoverModeEventHandlers extends HoverModeHoverEventHandlers {
  /**
   * An optional event handler to merge with the hover mode visibility handler.
   * If this function calls `event.stopPropagation()`, the hover mode behavior
   * will be disabled.
   */
  onClick<E extends HTMLElement>(event: MouseEvent<E>): void;
}

/**
 * @remarks \@since 2.8.0
 * @remarks \@since 5.0.0 No longer has event handlers or a separate "sticky" API.
 */
export interface HoverModeOptions {
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
   * @defaultValue {@link DEFAULT_HOVER_MODE_EXIT_TIME}
   */
  exitVisibilityDelay?: number;
}

/**
 * @remarks \@since 5.0.0
 */
export interface HoverModeHookReturnValue
  extends HoverModeActions,
    HoverModeEventHandlers {
  /**
   * Boolean if the hover mode is currently working.
   */
  active: boolean;

  /**
   * Boolean if the the `visible` state is `true` because the user clicked an
   * element.
   */
  stuck: boolean;

  /**
   * Boolean if the temporary element should be visible.
   */
  visible: boolean;

  /**
   * A function to manually set the visibility state if you need even more
   * custom behavior.
   */
  setVisible: Dispatch<SetStateAction<boolean>>;

  /**
   * A convenience prop that allows you to spread all the hover mode event
   * handlers onto a single component if no custom functionality is required.
   *
   * @remarks \@since 5.0.0
   */
  handlers: Readonly<HoverModeEventHandlers>;

  /**
   * A convenience prop that allows you to spread only the `onMouseEnter` and
   * `onMouseLeave` the hover mode event handlers onto a single component if no
   * custom functionality is required.
   *
   * @remarks \@since 5.0.0
   */
  hoverHandlers: Readonly<HoverModeHoverEventHandlers>;

  /**
   * Clears the current `onMouseEnter` visibility timer.
   *
   * @remarks \@since 5.0.0
   */
  clearHoverTimeout(): void;
}

/**
 * This hook is used to add the hover mode functionality to any component.
 *
 * @example
 * Displaying a Color Preview when hovering a Hex Code
 * ```tsx
 * import type { ReactElement } from "react";
 * import { CSSTransition } from "@react-md/transition";
 * import { useHoverMode } from "@react-md/utils";
 *
 * interface Props {
 *   value: string;
 * }
 *
 * export default function Color({ value }: Props): ReactElement {
 *   const { visible, onMouseEnter, onMouseLeave } =
 *     useHoverMode({ exitVisibilityDelay: 0 });
 *
 *   return (
 *     <>
 *       <span
 *         onMouseEnter={onMouseEnter}
 *         onMouseLeave={onMouseLeave}
 *         style={{
 *           // pretend styles
 *         }}
 *       >
 *         {value}
 *       </span>
 *       <CSSTransition
 *         transitionIn={visible}
 *         classNames="opacity-change"
 *         timeout={150}
 *         temporary
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
 *   hoverHandlers,
 * } = useHoverMode();
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * return (
 *   <>
 *     <Button {...handlers} ref={buttonRef}>
 *       Click Me
 *     </Button>
 *     <FixedDialog
 *       {...hoverHandlers}
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
 * @remarks \@since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * @param options - An optional object of options to use. See
 * {@link HoverModeOptions} for more details.
 * @returns either the {@link HoverModeReturnValue} or {@link HoverModeReturnValue}
 */
export function useHoverMode({
  disabled = false,
  defaultVisible = false,
  exitVisibilityDelay = DEFAULT_HOVER_MODE_EXIT_TIME,
}: HoverModeOptions = {}): HoverModeHookReturnValue {
  const mode = useUserInteractionMode();
  const isTouch = mode === "touch";
  const [visible, setVisible] = useState(defaultVisible);
  const [stuck, setStuck] = useState(false);
  const timeoutRef = useRef<number>();
  const {
    visibleInTime,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
  } = useHoverModeContext();
  const active = visibleInTime === 0;

  useEffect(() => {
    if (!visible) {
      setStuck(false);
    }
  }, [visible]);

  useOnUnmount(() => {
    window.clearTimeout(timeoutRef.current);
  });

  const clearHoverTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  const onMouseEnter = useCallback(
    <E extends HTMLElement>(event: MouseEvent<E>) => {
      if (stuck || disabled || isTouch || event.isPropagationStopped()) {
        return;
      }

      clearHoverTimeout();
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
    [
      clearHoverTimeout,
      disabled,
      enableHoverMode,
      isTouch,
      stuck,
      visibleInTime,
    ]
  );

  const onMouseLeave = useCallback(
    <E extends HTMLElement>(event: MouseEvent<E>) => {
      if (stuck || disabled || isTouch || event.isPropagationStopped()) {
        return;
      }

      startDisableTimer();
      clearHoverTimeout();
      if (exitVisibilityDelay === 0) {
        setVisible(false);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        setVisible(false);
      }, exitVisibilityDelay);
    },
    [
      clearHoverTimeout,
      disabled,
      exitVisibilityDelay,
      isTouch,
      startDisableTimer,
      stuck,
    ]
  );

  const onClick = useCallback(
    <E extends HTMLElement>(event: MouseEvent<E>) => {
      if (event.isPropagationStopped()) {
        return;
      }

      // If the hover mode functionality is disabled, just allow this to behave
      // like a toggle visibility handler.
      if (!stuck && !disabled) {
        setStuck(true);
        setVisible(true);
      } else {
        setStuck(false);
        setVisible((prevVisible) => !prevVisible);
      }
    },
    [disabled, stuck]
  );

  return {
    active,
    stuck,
    visible,
    setVisible,
    onClick,
    onMouseEnter,
    onMouseLeave,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearHoverTimeout,
    handlers: {
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    hoverHandlers: {
      onMouseEnter,
      onMouseLeave,
    },
  };
}
