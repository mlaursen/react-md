import { createContext } from "react";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";
import { RIPPLE_CLASS_NAMES, RIPPLE_TIMEOUT } from "./contants";

export interface StatesContextType {
  preventColorPollution: boolean;
  rippleTimeout: TransitionTimeout;
  rippleClassNames: CSSTransitionClassNames;
  disableRipple: boolean;
  disableProgrammaticRipple: boolean;
}

export const StatesContext = createContext<StatesContextType>({
  preventColorPollution: false,
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
});
