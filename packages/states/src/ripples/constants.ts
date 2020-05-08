import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export const RIPPLE_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-ripple--animating",
  enterActive: "rmd-ripple--scaling",
  enterDone: "rmd-ripple--animating rmd-ripple--scaling",
  exit: "rmd-ripple--animating rmd-ripple--scaling",
  exitActive: "rmd-ripple--fading",
};

export const RIPPLE_TIMEOUT: TransitionTimeout = {
  enter: 150,
  exit: 300,
};
