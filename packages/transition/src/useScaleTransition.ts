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
 * @remarks \@since 2.0.0
 */
export const SCALE_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> = {
  appear: "rmd-transition--scale-enter",
  appearActive: "rmd-transition--scale-enter-active",
  enter: "rmd-transition--scale-enter",
  enterActive: "rmd-transition--scale-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-exit",
  exitActive: "rmd-transition--scale-exit-active",
};

/**
 * The default {@link CSSTransitionClassNames} for a vertical scale transition.
 *
 * @remarks \@since 2.0.0
 */
export const SCALE_Y_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> = {
  appear: "rmd-transition--scale-y-enter",
  appearActive: "rmd-transition--scale-y-enter-active",
  enter: "rmd-transition--scale-y-enter",
  enterActive: "rmd-transition--scale-y-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-y-exit",
  exitActive: "rmd-transition--scale-y-exit-active",
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
 * import { Button } from "@react-md/button";
 * import { useFixedPositioning, useScaleTransition } from "@react-md/transition";
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
export function useScaleTransition<E extends HTMLElement>({
  timeout = SCALE_TIMEOUT,
  vertical = false,
  temporary = true,
  classNames = vertical ? SCALE_Y_CLASSNAMES : SCALE_CLASSNAMES,
  ...options
}: ScaleTransitionHookOptions<E>): CSSTransitionHookReturnValue<E> {
  return useCSSTransition({
    ...options,
    timeout,
    temporary,
    classNames,
  });
}
