import React, { createContext, FunctionComponent } from "react";
import { RIPPLE_TIMEOUT, RIPPLE_CLASS_NAMES } from "./contants";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

export interface IRippleContext {
  timeout: TransitionTimeout;
  classNames: CSSTransitionClassNames;
  disableRipple: boolean;
  disableProgrammaticRipple: boolean;
}

export const RippleContext = createContext<IRippleContext>({
  timeout: RIPPLE_TIMEOUT,
  classNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
});

export const RippleConfig: FunctionComponent<Partial<IRippleContext>> = ({
  timeout = RIPPLE_TIMEOUT,
  classNames = RIPPLE_CLASS_NAMES,
  disableRipple = false,
  disableProgrammaticRipple = false,
  children,
}) => (
  <RippleContext.Provider
    value={{
      timeout,
      classNames,
      disableRipple,
      disableProgrammaticRipple,
    }}
  >
    {children}
  </RippleContext.Provider>
);
