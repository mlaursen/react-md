import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useMemo,
} from "react";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

import { RIPPLE_TIMEOUT, RIPPLE_CLASS_NAMES } from "./contants";
import { useTouchDetectionClassNameToggle } from "./hooks";

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

export interface IStatesConfigProps extends Partial<IStatesContext> {
  children?: ReactNode;
  disableTouchDetection?: boolean;
}

interface IStatesConfigDefaultProps extends IStatesContext {
  disableTouchDetection: boolean;
}

type StatesConfigWithDefaultProps = IStatesConfigProps &
  IStatesConfigDefaultProps;

/**
 * This component should normally be near the root of your React tree as it
 * allows for customization of the react-md states package.
 *
 * NOTE: There should *only be one* `StatesConfig` component on your page at
 * a time when the `disableTouchDetection` prop is not enabled as it will cause
 * multiple touch detection updates.
 */
export const StatesConfig: FunctionComponent<IStatesConfigProps> = props => {
  const {
    preventColorPollution,
    rippleTimeout,
    rippleClassNames,
    disableRipple,
    disableProgrammaticRipple,
    disableTouchDetection,
    children,
  } = props as StatesConfigWithDefaultProps;

  if (!disableTouchDetection) {
    useTouchDetectionClassNameToggle();
  }

  const value = useMemo(
    () => ({
      rippleTimeout,
      rippleClassNames,
      disableRipple,
      disableProgrammaticRipple,
      preventColorPollution,
    }),
    [
      rippleTimeout,
      rippleClassNames,
      disableRipple,
      disableProgrammaticRipple,
      preventColorPollution,
    ]
  );
  return (
    <StatesContext.Provider value={value}>{children}</StatesContext.Provider>
  );
};

const defaultProps: IStatesConfigDefaultProps = {
  preventColorPollution: false,
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
  disableTouchDetection: false,
};

StatesConfig.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    StatesConfig.propTypes = {
      preventColorPollution: PropTypes.bool,
      rippleTimeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      rippleClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
        }),
      ]),
      disableRipple: PropTypes.bool,
      disableProgrammaticRipple: PropTypes.bool,
      disableTouchDetection: PropTypes.bool,
    };
  }
}
