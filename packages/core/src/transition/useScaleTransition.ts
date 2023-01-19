import type {
  CSSTransitionClassNames,
  CSSTransitionClassNamesObject,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionOptions,
  TransitionTimeoutObject,
} from "./types";
import { useCSSTransition } from "./useCSSTransition";

/**
 * The default {@link CSSTransitionClassNames} for a horizontal scale
 * transition.
 *
 * @remarks
 * \@since 2.0.0
 * \@since 6.0.0 The class names were updated to be prefixed with
 * `rmd-scale-transition`
 */
export const SCALE_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> = {
  appear: "rmd-scale-transition--enter",
  appearActive: "rmd-scale-transition--enter-active",
  enter: "rmd-scale-transition--enter",
  enterActive: "rmd-scale-transition--enter-active",
  enterDone: "",
  exit: "rmd-scale-transition--exit",
  exitActive: "rmd-scale-transition--exit-active",
};

/**
 * The default {@link CSSTransitionClassNames} for a vertical scale transition.
 *
 * @remarks
 * \@since 2.0.0
 * \@since 6.0.0 The class names were updated to be prefixed with
 * `rmd-scale-y-transition` and merged with the {@link SCALE_CLASSNAMES}
 */
export const SCALE_Y_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> = {
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
};

/**
 * The default {@link TransitionTimeout} to use for horizontal and vertical
 * scale transitions.
 *
 * @remarks \@since 2.0.0
 */
export const SCALE_TIMEOUT: Readonly<TransitionTimeoutObject> = {
  enter: 200,
  exit: 150,
};

/**
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @remarks \@since 4.0.0
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
   * @see {@link SCALE_CLASSNAMES}
   * @see {@link SCALE_Y_CLASSNAMES}
   * @defaultValue `vertical ? SCALE_Y_CLASSNAMES : SCALE_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * Implements a scale transition that should generally be used for temporary
 * elements that are positioned via `position: absolute` or `position: fixed`.
 *
 * @example
 * Dropdown Menu Example
 * ```tsx
 * import { ReactElement, useRef, useState } from "react";
 * import { Button, useFixedPositioning, useScaleTransition } from "@react-md/core";
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
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export function useScaleTransition<E extends HTMLElement>(
  options: ScaleTransitionHookOptions<E>
): CSSTransitionHookReturnValue<E> {
  const {
    timeout = SCALE_TIMEOUT,
    vertical = false,
    temporary = true,
    classNames = vertical ? SCALE_Y_CLASSNAMES : SCALE_CLASSNAMES,
    ...transitionOptions
  } = options;

  return useCSSTransition({
    ...transitionOptions,
    timeout,
    temporary,
    classNames,
  });
}
