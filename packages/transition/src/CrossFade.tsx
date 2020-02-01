import React, { ReactElement } from "react";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";

import { TransitionTimeout } from "./types";

export type CrossFadeProps = Partial<CSSTransitionProps>;

const DEFAULT_CROSS_FADE_TIMEOUT: TransitionTimeout = {
  enter: 300,
  exit: 0,
};

const DEFAULT_CROSS_FADE_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-cross-fade",
  appearActive: "rmd-cross-fade--active",
  enter: "rmd-cross-fade",
  enterActive: "rmd-cross-fade--active",
};

/**
 * This is a very simpel wrapper for the CSSTransition component from
 * `react-transition-group` this is used to do a cross fade animation.
 *
 * By default, this animation will occur immediately when the component
 * mounts, but you can set the `in` prop manually to dynamically trigger
 * the animation instead.
 */
function CrossFade({
  in: propIn = true,
  appear = true,
  timeout = DEFAULT_CROSS_FADE_TIMEOUT,
  classNames = DEFAULT_CROSS_FADE_CLASSNAMES,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...props
}: CrossFadeProps): ReactElement {
  return (
    <CSSTransition
      {...props}
      in={propIn}
      appear={appear}
      timeout={timeout}
      classNames={classNames}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </CSSTransition>
  );
}

export default CrossFade;
