import type {
  CSSTransitionClassNamesObject,
  TransitionTimeout,
} from "@react-md/transition";

/**
 * @remarks \@since 2.4.0
 */
export const DEFAULT_TOAST_TIMEOUT: TransitionTimeout = 150;

/**
 * @remarks \@since 2.4.0
 */
export const DEFAULT_TOAST_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appear: "rmd-toast--enter",
    appearActive: "rmd-toast--enter-active",
    enter: "rmd-toast--enter",
    enterActive: "rmd-toast--enter-active",
    exit: "rmd-toast--exit",
    exitActive: "rmd-toast--exit-active",
  };
