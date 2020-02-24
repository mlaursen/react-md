/* eslint-disable react/prop-types */
import React, { FC, useCallback } from "react";
import { cnb } from "cnbuilder";
import CSSTransition, {
  CSSTransitionClassNames,
} from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";
import { useRefCache } from "@react-md/utils";

import { useStatesConfigContext } from "../StatesConfig";
import { RippleState } from "./types";

export interface RippleProps {
  className?: string;
  classNames?: CSSTransitionClassNames;
  timeout?: TransitionTimeout;
  entered: (ripple: RippleState) => void;
  exited: (ripple: RippleState) => void;
  ripple: RippleState;
}

const Ripple: FC<RippleProps> = props => {
  const {
    className,
    classNames: propClassNames,
    timeout: propTimeout,
    ripple,
    entered,
    exited,
  } = props;
  const { exiting, style } = ripple;

  let timeout = propTimeout;
  let classNames = propClassNames;
  const context = useStatesConfigContext();
  if (typeof timeout === "undefined" || typeof classNames === "undefined") {
    if (typeof timeout === "undefined") {
      timeout = context.rippleTimeout;
    }

    if (typeof classNames === "undefined") {
      classNames = context.rippleClassNames;
    }
  }

  const ref = useRefCache({ ripple, entered, exited });
  const onEntered = useCallback(() => {
    const { ripple, entered } = ref.current;
    entered(ripple);
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onExited = useCallback(() => {
    const { ripple, exited } = ref.current;
    exited(ripple);
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CSSTransition
      in={!exiting}
      appear
      classNames={classNames}
      timeout={timeout}
      onEntered={onEntered}
      onExited={onExited}
    >
      <span style={style} className={cnb("rmd-ripple", className)} />
    </CSSTransition>
  );
};

export default Ripple;
