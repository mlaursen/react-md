import React, { FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";
import { bem } from "@react-md/theme";

export interface CrossFadeProps
  extends Partial<CSSTransition.CSSTransitionProps> {}

type DefaultProps = Required<
  Pick<
    CrossFadeProps,
    | "timeout"
    | "classNames"
    | "appear"
    | "mountOnEnter"
    | "unmountOnExit"
    | "in"
  >
>;
type WithDefaultProps = CrossFadeProps & DefaultProps;

const block = bem("rmd-cross-fade");

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
  timeout: { enter: 300, exit: 0 },
  classNames: {
    appear: block(),
    appearActive: block({ active: true }),
    enter: block(),
    enterActive: block({ active: true }),
    enterDone: "",
  },
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
};

CrossFade.defaultProps = defaultProps;

export default CrossFade;
