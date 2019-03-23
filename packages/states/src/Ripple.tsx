import React, { FunctionComponent } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";

import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

import { RippleConfig } from "./types.d";
import useStatesContext from "./useStatesContext";

export interface RippleProps extends Pick<RippleConfig, "style" | "exiting"> {
  className?: string;
  classNames?: CSSTransitionClassNames;
  timeout?: TransitionTimeout;
  onEntered: () => void;
  onExited: () => void;
}

const Ripple: FunctionComponent<RippleProps> = props => {
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
    const context = useStatesContext();

    if (typeof timeout === "undefined") {
      timeout = context.rippleTimeout;
    }

    if (typeof classNames === "undefined") {
      classNames = context.rippleClassNames;
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
