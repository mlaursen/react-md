import type {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

/** @remarks \@since 2.0.0 */
export const DEFAULT_TOOLTIP_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-tooltip--enter",
  appearActive: "rmd-tooltip--visible",
  enter: "rmd-tooltip--enter",
  enterActive: "rmd-tooltip--visible",
  enterDone: "rmd-tooltip--visible",
  exit: "rmd-tooltip--visible rmd-tooltip--exit",
  exitActive: "rmd-tooltip--exit-active",
};

/** @remarks \@since 2.0.0 */
export const DEFAULT_TOOLTIP_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

/** @remarks \@since 2.0.0 */
export const DEFAULT_TOOLTIP_DELAY = 1000;
/** @remarks \@since 2.0.0 */
export const DEFAULT_TOOLTIP_THRESHOLD = 0.75;

/** @remarks \@since 2.8.0 */
export const DEFAULT_TOOLTIP_SPACING = "1.5rem";
/** @remarks \@since 2.8.0 */
export const DEFAULT_TOOLTIP_DENSE_SPACING = "0.875rem";
/** @remarks \@since 2.8.0 */
export const DEFAULT_TOOLTIP_MARGIN = 16;
/** @remarks \@since 2.8.0 */
export const DEFAULT_TOOLTIP_POSITION = "below";

/**
 * @internal
 * @remarks \@since 2.8.0
 */
export const TOOLTIP_SPACING_VAR = "--rmd-tooltip-spacing";
