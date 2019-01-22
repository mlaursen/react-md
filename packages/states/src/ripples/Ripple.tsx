import React, { FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";

import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";
import cn from "classnames";

import { IRipple } from "./types.d";

export interface IRippleProps extends Pick<IRipple, "style" | "exiting"> {
  className?: string;
  classNames?: CSSTransitionClassNames;
  timeout?: TransitionTimeout;
  onEntered: () => void;
  onExited: () => void;
}

export interface IRippleDefaultProps {
  classNames: CSSTransitionClassNames;
  timeout: TransitionTimeout;
}

type RippleWithDefaultProps = IRippleProps & IRippleDefaultProps;

const Ripple: FunctionComponent<IRippleProps> = props => {
  const {
    style,
    className,
    classNames,
    timeout,
    exiting,
    onEntered,
    onExited,
  } = props as RippleWithDefaultProps;

  return (
    <CSSTransition
      in={!exiting}
      appear
      classNames={classNames}
      timeout={timeout}
      onEntered={onEntered}
      onExited={onExited}
    >
      <span style={style} className={cn("rmd-ripple", className)} />
    </CSSTransition>
  );
};

const defaultProps: IRippleDefaultProps = {
  classNames: {
    enter: "rmd-ripple--animating",
    enterActive: "rmd-ripple--scaling",
    enterDone: "rmd-ripple--animating rmd-ripple--scaling",
    exit: "rmd-ripple--animating rmd-ripple--scaling",
    exitActive: "rmd-ripple--fading",
  },
  timeout: {
    enter: 150,
    exit: 300,
  },
};

Ripple.defaultProps = defaultProps;

export default Ripple;
