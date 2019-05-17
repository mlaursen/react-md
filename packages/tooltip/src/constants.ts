import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

export const TOOLTIP_CLASS_NAMES: CSSTransitionClassNames = {
  appear: "rmd-tooltip--enter",
  appearActive: "rmd-tooltip--visible",
  enter: "rmd-tooltip--enter",
  enterActive: "rmd-tooltip--visible",
  enterDone: "rmd-tooltip--visible",
  exit: "rmd-tooltip--visible rmd-tooltip--exit",
  exitActive: "rmd-tooltip--exit-active",
};

export const TOOLTIP_TRANSITION_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_DELAY = 1000;
export const DEFAULT_THRESHOLD = 0.75;
