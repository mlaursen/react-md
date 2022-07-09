import type { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import { useCallback, useReducer, useRef } from "react";
import { useElementInteractionContext } from "./ElementInteractionProvider";
import type {
  ElementInteractionHandlers,
  ElementInteractionState,
  ProvidedRippleContainerProps,
  RippleState,
  RippleStyle,
} from "./types";
import { useUserInteractionMode } from "./UserInteractionModeProvider";
import { getRippleStyle, releaseRipple, updateRipplesState } from "./utils";

/** @remarks \@since 6.0.0 */
export const PRESSED_CLASS_NAME = "rmd-pressed";

/** @remarks \@since 6.0.0 */
export interface ElementInteractionOptions<E extends HTMLElement>
  extends Partial<ElementInteractionHandlers<E>> {
  /**
   * Boolean if the element is currently disabled which will prevent any of the
   * element interaction states from happening.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

/** @remarks \@since 6.0.0 */
export interface ElementInteractionHookReturnValue<E extends HTMLElement> {
  /**
   * The event handlers required for element interaction.
   */
  handlers: Readonly<ElementInteractionHandlers<E>>;

  /**
   * Boolean if the element is currently pressed. This will always be `false` if
   * the {@link ElementInteractionMode} is set to `"none"`
   */
  pressed: boolean;

  /**
   * This will be set to {@link PRESSED_CLASS_NAME} only when {@link pressed} is
   * `true` and the {@link ElementInteractionMode} is set to `"press"`. It will
   * be `undefined` otherwise.
   */
  pressedClassName: string | undefined;

  /**
   * Props to pass to the {@link RippleContainer} when the
   * {@link ElementInteractionMode} is set to `"ripple"`
   *
   * Note: this will be `undefined` if the {@link ElementInteractionMode} is set
   * to `"none"` or `"press"`
   */
  rippleContainerProps?: Readonly<ProvidedRippleContainerProps>;
}

type ElementInteractionAction =
  | { type: "press"; style?: RippleStyle; programmatic?: boolean }
  | { type: "release" | "cancel" }
  | { type: "entered" | "exited"; ripple: RippleState };

const noop = (): void => {
  // do nothing
};

/**
 * This hook is used to apply the required element interaction based on the
 * {@link ElementInteractionMode} and should generally be used internally only.
 *
 * @example
 * Providing Element Interaction
 * ```tsx
 * import { useElementInteraction, RippleContainer } from "@react-md/core";
 * import { cnb } from "cnbuilder";
 * import type { ReactElement } from "react";
 *
 * import styles from "./CustomComponent.module.scss";
 *
 * interface Props extends HTMLAttributes<HTMLDivElement> {
 *   disabled?: boolean;
 * }
 *
 * function CustomComponent(props: Props): ReactElement {
 *   const {
 *     disabled = false,
 *     className,
 *     onClick,
 *     onKeyDown,
 *     onKeyUp,
 *     onMouseDown,
 *     onMouseUp,
 *     onMouseLeave,
 *     onTouchStart,
 *     onTouchMove,
 *     onTouchEnd,
 *     ...remaining,
 *   } = props;
 *
 *   const { handlers, pressed, rippleContainerProps } =
 *     useElementInteraction({
 *       disabled,
 *       // pass remaining props so that if any event handlers were provided to
 *       // the component, they will be merged with the element interaction
 *       // handlers
 *       onClick,
 *       onKeyDown,
 *       onKeyUp,
 *       onMouseDown,
 *       onMouseUp,
 *       onMouseLeave,
 *       onTouchStart,
 *       onTouchMove,
 *       onTouchEnd,
 *     })
 *
 *   return (
 *     <div
 *       {...remaining}
 *       {...handlers}
 *       aria-disabled={disabled}
 *       role="button"
 *       className={cnb(styles.button, pressed && styles.pressed)}
 *       tabIndex={disabled ? undefined : 0}
 *     >
 *       {children}
 *       {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param options - An object of {@link ElementInteractionOptions} that is used
 * to merge event handlers or disable the interactions.
 * @returns the {@link ElementInteractionHookReturnValue}
 */
export function useElementInteraction<E extends HTMLElement>(
  options: ElementInteractionOptions<E> = {}
): ElementInteractionHookReturnValue<E> {
  const {
    onClick = noop,
    onMouseDown = noop,
    onMouseUp = noop,
    onMouseLeave = noop,
    onKeyUp = noop,
    onKeyDown = noop,
    onTouchStart = noop,
    onTouchEnd = noop,
    onTouchMove = noop,
    disabled = false,
  } = options;

  const holding = useRef(false);
  const userMode = useUserInteractionMode();
  const { mode } = useElementInteractionContext();
  const isInteractionDisabled = disabled || mode === "none";
  const [state, dispatch] = useReducer(
    function reducer(
      state: ElementInteractionState,
      action: ElementInteractionAction
    ): ElementInteractionState {
      switch (action.type) {
        case "press": {
          const { style } = action;
          let { ripples } = state;
          if (style) {
            ripples = [
              ...ripples,
              {
                style,
                entered: false,
                exiting: false,
                startTime: Date.now(),
              },
            ];
          }

          return {
            pressed: true,
            ripples,
          };
        }
        case "cancel":
          return {
            pressed: false,
            ripples: state.ripples.map((ripple) => ({
              ...ripple,
              entered: true,
              exiting: true,
            })),
          };
        case "release": {
          if (mode === "press") {
            return { ...state, pressed: false };
          }

          return releaseRipple(state);
        }
        case "entered":
          return updateRipplesState({
            type: "entered",
            state,
            ripple: action.ripple,
            holding: holding.current,
          });
        case "exited":
          return updateRipplesState({
            type: "exited",
            state,
            ripple: action.ripple,
            holding: holding.current,
          });

        default:
          return state;
      }
    },
    { pressed: false, ripples: [] }
  );
  const { pressed, ripples } = state;

  let rippleContainerProps: ProvidedRippleContainerProps | undefined;
  if (mode == "ripple") {
    rippleContainerProps = {
      ripples,
      onEntered(ripple) {
        dispatch({ type: "entered", ripple });
      },
      onExited(ripple) {
        dispatch({ type: "exited", ripple });
      },
    };
  }

  return {
    pressed,
    pressedClassName:
      pressed && mode === "press" ? PRESSED_CLASS_NAME : undefined,
    rippleContainerProps,
    handlers: {
      onClick: useCallback(
        (event: MouseEvent<E>) => {
          if (disabled) {
            return;
          }

          onClick(event);
          if (
            event.isPropagationStopped() ||
            mode !== "ripple" ||
            holding.current ||
            document.activeElement === event.currentTarget
          ) {
            return;
          }

          event.stopPropagation();
          dispatch({ type: "press", style: getRippleStyle(event, true) });
        },
        [disabled, mode, onClick]
      ),
      onMouseDown: useCallback(
        (event: MouseEvent<E>) => {
          onMouseDown(event);
          if (
            event.isPropagationStopped() ||
            isInteractionDisabled ||
            userMode !== "mouse" ||
            event.shiftKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.button !== 0
          ) {
            return;
          }

          // prevent text selection on double click
          // https://stackoverflow.com/a/43321596
          if (event.detail > 1) {
            event.preventDefault();
          }

          holding.current = true;
          event.stopPropagation();
          let style: RippleStyle | undefined;
          if (mode === "ripple") {
            style = getRippleStyle(event, false);
          }

          dispatch({ type: "press", style });
        },
        [onMouseDown, isInteractionDisabled, userMode, mode]
      ),
      onMouseUp: useCallback(
        (event: MouseEvent<E>) => {
          onMouseUp(event);
          if (event.isPropagationStopped() || isInteractionDisabled) {
            return;
          }

          holding.current = false;
          event.stopPropagation();
          dispatch({ type: "release" });
        },
        [isInteractionDisabled, onMouseUp]
      ),
      onMouseLeave: useCallback(
        (event: MouseEvent<E>) => {
          onMouseLeave(event);
          if (
            event.isPropagationStopped() ||
            isInteractionDisabled ||
            userMode !== "mouse" ||
            !holding.current
          ) {
            return;
          }

          holding.current = false;
          event.stopPropagation();
          dispatch({ type: "cancel" });
        },
        [isInteractionDisabled, onMouseLeave, userMode]
      ),
      onKeyDown: useCallback(
        (event: KeyboardEvent<E>) => {
          onKeyDown(event);
          const { key } = event;
          const { tagName } = event.currentTarget;

          if (
            event.isPropagationStopped() ||
            isInteractionDisabled ||
            userMode !== "keyboard" ||
            (key !== " " && key !== "Enter") ||
            // links do not support clicking on space
            (key === " " && tagName === "A") ||
            // inputs submit a form instead of clicking on enter
            (key === "Enter" && tagName === "INPUT")
          ) {
            return;
          }

          // stop propagation since we're starting to do custom event behavior
          // to click the element for everything except elements that the
          // browser clicks natively
          event.stopPropagation();

          if (tagName !== "BUTTON" && tagName !== "A") {
            if (key === " ") {
              // prevent the pager from scrolling
              event.preventDefault();
            }

            event.currentTarget.click();
          }

          if (holding.current) {
            return;
          }

          holding.current = true;
          dispatch({ type: "press", style: getRippleStyle(event, false) });
        },
        [isInteractionDisabled, onKeyDown, userMode]
      ),
      onKeyUp: useCallback(
        (event: KeyboardEvent<E>) => {
          onKeyUp(event);
          if (
            event.isPropagationStopped() ||
            isInteractionDisabled ||
            userMode !== "keyboard"
          ) {
            return;
          }

          holding.current = false;
          event.stopPropagation();
          dispatch({ type: "release" });
        },
        [isInteractionDisabled, onKeyUp, userMode]
      ),
      onTouchStart: useCallback(
        (event: TouchEvent<E>) => {
          onTouchStart(event);
          if (event.isPropagationStopped() || isInteractionDisabled) {
            return;
          }

          holding.current = true;
          event.stopPropagation();
          let style: RippleStyle | undefined;
          if (mode === "ripple") {
            style = getRippleStyle(event, false);
          }

          dispatch({ type: "press", style });
        },
        [mode, isInteractionDisabled, onTouchStart]
      ),
      onTouchEnd: useCallback(
        (event: TouchEvent<E>) => {
          onTouchEnd(event);
          if (event.isPropagationStopped() || isInteractionDisabled) {
            return;
          }

          holding.current = false;
          event.stopPropagation();
        },
        [isInteractionDisabled, onTouchEnd]
      ),
      onTouchMove: useCallback(
        (event: TouchEvent<E>) => {
          onTouchMove(event);
          if (event.isPropagationStopped() || isInteractionDisabled) {
            return;
          }

          holding.current = false;
          event.stopPropagation();
          dispatch({ type: "cancel" });
        },
        [isInteractionDisabled, onTouchMove]
      ),
    },
  };
}
