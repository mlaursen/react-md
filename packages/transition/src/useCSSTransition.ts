import { Dispatch } from "react";
import cn from "classnames";

import {
  ENTER,
  ENTERED,
  ENTERING,
  EXIT,
  EXITED,
  EXITING,
  TransitionAction,
  TransitionStage,
} from "./constants";
import { getClassNames } from "./getClassNames";
import { getTimeout } from "./getTimeout";
import { CSSTransitionOptions, CSSTransitionProvidedProps } from "./types";
import { useTransition } from "./useTransition";

type Rendered = boolean;

export type CSSTransitionReturnValue<E extends HTMLElement> = [
  Rendered,
  CSSTransitionProvidedProps<E>,
  Dispatch<TransitionAction>,
  TransitionStage
];

/**
 * This hook is heavily inspired by the `CSSTransition` component from
 * `react-transition-group` since it's really just a hook version for it.
 *
 * This hook allows you to transition class names for an element for enter and
 * exit transitions.
 *
 * There are two different ways to create an "appear-only"/"on-mount-only"
 * transition: use the `onEntered` callback to reset the `transitionIn` to
 * false, or manually fire the `ENTERED` action with the returned `dispatch`
 * function when it should be fired again.
 *
 * Example changing `transitionIn` for pathname changes:
 * ```ts
 * const [transitionIn, setTransitionIn] = useState(true);
 * const [rendered, transitionProps] = useCSSTransition({
 *   appear: true,
 *   timeout: { enter: 200 },
 *   transitionIn,
 *   onEntered: () => setTransitionIn(false),
 * });
 *
 * const prevPathname = useRef(pathname);
 * if (pathname !== prevPathname.current) {
 *   prevPathname.current = pathname;
 *   setTransitionIn(true)
 * }
 *
 * return (
 *   <div {...transitionProps}>
 *     <Switch>
 *       <Route path="/" component={Home} />
 *       <Route path="/other" component={Other} />
 *    </Switch>
 *   </div>
 * );
 * ```
 *
 * Example with `dispatch` for pathname changes:
 * ```ts
 * const [rendered, transitionProps, dispatch] = useCSSTransition({
 *   appear: true,
 *   timeout: { enter: 200 },
 *   transitionIn: true,
 * });
 *
 * const prevPathname = useRef(pathname);
 * if (pathname !== prevPathname.current) {
 *   prevPathname.current = pathname;
 *   dispatch(ENTERED);
 * }
 *
 * return (
 *   <div {...transitionProps}>
 *     <Switch>
 *       <Route path="/" component={Home} />
 *       <Route path="/other" component={Other} />
 *    </Switch>
 *   </div>
 * );
 * ```
 *
 * @see useCrossFade The `useCrossFade` is a good example of using this hook for
 * a custom CSS Transition.
 * @param options - The transition options
 * @returns An ordered list of a boolean if the component should be rendered,
 * transition props to provide to the transitioning element, a dispatch function
 * for triggering the transition manually (should not be used much), and the
 * current transition stage.
 */
export function useCSSTransition<E extends HTMLElement = HTMLDivElement>({
  appear = false,
  temporary = false,
  timeout,
  transitionIn,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  className,
  classNames: propClassNames,
  ref: propRef,
}: CSSTransitionOptions<E>): CSSTransitionReturnValue<E> {
  const { rendered, stage, ref, appearing, dispatch } = useTransition<E>({
    ref: propRef,
    appear,
    repaint: true,
    timeout,
    temporary,
    transitionIn,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  });

  const classNames = getClassNames(propClassNames, getTimeout(timeout, appear));

  const isEntering = stage === ENTERING;
  const isEnter = isEntering || stage === ENTER;
  const isEntered = stage === ENTERED;
  const isExiting = stage === EXITING;
  const isExit = isExiting || stage === EXIT;
  const isExited = stage === EXITED;

  return [
    rendered,
    {
      ref,
      className:
        cn(
          className,
          // Note: can't use the object syntax for classNames since it'll fail
          // if the same classes are used for different phases since they'd have
          // the same key in the object...
          appearing && classNames.appear,
          appearing && isEntering && classNames.appearActive,
          appearing && isEntered && classNames.appearDone,
          !appearing && isEnter && classNames.enter,
          !appearing && isEntering && classNames.enterActive,
          !appearing && isEntered && classNames.enterDone,
          isExit && classNames.exit,
          isExiting && classNames.exitActive,
          isExited && classNames.exitDone
        ) || undefined,
    },
    dispatch,
    stage,
  ];
}
