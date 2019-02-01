import React, { FunctionComponent } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";

import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

import { IRipple } from "./types.d";
import { useRippleContext } from "./hooks";

export interface IRippleProps extends Pick<IRipple, "style" | "exiting"> {
  className?: string;
  classNames?: CSSTransitionClassNames;
  timeout?: TransitionTimeout;
  onEntered: () => void;
  onExited: () => void;
}

const Ripple: FunctionComponent<IRippleProps> = props => {
  const {
    style,
    className,
    classNames: propClassNames,
    timeout: propTimeout,
    exiting,
    onEntered,
    onExited,
  } = props;

  let timeout = propTimeout;
  let classNames = propClassNames;
  if (typeof timeout === "undefined" || typeof classNames === "undefined") {
    const context = useRippleContext();

    if (typeof timeout === "undefined") {
      timeout = context.timeout;
    }

    if (typeof classNames === "undefined") {
      classNames = context.classNames;
    }
  }

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

export default Ripple;
