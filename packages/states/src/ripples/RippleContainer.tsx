import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { TransitionGroup } from "react-transition-group";

import Ripple from "./Ripple";
import { IRipple } from "./types";

export interface IRippleContainerProps {
  ripples: IRipple[];
  setRipples: Dispatch<SetStateAction<IRipple[]>>;
}

function findByTimestamp(timestamp: number, ripples: IRipple[]) {
  return ripples.findIndex(r => r.timestamp === timestamp);
}

const RippleContainer: FunctionComponent<IRippleContainerProps> = ({
  setRipples,
  ripples,
}) => {
  return (
    <span className="rmd-ripple-container">
      {ripples.map(({ timestamp, exiting, style }) => (
        <Ripple
          key={timestamp}
          style={style}
          exiting={exiting}
          onEntered={() => {
            setRipples(ripples => {
              const i = findByTimestamp(timestamp, ripples);
              if (i === -1) {
                return ripples;
              }
              const nextRipples = ripples.slice();
              nextRipples[i] = { ...nextRipples[i], exiting: true };
              return nextRipples;
            });
          }}
          onExited={() => {
            setRipples(ripples => {
              const i = findByTimestamp(timestamp, ripples);
              if (i === -1) {
                return ripples;
              }
              const nextRipples = ripples.slice();
              nextRipples.splice(i, 1);
              return nextRipples;
            });
          }}
        />
      ))}
    </span>
  );
};

export default RippleContainer;
