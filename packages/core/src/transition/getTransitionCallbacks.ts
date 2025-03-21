import { TRANSITION_CONFIG } from "./config.js";
import {
  type TransitionCallbacks,
  type TransitionEnterHandler,
  type TransitionExitHandler,
} from "./types.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export interface GetTransitionCallbacksOptions extends TransitionCallbacks {
  /**
   * Set this to `true` if the `onEnterOnce` callback should be triggered for
   * the `onEnter` callback instead of `onEntering`.
   *
   * @defaultValue `false`
   */
  enter?: boolean;

  /**
   * If this function is provided, it will be called:
   *
   * - `onEntered` if `disableTransition` is `true` or
   *   `TRANSITION_CONFIG.disabled` is `true`
   * - otherwise:
   *   - `onEnter` if `enter` is `true`
   *   - `onEntering` if `enter` is `false` or not provided
   */
  onEnterOnce?: TransitionEnterHandler;

  /**
   * Set this to `true` if the `onExitOnce` callback should be triggered for
   * the `onExit` callback instead of `onExiting`.
   *
   * @defaultValue `false`
   */
  exit?: boolean;

  /**
   * If this function is provided, it will be called:
   *
   * - `onExited` if `disableTransition` is `true` or
   *   `TRANSITION_CONFIG.disabled` is `true`
   * - otherwise:
   *   - `onExit` if `enter` is `true`
   *   - `onExiting` if `enter` is `false` or not provided
   */
  onExitOnce?: TransitionExitHandler;

  /**
   * Set this to `true` if the component has manually disabled transitions.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * This is a helper function for applying specific effects to the transition
 * callbacks when transitions might be disabled. This is probably an internal
 * only function, but might be useful externally as well. Here are a few
 * examples for it's usage internally:
 *
 * @example Focus Behavior
 * ```tsx
 *
 * ```
 *
 * @example Autocomplete Behavior
 * ```tsx
 *   listboxProps={{
 *      ...getTransitionCallbacks({
 *        enter: true,
 *        onEnter,
 *        onEntered,
 *        onEnterOnce: () => {
 *          onOpen();
 *
 *          // when the listbox is opened, need to flag the entered state to show
 *          // that new `query` values should be accepted. Also store the initial
 *          // query.
 *          entered.current = true;
 *          initialQuery.current = query;
 *        },
 *        disableTransition,
 *      }),
 *    }}
 * ```
 *
 * @since 6.0.0
 */
export function getTransitionCallbacks(
  options: GetTransitionCallbacksOptions
): Required<TransitionCallbacks> {
  const {
    disableTransition,
    enter,
    onEnter,
    onEntered,
    onEntering,
    onEnterOnce = noop,
    exit,
    onExit,
    onExited,
    onExiting,
    onExitOnce = noop,
  } = options;

  const handleEnter =
    (callback: TransitionEnterHandler = noop, skipped: boolean | undefined) =>
    (appearing: boolean): void => {
      callback(appearing);
      if (!skipped) {
        onEnterOnce(appearing);
      }
    };

  const handleExit =
    (callback: TransitionExitHandler = noop, skipped: boolean | undefined) =>
    (): void => {
      callback();
      if (!skipped) {
        onExitOnce();
      }
    };

  return {
    onEnter: handleEnter(onEnter, !enter),
    onEntering: handleEnter(onEntering, enter),
    onEntered: handleEnter(
      onEntered,
      !disableTransition && !TRANSITION_CONFIG.disabled
    ),
    onExit: handleExit(onExit, !exit),
    onExiting: handleExit(onExiting, exit),
    onExited: handleExit(
      onExited,
      !disableTransition && !TRANSITION_CONFIG.disabled
    ),
  };
}
