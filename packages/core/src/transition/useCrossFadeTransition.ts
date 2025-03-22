"use client";

import type {
  CSSTransitionClassNames,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionInDefaultedOptions,
  TransitionTimeout,
} from "./types.js";
import { useCSSTransition } from "./useCSSTransition.js";

/**
 * The default cross fade transition timeout.
 *
 * @since 2.0.0
 * @since 6.0.0 Renamed from `CROSS_FADE_TIMEOUT` to
 * `DEFAULT_CROSS_FADE_TIMEOUT`
 */
export const DEFAULT_CROSS_FADE_TIMEOUT = {
  appear: 300,
  enter: 300,
  exit: 0,
} as const satisfies TransitionTimeout;

/**
 * The default cross fade transition classes to use.
 *
 * @since 2.0.0
 * @since 6.0.0 Renamed from `CROSS_FADE_CLASSNAMES` to
 * `DEFAULT_CROSS_FADE_CLASSNAMES`.
 */
export const DEFAULT_CROSS_FADE_CLASSNAMES = {
  appear: "rmd-cross-fade",
  appearActive: "rmd-cross-fade--active",
  enter: "rmd-cross-fade",
  enterActive: "rmd-cross-fade--active",
} as const satisfies CSSTransitionClassNames;

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CrossFadeTransitionHookOptions<E extends HTMLElement>
  extends PreconfiguredCSSTransitionInDefaultedOptions<E> {
  /**
   * @see {@link TransitionTimeout}
   * @see {@link DEFAULT_CROSS_FADE_TIMEOUT}
   * @defaultValue `CROSS_FADE_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   * @see {@link CSSTransitionClassNames}
   * @see {@link DEFAULT_CROSS_FADE_CLASSNAMES}
   * @defaultValue `CROSS_FADE_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;

  /**
   * @see {@link PreconfiguredCSSTransitionInDefaultedOptions.transitionIn}
   * @defaultValue `true`
   */
  transitionIn?: boolean;
}

/**
 * This hook is used to create a "cross fade" transition -- a transition that
 * gradually increases the opacity and transforms the element vertically a short
 * distance. This is generally used for full page transitions when a route
 * changes.
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export function useCrossFadeTransition<E extends HTMLElement>(
  options: CrossFadeTransitionHookOptions<E> = {}
): CSSTransitionHookReturnValue<E> {
  const {
    appear = false,
    transitionIn = true,
    timeout = DEFAULT_CROSS_FADE_TIMEOUT,
    classNames = DEFAULT_CROSS_FADE_CLASSNAMES,
    ...cssOptions
  } = options;

  return useCSSTransition({
    ...cssOptions,
    appear,
    timeout,
    classNames,
    transitionIn,
  });
}
