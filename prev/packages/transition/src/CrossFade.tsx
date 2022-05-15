import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import cn from "classnames";

import type { CSSTransitionComponentImplementation } from "./types";
import type { CrossFadeTransitionHookOptions } from "./useCrossFadeTransition";
import { useCrossFadeTransition } from "./useCrossFadeTransition";

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 Updated for the new CSS Transition API
 */
export interface CrossFadeProps<E extends HTMLElement>
  extends CrossFadeTransitionHookOptions<E>,
    CSSTransitionComponentImplementation<E> {
  /**
   * Unlike the {@link useCrossFadeTransition}, the `appear` value is defaulted
   * to `true` so that the transition can occur when the `key` changes.
   *
   * @see {@link CrossFadeTransitionHookOptions.appear}
   * @defaultValue `true`
   */
  appear?: boolean;
}

/**
 * This is a component implementation of the {@link useCrossFadeTransition} hook
 * that implements the `temporary` behavior. Since this component uses the
 * `React.cloneElement` to inject the `ref` and `className` into the `children`,
 * it is recommended to use the hook instead.
 *
 * @example
 * Appear transitions with a React `key`
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { CrossFade } from "@react-md/transition";
 *
 * import Page1 from "./Page1";
 * import Page2 from "./Page2";
 * import Page3 from "./Page3";
 *
 * function Example(): ReactElement {
 *   const [page, setPage] = useState(0):
 *
 *   let content: ReactNode;
 *   switch (page) {
 *     case 0:
 *       content = <Page1 />
 *       break:
 *     case 1:
 *       content = <Page2 />
 *       break;
 *     case 2:
 *       content = <Page3 />
 *       break;
 *     default:
 *       content = null;
 *   }
 *
 *   return (
 *     <>
 *       <Button
 *         onClick={() => {
 *           setPage(prevPage => {
 *             const nextPage = prevPage + 1;
 *             if (nextPage > 2) {
 *               return 0;
 *             }
 *
 *             return nextPage;
 *           })
 *         }}
 *       >
 *         Change Page
 *       </Button>
 *       <CrossFade key={page}>
 *         <div>{content}</div>
 *       </CrossFade>
 *     </>
 *   );
 * }
 * ```
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 Updated for the new CSS Transition API and no longer
 * supports wrapping children in a `<div>`.
 */
export function CrossFade<E extends HTMLElement>({
  appear = true,
  transitionIn = appear,
  children,
  className,
  ...options
}: CrossFadeProps<E>): ReactElement | null {
  const child = Children.only(children);
  const { elementProps, rendered } = useCrossFadeTransition({
    ...options,
    appear,
    className: cn(child.props.className, className),
    transitionIn,
  });

  if (!rendered) {
    return null;
  }

  return cloneElement(children, elementProps);
}
