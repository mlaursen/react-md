import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const DEFAULT_TOAST_TIMEOUT: TransitionTimeout = 150;
export const DEFAULT_TOAST_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-toast--enter",
  appearActive: "rmd-toast--enter-active",
  enter: "rmd-toast--enter",
  enterActive: "rmd-toast--enter-active",
  exit: "rmd-toast--exit",
  exitActive: "rmd-toast--exit-active",
};
