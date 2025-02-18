import { cnb } from "cnbuilder";

import {
  type BoxAlignItems,
  type BoxJustifyContent,
  box,
} from "../box/styles.js";
import {
  type CSSTransitionClassNames,
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

/** @since 6.0.0 */
export interface OverlayClassNameOptions {
  className?: string;

  visible: boolean;

  /** @defaultValue `false` */
  active?: boolean;

  /** @defaultValue `false` */
  clickable?: boolean;

  /** @defaultValue `false` */
  absolute?: boolean;
  /** @defaultValue `"center"` */
  align?: BoxAlignItems;

  /** @defaultValue `"center"` */
  justify?: BoxJustifyContent;
}

/**
 * @since 6.0.0
 */
export function overlay(
  options: OverlayClassNameOptions & { active?: boolean }
): string {
  const {
    visible,
    active,
    absolute = false,
    clickable = false,
    align = "center",
    justify = "center",
    className,
  } = options;

  return cnb(
    styles({
      active,
      visible,
      clickable,
      absolute,
    }),
    box({
      align,
      justify,
      disablePadding: true,
    }),
    className
  );
}

/** @since 2.4.0 */
export const DEFAULT_OVERLAY_TIMEOUT = 150 as const satisfies TransitionTimeout;

/** @since 2.4.0 */
export const DEFAULT_OVERLAY_CLASSNAMES = {
  appearActive: "rmd-overlay--active",
  appearDone: "rmd-overlay--active",
  enterActive: "rmd-overlay--active",
  enterDone: "rmd-overlay--active",
} as const satisfies CSSTransitionClassNames;
