import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

import { TransitionTimeout } from "./types";

export const ENTER = "enter";
export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXIT = "exit";
export const EXITING = "exiting";
export const EXITED = "exited";

export type TransitionStage =
  | typeof ENTER
  | typeof ENTERING
  | typeof ENTERED
  | typeof EXIT
  | typeof EXITING
  | typeof EXITED;

export const UNMOUNT = "unmount";

export type TransitionAction = TransitionStage | typeof UNMOUNT;

export const COLLAPSE_TIMEOUT: TransitionTimeout = {
  enter: 250,
  exit: 200,
};

export const DEFAULT_COLLAPSE_MIN_HEIGHT = 0;
export const DEFAULT_COLLAPSE_MIN_PADDING_TOP = 0;
export const DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM = 0;

export const CROSS_FADE_TIMEOUT: TransitionTimeout = {
  enter: 300,
  exit: 0,
};

export const CROSS_FADE_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-cross-fade",
  appearActive: "rmd-cross-fade--active",
  enter: "rmd-cross-fade",
  enterActive: "rmd-cross-fade--active",
};

export const SCALE_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-transition--scale-enter",
  appearActive: "rmd-transition--scale-enter-active",
  enter: "rmd-transition--scale-enter",
  enterActive: "rmd-transition--scale-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-exit",
  exitActive: "rmd-transition--scale-exit-active",
};

export const SCALE_Y_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-transition--scale-y-enter",
  appearActive: "rmd-transition--scale-y-enter-active",
  enter: "rmd-transition--scale-y-enter",
  enterActive: "rmd-transition--scale-y-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-y-exit",
  exitActive: "rmd-transition--scale-y-exit-active",
};

export const SCALE_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};
