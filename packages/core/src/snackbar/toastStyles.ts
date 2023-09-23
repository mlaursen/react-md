import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-toast-color"?: string;
    "--rmd-toast-background-color"?: string;
    "--rmd-toast-offset"?: string | number;
  }
}

const styles = bem("rmd-toast");

/**
 * @remarks \@since 6.0.0
 */
export type ToastTheme =
  | "surface"
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "success";

/** @remarks \@since 6.0.0 */
export interface ToastClassNameOptions {
  className?: string;
  /** @defaultValue `"surface"` */
  theme?: ToastTheme;
  /** @defaultValue `false` */
  action?: boolean;
  /** @defaultValue `false` */
  paused?: boolean;
  /** @defaultValue `false` */
  stacked?: boolean;
  /** @defaultValue `false` */
  reordered?: boolean;
  /** @defaultValue `false` */
  closeButton?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function toast(options: ToastClassNameOptions = {}): string {
  const {
    className,
    theme = "surface",
    action,
    paused,
    stacked,
    reordered,
    closeButton,
  } = options;

  return cnb(
    styles({
      [theme]: true,
      x: closeButton,
      action,
      paused,
      "small-gap": closeButton && action,
      stacked,
      reordered: stacked && reordered,
    }),
    className
  );
}
