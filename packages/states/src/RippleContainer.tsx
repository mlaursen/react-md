import React, { FunctionComponent } from "react";
import cn from "classnames";

import {
  TransitionTimeout,
  CSSTransitionClassNames,
} from "@react-md/transition";

import Ripple from "./Ripple";
import { triggerRippleExitAnimation, removeRippleByStartTime } from "./utils";
import { RippleConfig, RippleSetter } from "./types.d";

export interface RippleContainerProps {
  ripples: RippleConfig[];
  setRipples: RippleSetter;
  className?: string;
  rippleClassName?: string;
  timeout?: TransitionTimeout;
  classNames?: CSSTransitionClassNames;
}

const RippleContainer: FunctionComponent<RippleContainerProps> = ({
  ripples,
  setRipples,
  className,
  rippleClassName,
  timeout,
  classNames,
}) => (
  <span className={cn("rmd-ripple-container", className)}>
    {ripples.map(({ startTime, exiting, style }) => (
      <Ripple
        key={startTime}
        style={style}
        exiting={exiting}
        className={rippleClassName}
        onEntered={() =>
          triggerRippleExitAnimation(startTime, ripples, setRipples)
        }
        onExited={() => removeRippleByStartTime(startTime, ripples, setRipples)}
        timeout={timeout}
        classNames={classNames}
      />
    ))}
  </span>
);

export default RippleContainer;
