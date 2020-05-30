import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const DEFAULT_TOOLTIP_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-tooltip--enter",
  appearActive: "rmd-tooltip--visible",
  enter: "rmd-tooltip--enter",
  enterActive: "rmd-tooltip--visible",
  enterDone: "rmd-tooltip--visible",
  exit: "rmd-tooltip--visible rmd-tooltip--exit",
  exitActive: "rmd-tooltip--exit-active",
};

export const DEFAULT_TOOLTIP_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_TOOLTIP_DELAY = 1000;
export const DEFAULT_TOOLTIP_THRESHOLD = 0.75;
