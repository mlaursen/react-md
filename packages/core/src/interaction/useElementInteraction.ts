import type {
  MouseEvent,
  KeyboardEvent,
  TouchEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import { useCallback, useReducer, useRef } from "react";
import { useElementInteractionMode } from "./ElementInteractionModeProvider";
import type { UserInteractionMode } from "./UserInteractionModeProvider";
import { useUserInteractionMode } from "./UserInteractionModeProvider";

export interface ElementInteractionState {
  pressed: boolean;
}

export interface ElementInteractionHandlers<E extends HTMLElement> {
  onClick: MouseEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
  onKeyUp: KeyboardEventHandler<E>;
  onMouseDown: MouseEventHandler<E>;
  onMouseUp: MouseEventHandler<E>;
  onMouseLeave: MouseEventHandler<E>;
  onTouchStart: TouchEventHandler<E>;
  onTouchMove: TouchEventHandler<E>;
  onTouchEnd: TouchEventHandler<E>;
}

export interface ElementInteractionOptions<E extends HTMLElement>
  extends Partial<ElementInteractionHandlers<E>> {
  disabled?: boolean;
}

export interface ElementInteractionHookReturnValue<E extends HTMLElement>
  extends Required<ElementInteractionHandlers<E>> {
  pressed: boolean;
}

type ElementInteractionAction =
  | { type: "press"; x: number; y: number }
  | { type: "release" };

function calcHypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

/**
 * Gets the current radius for a ripple based on the x and y page dimensions
 * as well as the size of the element.
 *
 * This is really just in a separate file so I can easily mock this and write
 * tests.
 */
function getRadius(
  x: number,
  y: number,
  offsetWidth: number,
  offsetHeight: number
): number {
  return Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );
}

interface State {
  pressed: boolean;
  [key: string]: unknown;
}

const noop = (): void => {
  // do nothing
};

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
  const holding = useRef<UserInteractionMode | null>(null);
  const userMode = useUserInteractionMode();
  const elementMode = useElementInteractionMode();
  const isInteractionDisabled = disabled || elementMode === "none";
  const [state, dispatch] = useReducer(
    function reducer(state: State, action: ElementInteractionAction): State {
      switch (action.type) {
        case "press": {
          if (elementMode === "press") {
            return {
              ...state,
              pressed: true,
            };
          }

          // const radius = getRadius(x, y, offsetWidth, offsetHeight);
          // const size = radius * 2;
          // do something
          return state;
        }
        case "release":
          if (elementMode === "press") {
            return { ...state, pressed: false };
          }

          return state;
        default:
          return state;
      }
    },
    { pressed: false }
  );
  const { pressed } = state;

  return {
    pressed,
    onClick: useCallback(
      (event: MouseEvent<E>) => {
        onClick(event);
        if (event.isPropagationStopped() || isInteractionDisabled) {
          return;
        }
      },
      [isInteractionDisabled, onClick]
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

        event.stopPropagation();
        holding.current = "mouse";
        const { pageX, pageY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = pageX - (rect.left + window.pageXOffset);
        const y = pageY - (rect.top + window.pageYOffset);
        dispatch({ type: "press", x, y });
      },
      [isInteractionDisabled, onMouseDown, userMode]
    ),
    onMouseUp: useCallback(
      (event: MouseEvent<E>) => {
        onMouseUp(event);
        if (
          event.isPropagationStopped() ||
          isInteractionDisabled ||
          holding.current !== "mouse"
        ) {
          return;
        }

        event.stopPropagation();
        holding.current = null;
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
          holding.current !== "mouse"
        ) {
          return;
        }

        event.stopPropagation();
        holding.current = null;
        dispatch({ type: "release" });
      },
      [isInteractionDisabled, onMouseLeave]
    ),
    onKeyDown: useCallback(
      (event: KeyboardEvent<E>) => {
        onKeyDown(event);
        if (event.isPropagationStopped() || isInteractionDisabled) {
          return;
        }

        event.stopPropagation();
      },
      [isInteractionDisabled, onKeyDown]
    ),
    onKeyUp: useCallback(
      (event: KeyboardEvent<E>) => {
        onKeyUp(event);
        if (
          event.isPropagationStopped() ||
          isInteractionDisabled ||
          holding.current !== "keyboard"
        ) {
          return;
        }

        event.stopPropagation();
        holding.current = null;
      },
      [isInteractionDisabled, onKeyUp]
    ),
    onTouchStart: useCallback(
      (event: TouchEvent<E>) => {
        onTouchStart(event);
        if (event.isPropagationStopped() || isInteractionDisabled) {
          return;
        }

        event.stopPropagation();
        holding.current = "touch";
        const { pageX, pageY } = event.touches[0];
        const rect = event.currentTarget.getBoundingClientRect();
        const x = pageX - (rect.left + window.pageXOffset);
        const y = pageY - (rect.top + window.pageYOffset);
        dispatch({ type: "press", x, y });
      },
      [isInteractionDisabled, onTouchStart]
    ),
    onTouchEnd: useCallback(
      (event: TouchEvent<E>) => {
        onTouchEnd(event);
        if (
          event.isPropagationStopped() ||
          isInteractionDisabled ||
          holding.current !== "touch"
        ) {
          return;
        }

        event.stopPropagation();
        holding.current = null;
      },
      [isInteractionDisabled, onTouchEnd]
    ),
    onTouchMove: useCallback(
      (event: TouchEvent<E>) => {
        onTouchMove(event);
        if (
          event.isPropagationStopped() ||
          isInteractionDisabled ||
          holding.current !== "touch"
        ) {
          return;
        }

        event.stopPropagation();
        holding.current = null;
      },
      [isInteractionDisabled, onTouchMove]
    ),
  };
}
