import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type {
  TransitionActions,
  TransitionCallbacks,
  TransitionTimeout,
} from "./types";
import { useSlideTransition } from "./useSlideTransition";

/** @remarks \@since 6.0.0 */
export interface SlideProps
  extends HTMLAttributes<HTMLDivElement>,
    TransitionActions,
    TransitionCallbacks {
  /**
   * Set this to `true` to animate this slide into view within a
   * `SlideContainer`. When this switches from `true` to `false`, it will
   * animate out.
   */
  active: boolean;

  /**
   * Set this to `true` if the slide should not unmount when {@link active} is
   * `false`. This is useful if the slide has state that should not be reset
   * while not active or contains images/videos that should not reload.
   *
   * @defaultValue `false`
   */
  persistant?: boolean;

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
    timeout,
    persistant = false,
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
    temporary: !persistant,
    transitionIn: active,
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
