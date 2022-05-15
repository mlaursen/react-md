import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

export const DEFAULT_RIPPLE_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  enter: "rmd-ripple--animating",
  enterActive: "rmd-ripple--scaling",
  enterDone: "rmd-ripple--animating rmd-ripple--scaling",
  exit: "rmd-ripple--animating rmd-ripple--scaling",
  exitActive: "rmd-ripple--fading",
};

export const DEFAULT_RIPPLE_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 150,
  exit: 300,
};
