import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const DEFAULT_SHEET_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_SHEET_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
  exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
};
