import { CROSS_FADE_CLASSNAMES, CROSS_FADE_TIMEOUT } from "./constants";
import { CSSTransitionOptions } from "./types";
import { CSSTransitionReturnValue, useCSSTransition } from "./useCSSTransition";

export interface CrossFadeOptions<E extends HTMLElement>
  extends Omit<
    CSSTransitionOptions<E>,
    "timeout" | "classNames" | "transitionIn"
  > {
  transitionIn?: CSSTransitionOptions<E>["transitionIn"];
}

/**
 * This is a simple wrapper for the `useCSSTransition` that will allow you to
 * trigger cross fade transitions. The default behavior for this hook triggers
 * the transition immediately once mounted. This is great if it is being used
 * for new data appearing in a list, but not super great for route transitions.
 *
 * If you want to create a route transition, it's recommended to set the
 * `appear` option to `false` and then manually fire the `ENTER` transition from
 * the `dispatch` function. Here's a quick example using the `Layout` component
 * from `@react-md/layout` and `react-router`.
 *
 * ```tsx
 * import { useLocation, BrowserRouter } from "react-router-dom";
 * import { useCrossFade, ENTER } from "@react-md/transition";
 *
 * const App = () => {
 *   const { pathname } = useLocation();
 *   const [, { ref, className }, dispatch] = useCrossFade({
 *     appear: false,
 *   });
 *
 *   const prevPathname = useRef(pathname);
 *   if (pathname !== prevPathname.current) {
 *     prevPathname.current = pathname;
 *     dispatch(ENTER);
 *   }
 *
 *   return (
 *     <Layout
 *       {...useLayoutNavigation(navItems, pathname)}
 *       appBarTitle="My App"
 *       mainRef={ref}
 *       mainClassName={className}
 *     >
 *       {children}
 *     </Layout>
 *   );
 * }
 * ```
 *
 * @param options - Any additional options and configuration that should be used
 * for the transition.
 * @returns An ordered list of a boolean if the component should be rendered,
 * transition props to provide to the transitioning element, a dispatch function
 * for triggering the transition manually (should not be used much), and the
 * current transition stage.
 */
export function useCrossFade<E extends HTMLElement = HTMLDivElement>({
  appear = false,
  temporary = false,
  transitionIn = true,
  className,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
}: CrossFadeOptions<E> = {}): CSSTransitionReturnValue<E> {
  return useCSSTransition({
    appear,
    timeout: CROSS_FADE_TIMEOUT,
    classNames: CROSS_FADE_CLASSNAMES,
    transitionIn,
    className,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    temporary,
  });
}
