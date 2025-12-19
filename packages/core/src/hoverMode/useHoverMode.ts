"use client";

import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import {
  type SimpleHoverModeContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type useHoverModeProvider,
} from "./useHoverModeProvider.js";

/**
 * @since 6.0.0
 */
export interface HoverModeConfigurationOptions extends SimpleHoverModeContext {
  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * This can be used to override the `HoverModeContext`'s hover time.
   */
  hoverTimeout?: number;

  /**
   * This can be used to override the `HoverModeContext`'s leave time.
   */
  leaveTimeout?: number;
}

/**
 * @since 6.0.0
 */
export interface ControlledHoverModeOptions extends HoverModeConfigurationOptions {
  setVisible: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface ControlledHoverModeImplementation {
  startShowFlow: (id?: string | MouseEvent) => void;
  startHideFlow: () => void;
  clearVisibilityTimeout: () => void;
}

/**
 * @since 6.0.0
 */
export interface UncontrolledHoverModeOptions extends HoverModeConfigurationOptions {
  defaultVisible?: UseStateInitializer<boolean>;
}

/**
 * @since 6.0.0
 */
export interface UncontrolledHoverModeImplementation extends ControlledHoverModeImplementation {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface HoverModeImplementation extends ControlledHoverModeImplementation {
  visible?: boolean;
  setVisible?: UseStateSetter<boolean>;
}

/**
 * The `useHoverMode` hook is used to implement an immediate hover state after
 * hovering related elements for a short duration. The main use-case is for
 * showing tooltips immediately after hovering another tooltipped element.
 *
 * This relies on creating a context provider using {@link useHoverModeProvider}
 * to link related elements together.
 *
 * @example Example Usage
 * ```ts
 * import { type MouseEvent } from "react";
 *
 * import {
 *   type CustomHoverContext,
 *   useCustomHoverContext,
 * } from "./useCustomHoverContext.jsx";
 *
 * interface CustomHoverModeImplementation {
 *   onMouseEnter: <E extends HTMLElement>(event: MouseEvent<E>) => void;
 *   onMouseLeave: <E extends HTMLElement>(event: MouseEvent<E>) => void;
 * }
 *
 * function useCustomHoverMode(): CustomHoverModeImplementation {
 *   const {
 *     animatedOnceRef,
 *     hoverTimeoutRef,
 *     leaveTimeoutRef,
 *     enableHoverMode,
 *     disableHoverMode,
 *     startDisableTimer,
 *     clearDisableTimer,
 *   } = useCustomHoverContext();
 *   const {
 *     visible,
 *     setVisible,
 *     startShowFlow,
 *     startHideFlow,
 *     clearVisibilityTimeout,
 *   } = useHoverMode({
 *     hoverTimeout,
 *     hoverTimeoutRef,
 *     leaveTimeout,
 *     leaveTimeoutRef,
 *     enableHoverMode,
 *     disableHoverMode,
 *     startDisableTimer,
 *     clearDisableTimer,
 *   });
 *
 *   return {
 *     onMouseEnter(event) {
 *       startShowFlow(event.currentTarget.id);
 *     },
 *     onMouseLeave(event) {
 *       startHideFlow();
 *     },
 *   };
 * }
 * ```
 *
 * @see The `useTooltip` source code for a real world example.
 *
 * @since 2.8.0
 * @since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * @since 6.0.0 Requires passing the custom hover mode context to
 * work.
 */
export function useHoverMode(
  options: ControlledHoverModeOptions
): ControlledHoverModeImplementation;
export function useHoverMode(
  options: UncontrolledHoverModeOptions
): UncontrolledHoverModeImplementation;
export function useHoverMode(
  options: ControlledHoverModeOptions | UncontrolledHoverModeOptions
): HoverModeImplementation {
  const {
    disabled,
    hoverTimeout: hoverTime,
    hoverTimeoutRef,
    leaveTimeout: leaveTime,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
    setVisible: propSetVisible,
    defaultVisible = false,
  } = options as ControlledHoverModeOptions & UncontrolledHoverModeOptions;

  const state = useState(defaultVisible);
  let visible: boolean | undefined;
  let setVisible: UseStateSetter<boolean>;
  if (propSetVisible !== undefined) {
    setVisible = propSetVisible;
  } else {
    [visible, setVisible] = state;
  }

  const visibilityTimeout = useRef<NodeJS.Timeout>();
  const clearVisibilityTimeout = useCallback(() => {
    globalThis.clearTimeout(visibilityTimeout.current);
  }, []);

  // if the element is near the viewport edge, the mouseleave event might not
  // trigger correctly. for these cases, just clear any timeouts to be safe.
  // do not hide the visibility so that you can still inspect things in the
  // devtools
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handler = (): void => {
      globalThis.clearTimeout(visibilityTimeout.current);

      // might need to play with this more or make it configurable. if the mouse
      // leaves the window, you're _normally_ not interacting with the app
      // anymore and state should reset.
      disableHoverMode();
    };

    document.addEventListener("mouseleave", handler);
    return () => {
      document.removeEventListener("mouseleave", handler);
    };
  }, [disableHoverMode, disabled]);

  useEffect(() => {
    return () => {
      globalThis.clearTimeout(visibilityTimeout.current);
    };
  }, []);

  return {
    visible,
    setVisible: setVisible === propSetVisible ? undefined : setVisible,
    startShowFlow: useCallback(
      (eventOrId) => {
        const hoverTimeout = hoverTime ?? hoverTimeoutRef.current;
        if (disabled || hoverTimeout === undefined) {
          return;
        }

        let id: string;
        if (typeof eventOrId === "string" || eventOrId === undefined) {
          id = eventOrId || "";
        } else {
          id = eventOrId.currentTarget.id;
        }

        clearDisableTimer();
        clearVisibilityTimeout();
        visibilityTimeout.current = globalThis.setTimeout(() => {
          enableHoverMode(id);
          setVisible(true);
        }, hoverTimeout);
      },
      [
        clearDisableTimer,
        clearVisibilityTimeout,
        disabled,
        enableHoverMode,
        hoverTime,
        hoverTimeoutRef,
        setVisible,
      ]
    ),
    startHideFlow: useCallback(() => {
      if (disabled) {
        return;
      }

      startDisableTimer();
      clearVisibilityTimeout();
      visibilityTimeout.current = globalThis.setTimeout(() => {
        setVisible(false);
      }, leaveTime ?? leaveTimeoutRef.current);
    }, [
      clearVisibilityTimeout,
      disabled,
      leaveTime,
      leaveTimeoutRef,
      setVisible,
      startDisableTimer,
    ]),
    clearVisibilityTimeout,
  };
}
