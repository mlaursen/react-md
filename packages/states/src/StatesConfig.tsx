import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

import {
  DEFAULT_RIPPLE_CLASSNAMES,
  DEFAULT_RIPPLE_TIMEOUT,
} from "./ripples/constants";

/**
 * Contains all the values in the `StatesConfig` component.
 */
export interface StatesConfigContextType {
  /**
   * The amount of time before a ripple finishes its animation. You probably
   * don't want to change this value unless you updated the duration in scss or
   * changed the different class names for the ripple animation.
   */
  rippleTimeout: TransitionTimeout;

  /**
   * The class names to apply during the different stages for the ripple
   * animation.  You probably don't want to use this.
   */
  rippleClassNames: CSSTransitionClassNames;

  /**
   * Boolean if the ripple effect should be disabled for all child components
   * that use the Ripple states.
   */
  disableRipple: boolean;

  /**
   * Boolean if the ripple component should not be triggered after a
   * "programmatic" ripple effect. This would be if  the `.click()` function is
   * called on an element through javascript or some other means.
   */
  disableProgrammaticRipple: boolean;
}

export const StatesConfigContext = createContext<StatesConfigContextType>({
  rippleTimeout: DEFAULT_RIPPLE_TIMEOUT,
  rippleClassNames: DEFAULT_RIPPLE_CLASSNAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
});

/**
 * A simple hook that can be used to get the Ripple context. This is used behind
 * the scenes for the Ripple component and _probably_ shouldn't be used anywhere
 * else. It's mostly used to just use the context defaults when the timeout or
 * classNames are undefined.
 */
export function useStatesConfigContext(): StatesConfigContextType {
  return useContext(StatesConfigContext);
}

export interface StatesConfigProps extends Partial<StatesConfigContextType> {
  children?: ReactNode;
}

/**
 * The `StatesConfig` component is a top-level context provider for the states
 * context configuration. It'll keep track of:
 *
 * - the current interaction mode of your user
 * - configuration for ripple effects
 * - disabling or enabling the ripple effects
 * - disabling or enabling the fix for color pollution
 */
export function StatesConfig({
  rippleTimeout = DEFAULT_RIPPLE_TIMEOUT,
  rippleClassNames = DEFAULT_RIPPLE_CLASSNAMES,
  disableRipple = false,
  disableProgrammaticRipple = false,
  children,
}: StatesConfigProps): ReactElement {
  const value = useMemo(
    () => ({
      rippleTimeout,
      rippleClassNames,
      disableRipple,
      disableProgrammaticRipple,
    }),
    [rippleTimeout, rippleClassNames, disableRipple, disableProgrammaticRipple]
  );

  return (
    <StatesConfigContext.Provider value={value}>
      {children}
    </StatesConfigContext.Provider>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

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
  } catch (e) {}
}
