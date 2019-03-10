import {
  TransitionTimeout,
  CSSTransitionClassNames,
} from "@react-md/transition";

export const SHEET_TRANSITION_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};

export const SHEET_CLASS_NAMES: CSSTransitionClassNames = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
};
