import type {
  CSSTransitionClassNamesObject,
  TransitionTimeout,
} from "@react-md/transition";

/**
 * @remarks \@since 2.4.0
 */
export const DEFAULT_OVERLAY_TIMEOUT: TransitionTimeout = 150;

/**
 * @remarks \@since 2.4.0
 */
export const DEFAULT_OVERLAY_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appearActive: "rmd-overlay--active",
    appearDone: "rmd-overlay--active",
    enterActive: "rmd-overlay--active",
    enterDone: "rmd-overlay--active",
  };
