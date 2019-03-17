import React, { FunctionComponent, ReactNode, useMemo } from "react";
import { StatesContextType, StatesContext } from "./context";
import { useTouchDetectionClassNameToggle } from "./hooks";
import { RIPPLE_TIMEOUT, RIPPLE_CLASS_NAMES } from "./contants";

export interface StatesConfigProps extends Partial<StatesContextType> {
  children?: ReactNode;
  disableTouchDetection?: boolean;
}

interface DefaultProps extends StatesContextType {
  disableTouchDetection: boolean;
}

type WithDefaultProps = StatesConfigProps & DefaultProps;

/**
 * This component should normally be near the root of your React tree as it
 * allows for customization of the react-md states package.
 *
 * NOTE: There should *only be one* `StatesConfig` component on your page at
 * a time when the `disableTouchDetection` prop is not enabled as it will cause
 * multiple touch detection updates.
 */
const StatesConfig: FunctionComponent<StatesConfigProps> = props => {
  const {
    preventColorPollution,
    rippleTimeout,
    rippleClassNames,
    disableRipple,
    disableProgrammaticRipple,
    disableTouchDetection,
    children,
  } = props as WithDefaultProps;

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

const defaultProps: DefaultProps = {
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

export default StatesConfig;
