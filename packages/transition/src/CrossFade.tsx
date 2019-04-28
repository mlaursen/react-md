import React, { FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";

export interface CrossFadeProps
  extends Partial<CSSTransition.CSSTransitionProps> {}

type DefaultProps = Required<
  Pick<
    CrossFadeProps,
    | "in"
    | "appear"
    | "timeout"
    | "classNames"
    | "mountOnEnter"
    | "unmountOnExit"
  >
>;
type WithDefaultProps = CrossFadeProps & DefaultProps;

/**
 * This is a very simpel wrapper for the CSSTransition component from
 * `react-transition-group` this is used to do a cross fade animation.
 *
 * By default, this animation will occur immediately when the component
 * mounts, but you can set the `in` prop manually to dynamically trigger
 * the animation instead.
 */
const CrossFade: FunctionComponent<CrossFadeProps> = providedProps => {
  const { children, ...props } = providedProps as WithDefaultProps;
  return <CSSTransition {...props}>{children}</CSSTransition>;
};

const defaultProps: DefaultProps = {
  in: true,
  appear: true,
  timeout: { enter: 300, exit: 0 },
  classNames: {
    appear: "rmd-cross-fade",
    appearActive: "rmd-cross-fade--active",
    enter: "rmd-cross-fade",
    enterActive: "rmd-cross-fade--active",
  },
  mountOnEnter: true,
  unmountOnExit: true,
};

CrossFade.defaultProps = defaultProps;

export default CrossFade;
