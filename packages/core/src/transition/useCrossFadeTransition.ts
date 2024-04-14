"use client";
import type {
  CSSTransitionClassNames,
  CSSTransitionClassNamesObject,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionInDefaultedOptions,
  TransitionTimeout,
  TransitionTimeoutObject,
} from "./types.js";
import { useCSSTransition } from "./useCSSTransition.js";

/**
 * The default cross fade transition classes to use.
 *
 * @since 2.0.0
 */
export const CROSS_FADE_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> = {
  appear: "rmd-cross-fade",
  appearActive: "rmd-cross-fade--active",
  enter: "rmd-cross-fade",
  enterActive: "rmd-cross-fade--active",
};

/**
 * The default cross fade transition timeout.
 *
 * @since 2.0.0
 */
export const CROSS_FADE_TIMEOUT: Readonly<TransitionTimeoutObject> = {
  appear: 300,
  enter: 300,
  exit: 0,
};

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface CrossFadeTransitionHookOptions<E extends HTMLElement>
  extends PreconfiguredCSSTransitionInDefaultedOptions<E> {
  /**
   * @see {@link TransitionTimeout}
   * @see {@link CROSS_FADE_TIMEOUT}
   * @defaultValue `CROSS_FADE_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   * @see {@link CSSTransitionClassNames}
   * @see {@link CROSS_FADE_CLASSNAMES}
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
 * @example
 * New Page Transition with the Layout component
 * ```tsx
 * import { ReactElement, ReactNode, useLayoutEffect } from "react";
 * import { useLocation } from "react-router-dom":
 * import { Layout, useCrossFadeTransition, useLayoutNavigation } from "@react-md/core";
 *
 * import { navItems } from "./navItems";
 *
 * interface ExampleProps {
 *   children: ReactNode;
 * }
 *
 * function Example({ children }: ExampleProps): ReactElement {
 *   const { pathname } = useLocation();
 *   const { elementProps, transitionTo } = useCrossFadeTransition();
 *
 *   const prevPathname = useRef(pathname);
 *   useLayoutEffect(() => {
 *     if (prevPathname.current === pathname) {
 *       return
 *     }
 *
 *     prevPathname.current = pathname;
 *     transitionTo('enter');
 *   }, [pathname, transitionTo])
 *
 *   return (
 *     <Layout
 *       {...useLayoutNavigation(navItems, pathname)}
 *       appBarTitle="My App"
 *       mainProps={elementProps}
 *     >
 *       {children}
 *     </Layout>
 *   );
 * }
 * ```
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export function useCrossFadeTransition<E extends HTMLElement>(
  options: CrossFadeTransitionHookOptions<E> = {}
): CSSTransitionHookReturnValue<E> {
  const {
    transitionIn = true,
    timeout = CROSS_FADE_TIMEOUT,
    classNames = CROSS_FADE_CLASSNAMES,
    ...cssOptions
  } = options;

  return useCSSTransition({
    ...cssOptions,
    timeout,
    classNames,
    transitionIn,
  });
}
