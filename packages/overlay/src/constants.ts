import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const DEFAULT_OVERLAY_TIMEOUT: TransitionTimeout = 150;
export const DEFAULT_OVERLAY_CLASSNAMES: CSSTransitionClassNames = {
  appearActive: "rmd-overlay--active",
  enterActive: "rmd-overlay--active",
  enterDone: "rmd-overlay--active",
};
