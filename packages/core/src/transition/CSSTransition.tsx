"use client";

import { cnb } from "cnbuilder";
import { Children, type ReactElement, cloneElement } from "react";

import {
  type CSSTransitionComponentImplementation,
  type CSSTransitionHookOptions,
} from "./types.js";
import { useCSSTransition } from "./useCSSTransition.js";

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CSSTransitionProps<E extends HTMLElement>
  extends
    CSSTransitionHookOptions<E>,
    CSSTransitionComponentImplementation<E> {}

/**
 * **Client Component**
 *
 * This is a component implementation of the {@link useCSSTransition} hook that
 * implements the `temporary` behavior. Since this component uses the
 * `React.cloneElement` to inject the `ref` and `className` into the `children`,
 * it is recommended to use the hook instead.
 *
 * @example Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/core/button/Button":
 * import { CSSTransition } from "@react-md/core/transition/CSSTransition":
 *
 * // pretend global styles:
 * //
 * // .opacity--enter {
 * //   opacity: 0;
 * //   transition: opacity .3s;
 * // }
 * //
 * // .opacity--enter-active {
 * //   opacity: 1;
 * // }
 * //
 * // .opacity--exit {
 * //   opacity: 1;
 * // }
 * //
 * // .opacity--exit-active {
 * //   opacity: 0;
 * //   transition: opacity .3s;
 * // }
 *
 * function Example(): ReactElement {
 *   const [transitionIn, setTransitionIn] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       <CSSTransition
 *         timeout={300}
 *         className="opacity"
 *         temporary
 *         transitionIn={transitionIn}
 *       >
 *         <div>
 *           This is some content that will animate!
 *         </div>
 *       </CSSTransition>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/css-transition | CSSTransition Demos}
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export function CSSTransition<E extends HTMLElement>(
  props: CSSTransitionProps<E>
): ReactElement | null {
  const { children, className, ...options } = props;
  const child = Children.only(children);
  const { elementProps, rendered } = useCSSTransition({
    ...options,
    className: cnb(child.props.className, className),
  });

  return <>{rendered && cloneElement(children, elementProps)}</>;
}
