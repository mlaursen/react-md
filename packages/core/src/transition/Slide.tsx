import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type {
  CSSTransitionComponentProps,
  TransitionActions,
  TransitionTimeout,
} from "./types";
import {
  DEFAULT_SLIDE_TRANSITION_TIMEOUT,
  useSlideTransition,
} from "./useSlideTransition";

/** @remarks \@since 6.0.0 */
export interface SlideProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionComponentProps,
    TransitionActions {
  /**
   * Set this to `true` to animate this slide into view within a
   * `SlideContainer`. When this switches from `true` to `false`, it will
   * animate out.
   */
  active: boolean;

  /** @defaultValue {@link DEFAULT_SLIDE_TRANSITION_DURATION} */
  timeout?: TransitionTimeout;
  children: ReactNode;
}

/**
 * A reasonable default for handling a slide transition using
 * {@link useSlideTransition}.
 *
 * @see {@link SlideContainer} for example usage.
 * @remarks \@since 6.0.0
 */
export const Slide = forwardRef<HTMLDivElement, SlideProps>(function Slide(
  props,
  nodeRef
) {
  const {
    active,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    className,
    children,
    timeout = DEFAULT_SLIDE_TRANSITION_TIMEOUT,
    temporary = false,
    hidden,
    exitedHidden = true,
    ...remaining
  } = props;

  const { rendered, elementProps } = useSlideTransition({
    nodeRef,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    className,
    timeout,
    temporary,
    transitionIn: active,
    hidden,
    exitedHidden,
  });

  if (!rendered) {
    return null;
  }

  return (
    <div {...remaining} {...elementProps}>
      {children}
    </div>
  );
});
