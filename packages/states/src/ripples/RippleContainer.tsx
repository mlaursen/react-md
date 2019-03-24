import React, { FunctionComponent } from "react";
import cn from "classnames";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

import Ripple from "./Ripple";
import { RipplesState, RippleState } from "./types.d";

export interface RippleContainerProps {
  ripples: RipplesState;
  entered: (ripple: RippleState) => void;
  exited: (ripple: RippleState) => void;
  className?: string;
  rippleClassName?: string;
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
}

const RippleContainer: FunctionComponent<RippleContainerProps> = ({
  ripples,
  className,
  rippleClassName,
  timeout,
  classNames,
  entered,
  exited,
}) => (
  <span className={cn("rmd-ripple-container", className)}>
    {ripples.map(ripple => (
      <Ripple
        key={ripple.startTime}
        ripple={ripple}
        className={rippleClassName}
        entered={entered}
        exited={exited}
        timeout={timeout}
        classNames={classNames}
      />
    ))}
  </span>
);

export default RippleContainer;
