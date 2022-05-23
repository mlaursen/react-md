import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import { cnb } from "cnbuilder";

import type {
  CSSTransitionComponentImplementation,
  CSSTransitionHookOptions,
} from "./types";
import { useCSSTransition } from "./useCSSTransition";

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export interface CSSTransitionProps<E extends HTMLElement>
  extends CSSTransitionHookOptions<E>,
    CSSTransitionComponentImplementation<E> {}

/**
 * This is a component implementation of the {@link useCSSTransition} hook that
 * implements the `temporary` behavior. Since this component uses the
 * `React.cloneElement` to inject the `ref` and `className` into the `children`,
 * it is recommended to use the hook instead.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/button":
 * import { CSSTransition } from "@react-md/transition";
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
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
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
