"use client";
import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  TouchEvent,
} from "react";
import { useCallback, useReducer, useRef } from "react";
import { useElementInteractionContext } from "./ElementInteractionProvider.js";
import { RippleContainer } from "./RippleContainer.js";
import { useUserInteractionMode } from "./UserInteractionModeProvider.js";
import type {
  ElementInteractionHandlers,
  ElementInteractionState,
  RippleState,
  RippleStyle,
} from "./types.js";
import { getRippleStyle, releaseRipple, updateRipplesState } from "./utils.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-surface-inset"?: string | number;
    "--rmd-surface-border-radius"?: string | number;
  }
}

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
   * The ripple click/touch interaction. This will be `undefined` when the {@Link ElementInteractionMode}
   * is set to `"none"` or `"press"`.
   */
  ripples?: ReactElement;
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
 * import { useElementInteraction } from "@react-md/core";
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
 *     onBlur,
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
 *   const { handlers, pressed, ripples } =
 *     useElementInteraction({
 *       disabled,
 *       // pass remaining props so that if any event handlers were provided to
 *       // the component, they will be merged with the element interaction
 *       // handlers
 *       onBlur,
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
 *       {ripples}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param options - An object of {@link ElementInteractionOptions} that is used
 * to merge event handlers or disable the interactions.
 * @returns the {@link ElementInteractionHookReturnValue}
 * @remarks \@since 6.0.0 Touch interactions were removed since it never looked
 * good if the user touched a clickable element right before scrolling. The
 * ripple effect will only be fired on click now for touch devices.
 */
export function useElementInteraction<E extends HTMLElement>(
  options: ElementInteractionOptions<E> = {}
): ElementInteractionHookReturnValue<E> {
  const {
    onBlur = noop,
    onClick = noop,
    onMouseDown = noop,
    onMouseUp = noop,
    onMouseLeave = noop,
    onKeyUp = noop,
    onKeyDown = noop,
    onTouchStart = noop,
    onTouchEnd = noop,
    onTouchMove = noop,
    onDragStart = noop,
    disabled = false,
  } = options;

  const holding = useRef(false);
  const disableClick = useRef(false);
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
          // Note: unlike previous react-md versions, this will immediately
          // remove ALL ripple effects instead of trying to fade out. this seems
          // much nicer for touch devices when they are trying to scroll
          return {
            pressed: false,
            ripples: [],
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
  const { pressed } = state;

  let ripples: ReactElement | undefined;
  if (mode == "ripple") {
    ripples = (
      <RippleContainer
        ripples={state.ripples}
        onEntered={(ripple) => {
          dispatch({ type: "entered", ripple });
        }}
        onExited={(ripple) => {
          dispatch({ type: "exited", ripple });
        }}
      />
    );
  }

  return {
    pressed,
    pressedClassName:
      pressed && mode === "press" ? PRESSED_CLASS_NAME : undefined,
    ripples,
    handlers: {
      onBlur: useCallback(
        (event: FocusEvent<E>) => {
          onBlur(event);
          if (holding.current) {
            holding.current = false;
            dispatch({ type: "release" });
          }
        },
        [onBlur]
      ),
      onClick: useCallback(
        (event: MouseEvent<E>) => {
          if (disabled) {
            return;
          }

          onClick(event);
          if (
            event.isPropagationStopped() ||
            userMode === "touch" ||
            mode !== "ripple" ||
            disableClick.current ||
            holding.current ||
            document.activeElement === event.currentTarget
          ) {
            disableClick.current = false;
            return;
          }

          dispatch({
            type: "press",
            style: getRippleStyle(event, true),
          });
        },
        [disabled, mode, onClick, userMode]
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
          disableClick.current = true;
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
          dispatch({ type: "cancel" });
        },
        [isInteractionDisabled, onMouseLeave, userMode]
      ),
      onDragStart(event) {
        onDragStart(event);
        if (
          event.isPropagationStopped() ||
          !holding.current ||
          userMode !== "mouse"
        ) {
          return;
        }

        holding.current = false;
        dispatch({ type: "cancel" });
      },
      onKeyDown: useCallback(
        (event: KeyboardEvent<E>) => {
          onKeyDown(event);
          const { key } = event;
          const { tagName } = event.currentTarget;

          if (
            event.isPropagationStopped() ||
            userMode !== "keyboard" ||
            disabled ||
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

          if (holding.current || isInteractionDisabled) {
            return;
          }

          holding.current = true;
          dispatch({ type: "press", style: getRippleStyle(event, false) });
        },
        [disabled, isInteractionDisabled, onKeyDown, userMode]
      ),
      onKeyUp: useCallback(
        (event: KeyboardEvent<E>) => {
          onKeyUp(event);
          if (
            event.isPropagationStopped() ||
            isInteractionDisabled ||
            userMode !== "keyboard" ||
            !holding.current
          ) {
            return;
          }

          holding.current = false;
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
          dispatch({ type: "release" });
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
          dispatch({ type: "cancel" });
        },
        [isInteractionDisabled, onTouchMove]
      ),
    },
  };
}
