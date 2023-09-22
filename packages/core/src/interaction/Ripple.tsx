"use client";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import {
  type CSSTransitionClassNames,
  type TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { type RippleState, type RippleTransitionCallbacks } from "./types.js";

/** @internal */
export const DEFAULT_RIPPLE_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  enter: "rmd-ripple--animating",
  enterActive: "rmd-ripple--scaling",
  enterDone: "rmd-ripple--animating rmd-ripple--scaling",
  exit: "rmd-ripple--animating rmd-ripple--scaling",
  exitActive: "rmd-ripple--fading",
};

/** @internal */
export const DEFAULT_RIPPLE_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 150,
  exit: 300,
};

/** @internal */
export interface RippleProps extends RippleTransitionCallbacks {
  className?: string;
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
  ripple: RippleState;
}

/**
 * **Client Component**
 *
 * This component should only be used by the `RippleContainer` component.
 *
 * @internal
 */
export function Ripple(props: RippleProps): ReactElement {
  const {
    className,
    timeout = DEFAULT_RIPPLE_TIMEOUT,
    classNames = DEFAULT_RIPPLE_CLASSNAMES,
    ripple,
    onEntered,
    onExited,
  } = props;
  const { style, exiting } = ripple;
  const { elementProps, rendered } = useCSSTransition({
    appear: true,
    className: cnb("rmd-ripple", className),
    transitionIn: !exiting,
    timeout,
    classNames,
    onEntered() {
      onEntered(ripple);
    },
    onExited() {
      onExited(ripple);
    },
  });

  return <>{rendered && <span style={style} {...elementProps} />}</>;
}
