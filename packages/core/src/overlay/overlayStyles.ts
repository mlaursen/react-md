import { cnb } from "cnbuilder";
import {
  type CSSTransitionClassNamesObject,
  type TransitionTimeout,
} from "../transition/types.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-overlay-background-color"?: string;
    "--rmd-overlay-z-index"?: number;
  }
}

const styles = bem("rmd-overlay");

/** @remarks \@since 6.0.0 */
export interface OverlayClassNameOptions {
  className?: string;

  visible: boolean;

  /** @defaultValue `false` */
  active?: boolean;

  /** @defaultValue `false` */
  clickable?: boolean;

  /** @defaultValue `false` */
  absolute?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function overlay(
  options: OverlayClassNameOptions & { active?: boolean }
): string {
  const {
    visible,
    active,
    absolute = false,
    clickable = false,
    className,
  } = options;

  return cnb(
    styles({
      active,
      visible,
      clickable,
      absolute,
    }),
    className
  );
}

/** @remarks \@since 2.4.0 */
export const DEFAULT_OVERLAY_TIMEOUT: TransitionTimeout = 150;

/** @remarks \@since 2.4.0 */
export const DEFAULT_OVERLAY_CLASSNAMES: Readonly<CSSTransitionClassNamesObject> =
  {
    appearActive: "rmd-overlay--active",
    appearDone: "rmd-overlay--active",
    enterActive: "rmd-overlay--active",
    enterDone: "rmd-overlay--active",
  };
