import React, { FunctionComponent } from "react";
import cn from "classnames";

import Ripple from "./Ripple";
import { triggerRippleExitAnimation, removeRippleByStartTime } from "./utils";
import { IRipple, RippleSetter } from "./types";

export interface IRippleContainerProps {
  ripples: IRipple[];
  setRipples: RippleSetter;
  className?: string;
  rippleClassName?: string;
}

const RippleContainer: FunctionComponent<IRippleContainerProps> = ({
  ripples,
  setRipples,
  className,
  rippleClassName,
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
      />
    ))}
  </span>
);

export default RippleContainer;
