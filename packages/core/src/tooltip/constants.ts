import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "../transition/types.js";

/** @since 2.0.0 */
export const DEFAULT_TOOLTIP_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-tooltip--enter",
  appearActive: "rmd-tooltip--visible",
  enter: "rmd-tooltip--enter",
  enterActive: "rmd-tooltip--visible",
  enterDone: "rmd-tooltip--visible",
  exit: "rmd-tooltip--visible rmd-tooltip--exit",
  exitActive: "rmd-tooltip--exit-active",
};

/** @since 2.0.0 */
export const DEFAULT_TOOLTIP_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

/** @since 2.0.0 */
export const DEFAULT_TOOLTIP_DELAY = 1000;
/** @since 2.0.0 */
export const DEFAULT_TOOLTIP_THRESHOLD = 0.75;

/** @since 2.8.0 */
export const DEFAULT_TOOLTIP_SPACING = "1.5rem";
/** @since 2.8.0 */
export const DEFAULT_TOOLTIP_DENSE_SPACING = "0.875rem";
/** @since 2.8.0 */
export const DEFAULT_TOOLTIP_MARGIN = 16;
/** @since 2.8.0 */
export const DEFAULT_TOOLTIP_POSITION = "below";

/**
 * @internal
 * @since 2.8.0
 */
export const TOOLTIP_SPACING_VAR = "--rmd-tooltip-spacing";
