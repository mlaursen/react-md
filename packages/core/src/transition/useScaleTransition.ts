"use client";

import type {
  CSSTransitionClassNames,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionOptions,
  TransitionTimeout,
} from "./types.js";
import { useCSSTransition } from "./useCSSTransition.js";

/**
 * The default {@link TransitionTimeout} to use for horizontal and vertical
 * scale transitions.
 *
 * @since 2.0.0
 * @since 6.0.0 Renamed from `SCALE_TIMEOUT` to `DEFAULT_SCALE_TIMEOUT`.
 */
export const DEFAULT_SCALE_TIMEOUT = {
  enter: 200,
  exit: 150,
} as const satisfies TransitionTimeout;

/**
 * The default {@link CSSTransitionClassNames} for a horizontal scale
 * transition.
 *
 * @since 2.0.0
 * @since 6.0.0 The class names were updated to be prefixed with
 * `rmd-scale-transition` and renamed from `SCALE_CLASSNAMES` to
 * `DEFAULT_SCALE_CLASSNAMES`.
 */
export const DEFAULT_SCALE_CLASSNAMES = {
  appear: "rmd-scale-transition--enter",
  appearActive: "rmd-scale-transition--enter-active",
  enter: "rmd-scale-transition--enter",
  enterActive: "rmd-scale-transition--enter-active",
  enterDone: "",
  exit: "rmd-scale-transition--exit",
  exitActive: "rmd-scale-transition--exit-active",
} as const satisfies CSSTransitionClassNames;

/**
 * The default {@link CSSTransitionClassNames} for a vertical scale transition.
 *
 * @since 2.0.0
 * @since 6.0.0 The class names were updated to be prefixed with
 * `rmd-scale-y-transition` and merged with the {@link DEFAULT_SCALE_CLASSNAMES}.
 * It was also renamed from `SCALE_Y_CLASSNAMES` to
 * `DEFAULT_SCALE_Y_CLASSNAMES`.
 */
export const DEFAULT_SCALE_Y_CLASSNAMES = {
  appear: "rmd-scale-transition--enter rmd-scale-transition--y-enter",
  appearActive:
    "rmd-scale-transition--enter-active rmd-scale-transition--y-enter-active",
  enter: "rmd-scale-transition--enter rmd-scale-transition--y-enter",
  enterActive:
    "rmd-scale-transition--enter-active rmd-scale-transition--y-enter-active",
  enterDone: "",
  exit: "rmd-scale-transition--exit rmd-scale-transition--y-exit",
  exitActive:
    "rmd-scale-transition--exit-active rmd-scale-transition--y-exit-active",
} as const satisfies CSSTransitionClassNames;

/**
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface ScaleTransitionHookOptions<E extends HTMLElement>
  extends PreconfiguredCSSTransitionOptions<E> {
  /**
   * Boolean if the scale transition should be vertical instead of horizontal.
   * This really only changes the default value for the {@link classNames}.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;

  /**
   * @see {@link PreconfiguredCSSTransitionOptions.temporary}
   * @defaultValue `true`
   */
  temporary?: boolean;

  /**
   * @see {@link vertical}
   * @see {@link DEFAULT_SCALE_CLASSNAMES}
   * @see {@link DEFAULT_SCALE_Y_CLASSNAMES}
   * @defaultValue `vertical ? SCALE_Y_CLASSNAMES : SCALE_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * Implements a scale transition that should generally be used for temporary
 * elements that are positioned via `position: absolute` or `position: fixed`.
 *
 * @example Dropdown Menu Example
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { useFixedPositioning } from "@react-md/core/positioning/useFixedPositioning";
 * import { useScaleTransition } from "@react-md/core/transition/useScaleTransition";
 * import { type ReactElement, useRef, useState } from "react";
 *
 * function Example(): ReactElement {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *   const [transitionIn, setTransitionIn] = useState(false);
 *   const { style, transitionOptions } = useFixedPositioning({
 *     fixedTo: buttonRef,
 *   });
 *   const { elementProps, rendered } = useScaleTransition({
 *     ...transitionOptions,
 *     transitionIn,
 *     vertical: true,
 *   });
 *
 *   return (
 *     <>
 *       <Button ref={buttonRef} onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       {rendered && (
 *         <div {...elementProps} style={style}>
 *           Some content within a menu
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/hooks/use-scale-transition | useScaleTransition Demos}
 * @see {@link https://react-md.dev/components/scale | Scale Demos}
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @since 4.0.0
 */
export function useScaleTransition<E extends HTMLElement>(
  options: ScaleTransitionHookOptions<E>
): CSSTransitionHookReturnValue<E> {
  const {
    timeout = DEFAULT_SCALE_TIMEOUT,
    vertical = false,
    temporary = true,
    exitedHidden = true,
    classNames = vertical
      ? DEFAULT_SCALE_Y_CLASSNAMES
      : DEFAULT_SCALE_CLASSNAMES,
    ...transitionOptions
  } = options;

  return useCSSTransition({
    ...transitionOptions,
    timeout,
    temporary,
    exitedHidden,
    classNames,
  });
}
