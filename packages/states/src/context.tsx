import React, { createContext, FunctionComponent, ReactNode } from "react";
import { RIPPLE_TIMEOUT, RIPPLE_CLASS_NAMES } from "./contants";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

export interface IStatesContext {
  preventColorPollution: boolean;
  rippleTimeout: TransitionTimeout;
  rippleClassNames: CSSTransitionClassNames;
  disableRipple: boolean;
  disableProgrammaticRipple: boolean;
}

export const StatesContext = createContext<IStatesContext>({
  preventColorPollution: false,
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
});

export const StatesConfig: FunctionComponent<
  Partial<IStatesContext>
> = props => {
  const {
    preventColorPollution,
    rippleTimeout,
    rippleClassNames,
    disableRipple,
    disableProgrammaticRipple,
    children,
  } = props as IStatesContext & { children?: ReactNode };

  return (
    <StatesContext.Provider
      value={{
        rippleTimeout,
        rippleClassNames,
        disableRipple,
        disableProgrammaticRipple,
        preventColorPollution,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

const defaultProps: IStatesContext = {
  preventColorPollution: false,
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
};

StatesConfig.defaultProps = defaultProps;
