import React, { FunctionComponent, ReactNode, useMemo } from "react";
import { Omit } from "@react-md/utils";

import { RIPPLE_CLASS_NAMES, RIPPLE_TIMEOUT } from "./contants";
import { StatesContext, StatesContextType } from "./context";
import { useModeClassName, useModeDetection } from "./useModeDetection";

export interface StatesConfigProps extends Partial<StatesContextType> {
  children?: ReactNode;
}

type DefaultProps = Omit<StatesContextType, "mode">;
type WithDefaultProps = StatesConfigProps & DefaultProps;

/**
 * The `StatesConfig` component is a top-level context provider for the states
 * context configuration. It'll keep track of:
 * - the current interaction mode of your user
 * - configuration for ripple effects
 * - disabling or enabling the ripple effects
 * - disabling or enabling the fix for color pollution
 */
const StatesConfig: FunctionComponent<StatesConfigProps> = props => {
  const {
    rippleTimeout,
    rippleClassNames,
    disableRipple,
    disableProgrammaticRipple,
    children,
  } = props as WithDefaultProps;

  const mode = useModeDetection();
  useModeClassName(mode);

  const value = useMemo(
    () => ({
      mode,
      rippleTimeout,
      rippleClassNames,
      disableRipple,
      disableProgrammaticRipple,
    }),
    [rippleTimeout, rippleClassNames, disableRipple, disableProgrammaticRipple]
  );

  return (
    <StatesContext.Provider value={value}>{children}</StatesContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
};

StatesConfig.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    StatesConfig.propTypes = {
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
      children: PropTypes.node.isRequired,
    };
  }
}

export default StatesConfig;
