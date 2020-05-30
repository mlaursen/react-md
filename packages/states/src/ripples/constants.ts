import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const DEFAULT_RIPPLE_CLASSNAMES: CSSTransitionClassNames = {
  enter: "rmd-ripple--animating",
  enterActive: "rmd-ripple--scaling",
  enterDone: "rmd-ripple--animating rmd-ripple--scaling",
  exit: "rmd-ripple--animating rmd-ripple--scaling",
  exitActive: "rmd-ripple--fading",
};

export const DEFAULT_RIPPLE_TIMEOUT: TransitionTimeout = {
  enter: 150,
  exit: 300,
};
